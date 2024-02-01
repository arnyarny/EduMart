import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
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
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // New state to track active category

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
            setCategories(getUniqueCategories(itemsArray));
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

  const getUniqueCategories = (itemsArray) => {
    const allCategories = itemsArray.flatMap((item) => item.itemCategory);
    return [...new Set(allCategories)];
  };

  const handleCategoryPress = (category) => {
    setSearchQuery(category);
    filterItems(category, items);
    setActiveCategory(category); // Set the active category
  };

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
    if (query === "") {
      setFilteredItems([]); // Reset filtered items when search query is empty
      setActiveCategory(null); // Reset active category when search query is empty
    } else {
      filterItems(query, items);
    }
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
      <Text style={styles.categoriesText}>Categories</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(category)}
              style={[
                styles.categoryButton,
                activeCategory === category && {
                  backgroundColor: "#201b51",
                },
              ]}
            >
              <Text
                style={[
                  { color: activeCategory === category ? "#fff" : "black" },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    paddingHorizontal: 40,
    paddingTop: 30,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    paddingTop: 30,
    color: "#000",
  },
  searchBar: {
    marginVertical: 16,
    backgroundColor: "#feb314",
  },
  categoriesText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginVertical: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    padding: 5,
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
  categoriesContainer: {
    marginBottom: 50,
    flexDirection: "row",
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Homescreen;
