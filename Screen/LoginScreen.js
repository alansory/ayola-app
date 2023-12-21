import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();
  const MIN_PASSWORD_LENGTH = 8;

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setErrortext("");
      setUserEmail("");
      setUserPassword("");
    });

    return unsubscribe;
  }, [navigation]);

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

  const handleSubmitPress = async () => {
    try {
      const emailStorage = await AsyncStorage.getItem("userEmail");
      const passwordStorage = await AsyncStorage.getItem("userPassword");
      if (emailStorage == userEmail && passwordStorage == userPassword) {
        navigation.navigate("HomeScreen");
        setErrortext("");
        setUserEmail("");
        setUserPassword("");
      } else {
        setErrortext("Invalid Credentials");
      }
    } catch (error) {
      setErrortext("Error Login");
    }
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/ayola-logo.png")}
                style={{
                  width: "50%",
                  height: 100,
                  resizeMode: "contain",
                  margin: 10,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  { borderColor: emailFocused ? "blue" : "#dadae8" },
                ]}
                onChangeText={validateEmail}
                value={userEmail}
                placeholder="Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
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
                value={userPassword}
                placeholder="Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={!showPassword}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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
              onPress={handleSubmitPress}
              style={[
                styles.buttonStyle,
                (!userEmail || !userPassword || !!errortext) &&
                  styles.disabledButton,
              ]}
              disabled={!userEmail || !userPassword || !!errortext}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              New Here? <Text style={styles.colorRedStyle}>Register</Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

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
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 15,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
  },
  registerTextStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
    alignSelf: "center",
    padding: 5,
  },
  colorRedStyle: {
    fontWeight: "bold",
    color: "rgb(255, 58, 51)",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
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
