// MainTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStack from "./HomeStack";
import AddItemScreen from "../screens/AddItemScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "HomeTab") {
          iconName = "home-outline";
        } else if (route.name === "AddItemTab") {
          iconName = "add-circle-outline";
        } else if (route.name === "ProfileTab") {
          iconName = "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: () => null,
      tabBarActiveTintColor: "#feb314",
      tabBarInactiveTintColor: "#95a5a6",
      tabBarStyle: {
        backgroundColor: "#201b51",
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="AddItemTab"
      component={AddItemScreen}
      options={{
        headerShown: true, // Display header for AddItemScreen
        title: "Add Item", // Set the title for AddItemScreen
        headerStyle: {
          backgroundColor: "#201b51", // Set the background color for the header
        },
        headerTitleStyle: {
          color: "#fff", // Set the font color for the title
          fontWeight: "700",
        },
        headerTitleAlign: "center", // Center the title within the header
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
