import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";

import SearchScreen from './screens/SearchScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignUpUserScreen from './screens/SignUpUserScreen';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import user from "./reducers/user";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Map") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignUpUser" component={SignUpUserScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
