import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { ref, onValue, orderByChild, equalTo } from "firebase/database";
import { auth, database } from "../../firebase";

const ProfileScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    const itemsRef = ref(database, "items"); // Explicitly create a reference to "items" node in the database

    const fetchItems = async () => {
      try {
        // Query to get the current user's posted items
        const userItemsRef = orderByChild(itemsRef, "userId").equalTo(
          user.uid,
          "userId"
        );

        onValue(userItemsRef, (snapshot) => {
          if (snapshot.exists()) {
            const itemsData = snapshot.val();
            const itemsArray = Object.entries(itemsData).map(
              ([key, value]) => ({
                key,
                ...value,
              })
            );
            setItems(itemsArray);
            filterItems(searchQuery, itemsArray);
          }
        });
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Error fetching items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchQuery]);

  const filterItems = (query, itemsArray) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = itemsArray.filter(
      (item) =>
        (item.productName &&
          item.productName.toLowerCase().includes(lowerCaseQuery)) ||
        (item.itemCategory &&
          item.itemCategory.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredItems(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterItems(query, items);
  };

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

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Hello Trailblazer!</Title>
      <Paragraph>Let's start shopping</Paragraph>
      <Searchbar
        placeholder="Search items..."
        onChangeText={handleSearch}
        onCancel={() => handleSearch("")}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={searchQuery ? filteredItems : items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ItemScreen", { itemKey: item.key })
            }
          >
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content>
                <Title
                  style={{
                    fontWeight: "700",
                    paddingTop: 10,
                    color: "#201b51",
                  }}
                >
                  {"₱ " + item.itemPrice}
                </Title>
                <Paragraph>{item.productName}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    paddingTop: 30,
    color: "#000",
  },
  searchBar: {
    marginVertical: 16,
    backgroundColor: "#ffca4a",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
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
});

export default ProfileScreen;
