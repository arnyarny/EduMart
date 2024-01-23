import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied");
      }
    })();
  }, []);

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "profile") {
        setProfileImage(result.uri);
      } else if (type === "cover") {
        setCoverPhoto(result.uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}>
        <Image style={styles.coverPhoto} source={{ uri: coverPhoto }} />
        <TouchableOpacity
          style={styles.editCoverButton}
          onPress={() => pickImage("cover")}
        >
          <Text style={styles.editCoverText}>Change Cover Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => pickImage("profile")}
        >
          <Avatar.Image size={100} source={{ uri: profileImage }} />
          <Text style={styles.editProfileText}>Change Profile Picture</Text>
        </TouchableOpacity>

        <Text style={styles.username}>Your Username</Text>
        <Text style={styles.bio}>A brief bio about yourself...</Text>

        <Button
          mode="contained"
          onPress={() => console.log("Save button pressed")}
          style={styles.saveButton}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  coverContainer: {
    position: "relative",
    height: 200,
    marginBottom: 16,
  },
  coverPhoto: {
    flex: 1,
    resizeMode: "cover",
    marginBottom: 8,
  },
  editCoverButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 8,
    borderRadius: 5,
  },
  editCoverText: {
    color: "#333",
  },
  profileContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
  },
  editProfileButton: {
    alignItems: "center",
    marginBottom: 16,
  },
  editProfileText: {
    marginTop: 8,
    color: "#555",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bio: {
    color: "#555",
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#1e88e5", // Customize the color based on your design
  },
});

export default ProfileScreen;
