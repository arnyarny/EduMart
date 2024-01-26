import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { handleForgotPassword } from "../../authFunctions"; // Import the function

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResetPassword = async () => {
    try {
      await handleForgotPassword(email);
      Alert.alert(
        "Password Reset Email Sent",
        "Check your email to reset your password."
      );
      navigation.goBack(); // Navigate back to the login or previous screen
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="#201b51" />
        </TouchableOpacity>
        <Text style={styles.text}>Forgot Password</Text>

        <TextInput
          label="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
          theme={{
            colors: {
              primary: "#201b51", // Change this to your desired color
            },
          }}
        />
        <Button
          style={styles.button}
          labelStyle={styles.buttonText}
          mode="contained"
          onPress={handleResetPassword}
        >
          Reset Password
        </Button>
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
  },
  arrow: { position: "absolute", top: 60, left: 30 },
  text: {
    fontSize: 40,
    marginBottom: 10,
    paddingTop: 290,
    color: "#201b51",
    fontWeight: "900",
    width: 200,
  },
  text: {
    fontSize: 40,
    marginBottom: 10,
    paddingTop: 290,
    color: "#201b51",
    fontWeight: "900",
    width: 200,
  },
  textInput: {
    marginBottom: 16,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  button: { width: "100%", marginVertical: 20, backgroundColor: "#201b51" },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
