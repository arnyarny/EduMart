import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ref, get, getDatabase } from "firebase/database";
import { database } from "../../firebase";

const ItemScreen = ({ route, navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const db = getDatabase();
      const { itemKey } = route.params;
      console.log("Fetching details for itemKey:", itemKey);

      const itemRef = ref(database, `items/${itemKey}`);

      try {
        const itemSnapshot = await get(itemRef);

        if (itemSnapshot.exists()) {
          const itemData = itemSnapshot.val();
          setItem(itemData);
        } else {
          console.log("Item not found in the database.");
          setError("Item not found");
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
        setError("Error fetching item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();

    // Cleanup function to cancel the fetch if the component unmounts
    return () => {
      setItem(null); // Clear the state to avoid a memory leak
    };
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text>Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <IconButton
        style={styles.arrow}
        icon="arrow-left"
        color="#fff"
        size={30}
        onPress={handleGoBack}
      />
      <View style={styles.detailsContainer}>
        <Title style={styles.productName}>{item.productName}</Title>
        <Paragraph style={styles.category}>
          Category: {item.itemCategory}
        </Paragraph>
        <Paragraph style={styles.price}>{"PHP " + item.itemPrice}</Paragraph>
        <Paragraph style={styles.description}>{item.itemDescription}</Paragraph>
        {item.facebookAccount && (
          <View style={styles.facebookContainer}>
            <Ionicons name="logo-facebook" size={20} color="#4267B2" />
            <Paragraph style={styles.facebookAccount}>
              {item.facebookAccount}
            </Paragraph>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrow: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcccc",
  },
  image: {
    width: "100%",
    height: 300, // Adjust the height as needed
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  price: {
    fontSize: 18,
    color: "green",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  category: {
    fontSize: 16,
    color: "blue",
  },
  facebookContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  facebookAccount: {
    fontSize: 16,
    color: "#4267B2",
    marginLeft: 8,
  },
});

export default ItemScreen;
