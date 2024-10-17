import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

const PhoneVerification = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, ""); // Allow only numbers
    setPhoneNumber(formattedText);
  };

  const handleVerifyOTP = () => {
    if (!isChecked) {
      alert("Please accept the Terms and Conditions.");
      return;
    }

    if (phoneNumber.length !== 10) {
      setErrorMessage("*Phone number must be exactly 10 digits");
    } else {
      setErrorMessage("");
      navigation.navigate("OTP Verification"); // Navigate to OTP verification screen
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100} // Adjust based on your header height if any
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Verify Your Phone Number</Text>
          <Text style={styles.subtitle}>Let's Get Started</Text>
          <Image source={require("./images/PHV.jpg")} style={styles.image} />
          <View style={styles.phoneInputContainer}>
            <View style={styles.prefixContainer}>
              <Text style={styles.prefixText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              onSubmitEditing={handleVerifyOTP} // Trigger verification on submit
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <View style={styles.cbContainer}>
            <TouchableOpacity
              style={styles.cb}
              onPress={() => setIsChecked(!isChecked)}
            >
              <Text style={styles.cbtext}>{isChecked ? "☑️" : "⬜️"}</Text>
            </TouchableOpacity>
            <Text style={styles.label}>I accept the Terms and Conditions</Text>
          </View>
          <TouchableOpacity style={styles.Button} onPress={handleVerifyOTP}>
            <Text style={styles.ButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 0, // Reduced top padding
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
  },
  prefixContainer: {
    justifyContent: "center",
    paddingRight: 10,
  },
  prefixText: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    flex: 1,
    height: 40,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  cbContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cb: {
    marginRight: 8,
  },
  cbtext: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
  },
  Button: {
    backgroundColor: "lightgreen",
    borderColor: "darkgreen",
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  ButtonText: {
    color: "darkgreen",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PhoneVerification;
