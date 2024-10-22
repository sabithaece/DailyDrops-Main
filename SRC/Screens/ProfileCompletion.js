import React, { useState, useEffect } from 'react';
import {View,Keyboard,Text,TouchableOpacity,StyleSheet,KeyboardAvoidingView,ScrollView,TextInput,TouchableWithoutFeedback,Platform,Animated,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ProfileCompletion = ({ navigation }) => {
  const [dob, setDob] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
  });
  const keyboardHeight = useState(new Animated.Value(0))[0];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setDob(formattedDate);
    hideDatePicker();
  };

  const handleDobChange = (input) => {
    const cleaned = ('' + input).replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    setDob(formatted);
  };

  const validateFields = () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
    };

    if (!firstName) {
      errors.firstName = '*Please enter your first name.';
    }
    if (!lastName) {
      errors.lastName = '*Please enter your last name.';
    }
    if (!email) {
      errors.email = '*Please enter your email.';
    }
    if (!dob) {
      errors.dob = '*Please enter your date of birth.';
    }

    setErrorMessages(errors);
    return !Object.values(errors).some((error) => error);
  };

  useEffect(() => {
    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, (event) => {
      Animated.timing(keyboardHeight, {
        duration: Platform.OS === 'ios' ? 250 : 100,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
      Animated.timing(keyboardHeight, {
        duration: Platform.OS === 'ios' ? 250 : 100,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const translateY = keyboardHeight.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -1],
    extrapolate: 'clamp',
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={{ transform: [{ translateY }] }}>
              <Text style={styles.title}>                      Complete Your Profile</Text>
              <Text style={styles.title2}>
                Fill in the details below so we can tailor our service just for you!
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#B0B0B0"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              {errorMessages.firstName ? (
                <Text style={styles.errorText}>{errorMessages.firstName}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#B0B0B0"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              {errorMessages.lastName ? (
                <Text style={styles.errorText}>{errorMessages.lastName}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#B0B0B0"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#B0B0B0"
                  style={styles.icon}
                />
              </View>
              {errorMessages.email ? (
                <Text style={styles.errorText}>{errorMessages.email}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="DOB"
                  placeholderTextColor="#B0B0B0"
                  value={dob}
                  onChangeText={handleDobChange}
                  keyboardType="numeric"
                  maxLength={10}
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#B0B0B0"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              {errorMessages.dob ? (
                <Text style={styles.errorText}>{errorMessages.dob}</Text>
              ) : null}
            </Animated.View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (validateFields()) {
                  navigation.navigate('DeliveryAddress');
                }
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    top: -170,
  },
  title2: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    top: -160,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    top: -150,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    transform: [{ translateY: -150 }],
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 15,
    transform: [{ translateY: -160 }],
  },
});

export default ProfileCompletion;
