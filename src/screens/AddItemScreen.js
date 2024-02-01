import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Button, TextInput as PaperTextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

import {
  ref as databaseRef,
  push as pushToDatabase,
  set,
  serverTimestamp,
} from "firebase/database";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, database, auth } from "../../firebase";

const AddItemScreen = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState(null);
  const [itemPrice, setItemPrice] = useState("");
  const [facebookAccount, setFacebookAccount] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const placeholder = {
    label: "Select a category...",
    value: null,
  };

  const items = [
    { label: "Books", value: "Books" },
    { label: "Uniforms", value: "Uniforms" },
    { label: "Gadgets", value: "Gadgets" },
    { label: "Art Materials", value: "ArtMaterials" },
    { label: "School Supplies", value: "SchoolSupplies" },
    { label: "Shoes", value: "Shoes" },
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

  const handlePostItem = async () => {
    try {
      setLoading(true); // Set loading to true when starting the post process
      const storageRef = ref(storage, "images/" + Date.now() + ".jpg");
      const imageBlob = await prepareBlob(image);
      await uploadBytes(storageRef, imageBlob);

      const downloadURL = await getDownloadURL(storageRef);

      const itemsRef = databaseRef(database, "items");

      // Get the current user from Firebase Authentication
      const currentUser = auth.currentUser;

      const newItemRef = pushToDatabase(itemsRef);

      set(newItemRef, {
        image: downloadURL,
        productName,
        itemDescription,
        itemCategory,
        itemPrice,
        facebookAccount,
        userId: currentUser.uid,
        timestamp: serverTimestamp(),
      });

      console.log("Item posted successfully with key:", newItemRef.key);

      // Optionally, you can reset the state after posting
      setImage(null);
      setProductName("");
      setItemDescription("");
      setItemCategory("");
      setItemPrice("");
      setFacebookAccount("");
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setLoading(false); // Set loading to false when post process is complete (success or error)
    }
  };

  const prepareBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
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
      <RNPickerSelect
        placeholder={placeholder}
        items={items}
        onValueChange={(value) => setItemCategory(value)}
        style={pickerSelectStyles}
        value={itemCategory}
      />
      <PaperTextInput
        label="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
        underlineColor="#201b51" // Add this prop
        theme={{ colors: { primary: "#201b51" } }} // Add this prop for Android
      />
      <PaperTextInput
        label="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
        style={styles.input}
        multiline
        underlineColor="#201b51" // Add this prop
        theme={{ colors: { primary: "#201b51" } }} // Add this prop for Android
      />
      <PaperTextInput
        label="Item Price"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
        style={styles.input}
        underlineColor="#201b51" // Add this prop
        theme={{ colors: { primary: "#201b51" } }} // Add this prop for Android
      />
      <PaperTextInput
        label="Facebook Account"
        value={facebookAccount}
        onChangeText={setFacebookAccount}
        style={styles.input}
        underlineColor="#201b51" // Add this prop
        theme={{ colors: { primary: "#201b51" } }} // Add this prop for Android
      />
      <Button
        mode="contained"
        onPress={handlePostItem}
        style={styles.postButton}
        labelStyle={styles.buttonText}
      >
        {loading ? ( // Show the activity indicator if loading is true
          <ActivityIndicator color="#fff" />
        ) : (
          "POST ITEM"
        )}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
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
    color: "#201b51",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  postButton: {
    backgroundColor: "#feb314",
    paddingVertical: 4,
    borderRadius: 30,
  },
  buttonText: {
    color: "#000", // Font color set to black
    fontWeight: "600",
    fontSize: 16, // Font size set to 20
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
