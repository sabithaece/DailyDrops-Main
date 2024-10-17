import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated, Keyboard } from 'react-native';

const OtpVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);
  const moveAnim = useRef(new Animated.Value(0)).current;

  // Timer to countdown OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Smooth keyboard transition
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      Animated.timing(moveAnim, {
        toValue: -60, // Adjust this value for smooth transition
        duration: event.duration || 250,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', (event) => {
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: event.duration || 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [moveAnim]);

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(false);
      if (value !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1].focus(); // Automatically move to next field
      }
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    alert('OTP has been resent!');
  };

  const handleCompleteProfile = () => {
    if (otp.some((digit) => digit === '')) {
      setError(true);  // Show error if any OTP field is empty
    } else {
      setError(false);
      navigation.navigate('ProfileCompletion');  // Navigate to next screen
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.View style={[styles.animatedContainer, { transform: [{ translateY: moveAnim }] }]}>
          <Text style={styles.title}>Enter OTP to Verify Your Identity</Text>
          <Text style={styles.subtitle}>Check for the OTP we sent and enter it here:</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={[
                  styles.otpInput,
                  error && otp[index] === '' ? styles.inputError : null,
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
                    inputRefs.current[index - 1].focus();
                  }
                }}
              />
            ))}
          </View>
          {error && <Text style={styles.errorText}>Please fill all OTP fields</Text>}

          <Text style={styles.timerText}>
            {timer > 0 ? `Wait for 00:${timer.toString().padStart(2, '0')}` : '00:00'}
          </Text>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOtp}
            disabled={timer > 0}
          >
            <Text style={{ color: timer > 0 ? 'gray' : 'blue' }}>SEND AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={handleCompleteProfile}
          >
            <Text style={styles.ButtonText}>Complete Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  animatedContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 16,
    marginBottom: 10,
  },
  resendButton: {
    marginBottom: 20,
  },
  Button: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  ButtonText: {
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OtpVerification;
