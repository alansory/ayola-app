import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LoadingIndicator from "./components/LoadingIndicator";

const OtpScreen = ({ navigation }) => {
  const inputs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let otpInterval;
    inputs.current[activeInput]?.focus();
    const isOtpFilled = otp.every((value) => value !== "");
    if (isOtpFilled && !errortext) {
      setIsLoading(true);
      otpInterval = setTimeout(() => {
        handleSubmitOtp();
        setIsLoading(false);
      }, 2000);
    }
    const timer = setInterval(() => {
      if (countdown > 0 && !isLoading) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(otpInterval);
    };
  }, [activeInput, countdown, otp, errortext, isLoading]);

  const handleSubmitOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp == 111111) {
      navigation.navigate("LoginScreen");
    } else {
      setErrortext("Invalid Otp");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < newOtp.length - 1) {
      inputs.current[index + 1]?.focus();
      setActiveInput((prev) => prev + 1);
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setActiveInput((prev) => prev - 1);
      setErrortext("");
    }
  };

  const handleResendCode = () => {
    setCountdown(30);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Enter authentication Code</Text>
      <Text style={styles.textContent}>
        Enter the 6-digit that we have sant via the phone number to{" "}
        <Text style={styles.boldText}>+62 882-25629-000</Text>
      </Text>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.box,
              { borderColor: activeInput === index ? "blue" : "black" }, // Mengubah warna border jika input aktif
            ]}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            value={digit}
            ref={(input) => {
              inputs.current[index] = input;
            }}
          />
        ))}
      </View>
      {errortext != "" ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <Text style={styles.countdownText}>(00:{countdown})</Text>
      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendButton}>Resend Code</Text>
      </TouchableOpacity>
      <LoadingIndicator isLoading={isLoading} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
  textContent: {
    margin: 10,
    fontSize: 14,
    textAlign: "center",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderRadius: 20,
    borderWidth: 1,
    width: 45,
    height: 45,
    margin: 5,
    textAlign: "center",
    fontSize: 20,
  },
  resendButton: {
    marginTop: 20,
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  countdownText: {
    marginTop: 20,
    fontSize: 16,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
export default OtpScreen;
