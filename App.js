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
import ItemScreen from "./src/screens/ItemScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ItemScreen" component={ItemScreen} />
  </Stack.Navigator>
);

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
        headerShown: false,
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
