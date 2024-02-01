// ProfileScreen.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require("../../assets/icon.png")} // Replace with your image path
      />
      <Text style={styles.text}>Student No.: 123456</Text>
      <Text style={styles.text}>Email: example@email.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
