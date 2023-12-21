import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingIndicator = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
});

export default LoadingIndicator;
