// AddItemScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button, TextInput as PaperTextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const AddItemScreen = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePostItem = () => {
    // Implement logic to post item details to your backend or perform actions
    console.log("Posting item:", {
      image,
      productName,
      description,
      category,
      price,
    });
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      <PaperTextInput
        label="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <PaperTextInput
        label="Product Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <PaperTextInput
        label="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <PaperTextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handlePostItem}
        style={styles.postButton}
        labelStyle={styles.buttonText}
      >
        Post Item
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddItemScreen;
