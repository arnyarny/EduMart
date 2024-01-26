import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-paper";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={() => navigation.navigate("Login")}
        >
          LOGIN
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#201b51",
    marginTop: 76,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    padding: 2,
  },
  signupText: {
    color: "#201b51",
    marginTop: 20,
    fontWeight: "500",
  },
});

export default WelcomeScreen;
