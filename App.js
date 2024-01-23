// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AddItemScreen from "./src/screens/AddItemScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "AddItem") {
          iconName = "add-circle-outline";
        } else if (route.name === "Profile") {
          iconName = "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: () => null,
      tabBarActiveTintColor: "#3498db",
      tabBarInactiveTintColor: "#95a5a6",
      tabBarStyle: {
        backgroundColor: "#ecf0f1",
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="AddItem"
      component={AddItemScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
