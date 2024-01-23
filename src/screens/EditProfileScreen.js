// EditProfileScreen.js
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, TextInput as PaperTextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = ({ navigation, route }) => {
  const {
    name: initialName,
    course: initialCourse,
    schoolYear: initialSchoolYear,
    image: initialImage,
  } = route.params;

  const [name, setName] = useState(initialName);
  const [course, setCourse] = useState(initialCourse);
  const [schoolYear, setSchoolYear] = useState(initialSchoolYear);
  const [image, setImage] = useState(initialImage);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to profile
    // This is where you would typically send the updated data to your backend
    console.log("Saving changes:", { name, course, schoolYear, image });
    navigation.navigate("Profile", { name, course, schoolYear, image });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.profileImage} />}
        <Button
          mode="contained"
          onPress={pickImage}
          style={styles.imagePickerButton}
        >
          Select Image
        </Button>
      </View>
      <PaperTextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <PaperTextInput
        label="Course"
        value={course}
        onChangeText={setCourse}
        style={styles.input}
      />
      <PaperTextInput
        label="School Year"
        value={schoolYear}
        onChangeText={setSchoolYear}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSaveChanges}
        style={styles.saveButton}
      >
        Save Changes
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
  imageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  imagePickerButton: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default EditProfileScreen;
