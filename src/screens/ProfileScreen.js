// ProfileScreen.js
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const ProfileScreen = ({ navigation, route }) => {
  const { name, course, schoolYear, image } = route.params;

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Course: {course}</Text>
      <Text style={styles.text}>School Year: {schoolYear}</Text>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("EditProfile", {
            name,
            course,
            schoolYear,
            image,
          })
        }
        style={styles.editButton}
      >
        Edit Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  editButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
