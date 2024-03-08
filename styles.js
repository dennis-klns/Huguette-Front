import * as Font from "expo-font";
import { StyleSheet } from "react-native";

export const fetchFonts = async () => {
  await Font.loadAsync({
    "OpenSans-Regular": require("./assets/fonts/Open-Sans/static/OpenSans-Regular.ttf"),
    // Ajoutez ici d'autres styles de police si nécessaire
  });
};

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    // Autres styles de texte globaux
  },
  textButton: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
  },
  // Autres styles globaux
});
