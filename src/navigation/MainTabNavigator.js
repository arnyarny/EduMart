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
        let iconSize = 24;

        if (route.name === "HomeTab") {
          iconName = "home-outline";
          iconSize = 28;
        } else if (route.name === "AddItemTab") {
          iconName = "add-circle-outline";
        } else if (route.name === "ProfileTab") {
          iconName = "person-outline";
          iconSize = 28;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: () => null,
      tabBarActiveTintColor: "#feb314",
      tabBarInactiveTintColor: "#95a5a6",
      tabBarStyle: {
        backgroundColor: "#201b51",
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      },
      tabBarLabelStyle: {
        fontSize: 16,
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
        title: "Add Item",
        headerStyle: {
          backgroundColor: "#201b51",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "700",
        },
        headerTitleAlign: "center",
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        title: "Profile",
        headerStyle: {
          backgroundColor: "#201b51",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "700",
        },
        headerTitleAlign: "center",
      }}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
