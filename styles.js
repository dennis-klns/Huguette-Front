import * as Font from "expo-font";
import { StyleSheet } from "react-native";

export const fetchFonts = async () => {
  await Font.loadAsync({
    "OpenSans-Regular": require("./assets/fonts/Open-Sans/static/OpenSans-Regular.ttf"),
    "Ladislav-Bold": require("./assets/fonts/Open-Sans/static/Ladislav-Bold.ttf"),
    "Ladislav-BoldItalic": require("./assets/fonts/Open-Sans/static/Ladislav-BoldItalic.ttf"),
    "Ladislav-Italic": require("./assets/fonts/Open-Sans/static/Ladislav-Italic.ttf"),
    "Ladislav": require("./assets/fonts/Open-Sans/static/Ladislav.ttf"),
    "Ladislav-Inline": require("./assets/fonts/Open-Sans/static/LadislavInline.ttf"),
    "Ladislav-Light-Italic": require("./assets/fonts/Open-Sans/static/LadislavLight-Italic.ttf"),
    "Ladislav-Light": require("./assets/fonts/Open-Sans/static/LadislavLight.ttf"),
    // Ajoutez ici d'autres styles de police si nécessaire
  });
};

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
  
  },
  title: {
    fontFamily: "Ladislav-Bold",
    fontSize: 16,
  },
  // Autres styles de texte globaux
  textButton: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
  },
  // Autres styles globaux
});
