import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";

//import { UseSelector } from "react-redux";

import * as Location from "expo-location";
import { Marker } from "react-native-maps";

export default function MapPositionScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: currentPosition?.latitude || 0,
    longitude: currentPosition?.longitude || 0,
  });
  const [addresses, setAddresses] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [isAccompanied, setIsAccompanied] = useState(false);
  const [mood, setMood] = useState(false);
  const [music, setMusic] = useState(false);

  //const user = useSelector((state) => state.user.value);

  const handleRegionChange = (region) => {
    setMarkerPosition(region); // Met à jour la position du marker avec la nouvelle région
    console.log(region);
    console.log(markerPosition);
  };

  const handleValidate = () => {
    navigation.navigate("Confirm")
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      {currentPosition && (
        <MapView
          style={styles.map}
          //provider={PROVIDER_GOOGLE}

          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          onRegionChange={handleRegionChange}
        >
          <Marker
            coordinate={markerPosition}
            title="Vous êtes ici"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      <View style={styles.container}>
        <Text style={styles.text}>Ou êtes vous exactement ?</Text>
        <Text style={styles.text}>Temps de trajet: </Text>
        <Text style={styles.text}>Prix : </Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handleValidate()}>
          <Text style={styles.textButton}>Je confirme ma position</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: "70%",
  },

  button: {
    width: 150,
    alignItems: "center",
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: "#ec6e5b",
    borderRadius: 10,
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    width: "100%",
    alignItems: "center",
    padding: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },

  button: {
    height: 40,
    paddingTop: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#F88559",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textButton: {
    color: "#fff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
