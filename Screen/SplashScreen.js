import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Auth");
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/ayola-logo.png")}
        style={{
          width: "100%",
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
