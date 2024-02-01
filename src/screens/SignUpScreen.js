// SignUpScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { handleSignUp } from "../../authFunctions";

const SignUpScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUpPress = async () => {
    setLoading(true);
    try {
      const user = await handleSignUp(email, password, studentNumber);
      console.log("User details:", user);
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
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
        <Text style={styles.text}>Create Account</Text>

        <TextInput
          label="Student Number"
          value={studentNumber}
          onChangeText={(text) => setStudentNumber(text)}
          style={styles.textInput}
          theme={{
            colors: {
              primary: "#201b51",
            },
          }}
        />

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
        <Button
          style={styles.button}
          labelStyle={styles.buttonText}
          mode="contained"
          onPress={handleSignUpPress}
        >
          SIGN UP
        </Button>
        {loading && (
          <ActivityIndicator
            animating={true}
            size="small"
            color="#201b51"
            style={{ marginTop: 16 }}
          />
        )}
        {error && <Text style={{ color: "red", marginTop: 16 }}>{error}</Text>}
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
  textInput: {
    marginBottom: 16,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  button: { width: "100%", marginBottom: 20, backgroundColor: "#201b51" },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default SignUpScreen;
