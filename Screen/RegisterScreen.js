import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MIN_PASSWORD_LENGTH = 8;

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errortext, setErrortext] = useState("");

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (text) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setUserEmail(text);
    setErrortext(
      emailPattern.test(text) ? "" : "Please enter a valid email address"
    );
  };

  const validatePassword = (password) => {
    const lowercaseRegex = /[a-z]/; // Regex for lowercase letter
    const uppercaseRegex = /[A-Z]/; // Regex for uppercase letter
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/; // Regex for symbol

    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasSymbol = symbolRegex.test(password);
    setUserPassword(password);
    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrortext(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
      );
    } else if (!hasLowercase) {
      setErrortext("Password must contain at least one lowercase letter. ");
    } else if (!hasUppercase) {
      setErrortext("Password must contain at least one uppercase letter.");
    } else if (!hasSymbol) {
      setErrortext("Password must contain at least one symbol.");
    } else {
      setErrortext("");
    }
  };

  const handleSubmitButton = async () => {
    try {
      setErrortext("");
      setLoading(true);
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("userEmail", userEmail);
      await AsyncStorage.setItem("userPassword", userPassword);
      props.navigation.navigate("OtpScreen");
    } catch (e) {
      setErrortext("Error register");
    }
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: 60,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/ayola-logo.png")}
            style={{
              width: "50%",
              height: 100,
              resizeMode: "contain",
              marginBottom: 10,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: nameFocused ? "blue" : "#dadae8" },
              ]}
              onChangeText={(UserName) => setUserName(UserName)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              underlineColorAndroid="#f000"
              placeholder="User name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: emailFocused ? "blue" : "#dadae8" },
              ]}
              onChangeText={validateEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[
                styles.inputStyle,
                { borderColor: passwordFocused ? "blue" : "#dadae8" },
              ]}
              onChangeText={validatePassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.iconEye}
              onPress={toggleShowPassword}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSubmitButton}
            style={[
              styles.buttonStyle,
              (!userName || !userEmail || !userPassword || !!errortext) &&
                styles.disabledButton,
            ]}
            disabled={!userName || !userEmail || !userPassword || !!errortext}
          >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "rgb(255, 58, 51)",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 15,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "#000000",
    paddingLeft: 25,
    paddingRight: 25,
    borderWidth: 1,
    borderRadius: 30,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  iconEye: {
    position: "absolute",
    right: 20,
    top: 12,
  },
});
