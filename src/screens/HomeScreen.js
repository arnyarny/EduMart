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
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";

const Homescreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "items");

    const fetchItems = async () => {
      try {
        onValue(itemsRef, (snapshot) => {
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
        keyExtractor={(item) => item.key} // Assuming 'key' is the property containing the Firebase-generated key
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ItemScreen", { itemKey: item.key })
            }
          >
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content>
                <Title>{item.productName}</Title>
                <Paragraph>{"PHP " + item.itemPrice}</Paragraph>
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
  },
  card: {
    marginBottom: 16,
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

export default Homescreen;
