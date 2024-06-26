import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { fetchFonts, globalStyles } from "./styles";

import ArrivalScreen from "./screens/ArrivalScreen";
import ComplainScreen from "./screens/ComplainScreen";
import ConfirmDriverScreen from "./screens/ConfirmDriverScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import ContactEdit from "./screens/ContactEditScreen";
import FavoritAdresses from "./screens/FavoritAdressesEditScreen";
import HomeScreen from "./screens/HomeScreen";
import MapPositionScreen from "./screens/MapPositionScreen";
import MapScreen from "./screens/MapScreen";
import PaiementEdit from "./screens/PayementEditScreen";
import ProfilInformations from "./screens/ProfilInformationsEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RouteScreen from "./screens/RouteScreen";
import SearchScreen from "./screens/SearchScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpPhotoScreen from "./screens/SignUpPhotoScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignUpUserScreen from "./screens/SignUpUserScreen";
import SosScreen from "./screens/SosScreen";
import WaitingScreen from "./screens/WaitingScreen";
import SignUpDriverScreen from "./screens/SignUpDriverScreen";
import DocumentsDriverScreen from "./screens/DocumentsDriverScreen";
import WaitingFilesScreen from "./screens/WaitingFilesScreen";
import {
  SafeAreaProvider,

} from 'react-native-safe-area-context';
import WaitingDriverConfirmedScreen from "./screens/WaitingDriverConfirmedScreen";


import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import trip from "./reducers/trip";
import user from "./reducers/user";


const store = configureStore({
  reducer: { user, trip },
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
        tabBarActiveTintColor: "#F88559",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#E0CAC2" },
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};




export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Afficher un écran de chargement si la police n'est pas encore chargée
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUpUser" component={SignUpUserScreen} />
          <Stack.Screen name="SignUpPhoto" component={SignUpPhotoScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="MapPosition" component={MapPositionScreen} />
          <Stack.Screen name="Confirm" component={ConfirmScreen} />
          <Stack.Screen name="ConfirmDriver" component={ConfirmDriverScreen} />
          <Stack.Screen name="Waiting" component={WaitingScreen} />
          <Stack.Screen name="Route" component={RouteScreen} />
          <Stack.Screen name="sos" component={SosScreen} />
          <Stack.Screen name="Arrival" component={ArrivalScreen} />
          <Stack.Screen name="Complain" component={ComplainScreen} />
          <Stack.Screen name="ProfilInformationsEdit" component={ProfilInformations}/>
          <Stack.Screen name="FavoritAdressesEdit" component={FavoritAdresses}/>
          <Stack.Screen name="PaiementEdit" component={PaiementEdit} />
          <Stack.Screen name="ContactEdit" component={ContactEdit} />
          <Stack.Screen name="SignUpdriver" component={SignUpDriverScreen} />
          <Stack.Screen name="DocumentsDriver" component={DocumentsDriverScreen} />
          <Stack.Screen name="WaitingFiles" component={WaitingFilesScreen} />
          <Stack.Screen name="WaitingDriverConfirmed" component={WaitingDriverConfirmedScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabnav: {
    backgroundColor: "transparent",
  },
});
