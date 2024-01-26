import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  Title,
  Paragraph,
  Card,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ref, get, getDatabase } from "firebase/database";

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

      const itemRef = ref(db, `items/${itemKey}`);

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
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} style={styles.image} />
      </Card>
      <IconButton
        style={styles.arrow}
        icon="arrow-left"
        color="#fff"
        size={30}
        onPress={handleGoBack}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>{`₱ ${item.itemPrice}`}</Text>
        <Title style={styles.productName}>{item.productName}</Title>
        <Paragraph style={styles.category}>{item.itemCategory}</Paragraph>
        <Paragraph
          style={styles.description}
        >{`Description: \n \n ${item.itemDescription}`}</Paragraph>
        {item.facebookAccount && (
          <View style={styles.facebookContainer}>
            <Ionicons name="logo-facebook" size={20} color="#4267B2" />
            <Paragraph style={styles.facebookAccount}>
              {item.facebookAccount}
            </Paragraph>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    width: 235,
    height: 305,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 60,
  },
  arrow: {
    position: "absolute",
    top: 50,
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
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontSize: 30,
    fontWeight: "700",
    color: "#201b51",
    marginBottom: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  category: {
    fontSize: 13,
    fontWeight: 600,
    color: "black",
    marginBottom: 8,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10, // Add padding for better appearance
    paddingVertical: 5,
    maxWidth: 300,
    alignSelf: "baseline",
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
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
