import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button, TextInput as PaperTextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { database } from "../../firebase";
import RNPickerSelect from "react-native-picker-select";

const AddItemScreen = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState(null);
  const [itemPrice, setItemPrice] = useState("");

  const placeholder = {
    label: "Select a category...",
    value: null,
  };

  const items = [
    { label: "Books", value: "books" },
    { label: "Uniforms", value: "uniforms" },
    { label: "Gadgets", value: "gadgets" },
    { label: "Art Materials", value: "artMaterials" },
  ];

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
    const itemsRef = ref(database, "items");

    // Push item data to the 'items' collection in Firebase Realtime Database
    const newItemRef = push(itemsRef);

    // Set the data for the new item
    set(newItemRef, {
      image,
      productName,
      itemDescription,
      itemCategory,
      itemPrice,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("Item posted successfully with key:", newItemRef.key);
        // Optionally, you can reset the state after posting
        setImage(null);
        setProductName("");
        setItemDescription("");
        setItemCategory("");
        setItemPrice("");
      })
      .catch((error) => {
        console.error("Error posting item:", error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePickerText}>Select Image</Text>
        )}
      </TouchableOpacity>
      <PaperTextInput
        label="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <PaperTextInput
        label="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
        style={styles.input}
        multiline
      />
      <RNPickerSelect
        placeholder={placeholder}
        items={items}
        onValueChange={(value) => setItemCategory(value)}
        style={pickerSelectStyles}
        value={itemCategory}
      />
      <PaperTextInput
        label="Item Price"
        value={itemPrice}
        onChangeText={setItemPrice}
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
    padding: 40,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  imagePickerText: {
    fontSize: 16,
    color: "#3498db",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#ecf0f1",
  },
  postButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "#000",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "#000",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AddItemScreen;
