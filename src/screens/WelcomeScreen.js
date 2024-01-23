import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.text}>
        Buy, sell, and connect with USTP EduMart App
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 45,
    backgroundColor: "#201b51",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 80,
    fontWeight: "400",
    width: 200,
    textAlign: "center",
  },
  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#feb314",
  },
  button: {
    width: "100%",
    marginBottom: 5,
    backgroundColor: "#feb314",
  },
  buttonText: {
    color: "#201b51",
    fontWeight: "900",
    fontSize: 16,
  },
  signupText: {
    color: "#feb314",
    marginTop: 20,
  },
});

export default WelcomeScreen;
