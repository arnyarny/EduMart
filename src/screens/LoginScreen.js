// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { handleLogin } from "../../authFunctions";

const LoginScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNavForgotPasswordScreen = () => {
    navigation.navigate("ForgotPassword"); // Navigate to your ForgotPasswordScreen
  };

  const handleLoginPress = async () => {
    setLoading(true);
    try {
      const user = await handleLogin(email, password);
      console.log("User details:", user);
      navigation.navigate("MainTabs");
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
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
        <Text style={styles.text}>Welcome Back!</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
          theme={{
            colors: {
              primary: "#201b51", // Change this to your desired color
            },
          }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.textInput}
          theme={{
            colors: {
              primary: "#201b51", // Change this to your desired color
            },
          }}
        />
        <TouchableOpacity onPress={handleNavForgotPasswordScreen}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <Button
          style={styles.button}
          labelStyle={styles.buttonText}
          mode="contained"
          onPress={handleLoginPress}
        >
          LOGIN
        </Button>
        {loading && <ActivityIndicator size="small" color="#201b51" />}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
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
  forgotPasswordText: {
    color: "#201b51",
    textAlign: "right",

    marginBottom: 16,
    fontSize: 12,
    fontWeight: "700",
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

export default LoginScreen;
