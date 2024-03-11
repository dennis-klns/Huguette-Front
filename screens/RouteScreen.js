import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";

export default function RouteScreen({ navigation }) {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapRef = useRef(null);
  const GOOGLE_API_KEY = "AIzaSyDXDHg0TNXOSiKX6Mj2dWkDrzKLwYVh7R0";

  const trip = useSelector((state) => state.trip.value);

  const handleSOS = () => {
    navigation.navigate("sos");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=56 boulevard Pereire, Paris&destination=${trip.arrival}&key=${GOOGLE_API_KEY}`
        );
        setDirections(response.data);
        console.log("API Response:", response.data);
        console.log("API Distance:", response.data);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      directions &&
      directions.routes &&
      directions.routes.length > 0 &&
      directions.routes[0].legs &&
      directions.routes[0].legs.length > 0
    ) {
      const startLocation = directions.routes[0].legs[0].start_location;
      const endLocation = directions.routes[0].legs[0].end_location;
      console.log(directions.routes[0].legs[0].distance.text);
      console.log(directions.routes[0].legs[0].duration.text);
      const initialRegion = {
        latitude: (startLocation.lat + endLocation.lat) / 2,
        longitude: (startLocation.lng + endLocation.lng) / 2,
        latitudeDelta: Math.abs(startLocation.lat - endLocation.lat) * 2,
        longitudeDelta: Math.abs(startLocation.lng - endLocation.lng) * 2,
      };
      mapRef.current.animateToRegion(initialRegion);
    }
  }, [directions]);

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      {directions && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: directions.routes[0].legs[0].start_location.lat,
            longitude: directions.routes[0].legs[0].start_location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polyline
            coordinates={decodePolyline(
              directions.routes[0].overview_polyline.points
            )}
            strokeWidth={6}
            strokeColor="#EBB2B5"
          />
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
          <Text style={styles.textButton} onPress={() => handleSOS()}>
            SOS
          </Text>
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
    fontFamily: "OpenSans-Regular",
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

function decodePolyline(encoded) {
  // Fonction pour décoder la polyline encodée de Google Directions
  var points = [];
  var index = 0,
    len = encoded.length;
  var lat = 0,
    lng = 0;
  while (index < len) {
    var b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;
    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return points;
}
