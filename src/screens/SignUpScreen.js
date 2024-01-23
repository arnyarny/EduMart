// SignUpScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { handleSignUp } from "../../authFunctions";

const SignUpScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUpPress = async () => {
    setLoading(true);
    try {
      const user = await handleSignUp(email, password);
      console.log("User details:", user);
      navigation.navigate("Welcome");
    } catch (error) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrow} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.text}>Create Account</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.textInput}
      />
      <Button
        style={styles.button}
        labelStyle={styles.buttonText}
        mode="contained"
        onPress={handleSignUpPress}
      >
        Sign Up
      </Button>
      {loading && (
        <ActivityIndicator
          animating={true}
          size="small"
          color="#fff"
          style={{ marginTop: 16 }}
        />
      )}
      {error && <Text style={{ color: "red", marginTop: 16 }}>{error}</Text>}
      <Image source={require("../../assets/write.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 45,
    flex: 1,
    backgroundColor: "#201b51",
  },
  arrow: { position: "absolute", marginVertical: 40, marginHorizontal: 20 },
  text: {
    fontSize: 44,
    marginVertical: 60,
    color: "#fff",
    fontWeight: "900",
    width: 200,
  },
  textInput: {
    marginBottom: 16,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  button: { width: "100%", marginBottom: 20, backgroundColor: "#feb314" },
  buttonText: {
    color: "#201b51",
    fontWeight: "900",
    fontSize: 16,
  },
  logo: {
    width: 350,
    height: 350,
    margin: 40,
  },
});

export default SignUpScreen;
