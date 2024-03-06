import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
//import { UseSelector } from "react-redux";

export default function RouteScreen({ navigation }) {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const GOOGLE_API_KEY = "AIzaSyDXDHg0TNXOSiKX6Mj2dWkDrzKLwYVh7R0";

  //const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=56 boulevard Pereire, Paris&destination=6 rue des Fontenettes, Bessencourt&key=${GOOGLE_API_KEY}`
        );
        console.log("API Response:", response.data);
        console.log(directions);
        setDirections(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      {directions && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: directions.routes[0].legs[0].start_location.lat,
            longitude: directions.routes[0].legs[0].start_location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/*
            <Polyline
              coordinates={directions.routes[0].overview_polyline.points.map(
                (data) => ({
                  latitude: parseFloat(data.lat),
                  longitude: parseFloat(data.lng),
                })
              )}
              strokeWidth={4}
              strokeColor="blue"
            />
              */}
          <Marker
            coordinate={{
              latitude: directions.routes[0].legs[0].start_location.lat,
              longitude: directions.routes[0].legs[0].start_location.lng,
            }}
            title="Départ"
            image={require("../assets/marker.png")}
          />
          <Marker
            coordinate={{
              latitude: directions.routes[0].legs[0].end_location.lat,
              longitude: directions.routes[0].legs[0].end_location.lng,
            }}
            title="Arrivée"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      <View style={styles.container}>
        <Text style={styles.text}>Heure d'arrivée approximative :</Text>
        <Text style={styles.text}>20 h 14</Text>
        <Text style={styles.text}>Partager ma course en temps réel ...</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>SOS</Text>
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
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#d63031",
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
