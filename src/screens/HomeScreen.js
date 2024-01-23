import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";

import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";

const Homescreen = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch items from Firebase Realtime Database
    const itemsRef = ref(database, "items");

    onValue(itemsRef, (snapshot) => {
      if (snapshot.exists()) {
        const itemsData = snapshot.val();
        const itemsArray = Object.values(itemsData);
        setItems(itemsArray);
        // Update filtered items when items change
        filterItems(searchQuery, itemsArray);
      }
    });
  }, [searchQuery]); // Update filtered items when searchQuery changes

  const filterItems = (query, itemsArray) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = itemsArray.filter(
      (item) =>
        item.productName.toLowerCase().includes(lowerCaseQuery) ||
        item.itemCategory.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredItems(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterItems(query, items);
  };

  return (
    <View style={styles.container}>
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
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
              <Title>{item.productName}</Title>
              <Paragraph>{item.itemDescription}</Paragraph>
            </Card.Content>
          </Card>
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
  searchBar: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default Homescreen;
