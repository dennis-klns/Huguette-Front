import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
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

  const handleValidate = () => {
    navigation.navigate("Arrival");
  };

  useEffect(() => {
    fetch(`https://huguette-backend.vercel.app/trips/${trip.tripId}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/directions/json?origin=${data.trip.departure.completeAddress}&destination=${data.trip.arrival.completeAddress}&key=${GOOGLE_API_KEY}`
            );
            console.log("response:", response);
            setDirections({
              polyline: data.trip.polyline,
              departure: data.trip.departure,
              arrival: data.trip.arrival,
            });
            console.log("API Response:", response.data);
            console.log("API Distance:", response.data);
          } catch (error) {
            console.error("Error fetching directions:", error);
          }
        };
        fetchData();
      });
  }, []);

  useEffect(() => {
    if (directions) {
      // Coordonnées des marqueurs de départ et d'arrivée
      const coordinates = [
        {
          latitude: directions.departure.latitude,
          longitude: directions.departure.longitude,
        },
        {
          latitude: directions.arrival.latitude,
          longitude: directions.arrival.longitude,
        },
      ];

      // Centrer et zoomer sur les coordonnées des marqueurs
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
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
            latitude: directions.departure.latitude,
            longitude: directions.departure.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polyline
            coordinates={decodePolyline(directions.polyline)}
            strokeWidth={6}
            strokeColor="#EBB2B5"
          />
          <Marker
            coordinate={{
              latitude: directions.departure.latitude,
              longitude: directions.departure.longitude,
            }}
            title="Départ"
            image={require("../assets/marker.png")}
          />
          <Marker
            coordinate={{
              latitude: directions.arrival.latitude,
              longitude: directions.arrival.longitude,
            }}
            title="Arrivée"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Heure d'arrivée approximative :</Text>
          <Text style={styles.text}>20 h 14</Text>

          <TouchableOpacity style={styles.input} activeOpacity={0.8}>
            <Text style={styles.textinput}>
              Partager ma course en temps réel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => handleSOS()}
          >
            <Text style={styles.textButton}> SOS </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input}
            activeOpacity={0.8}
            onPress={() => handleValidate()}
          >
            <Text style={styles.textinput}> Je suis arrivée</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: "600",
  },

  title: {
    fontSize: 22,
    fontFamily: "Ladislav-Bold",
  },

  button: {
    height: 40,
    paddingTop: 8,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#d63031",
    borderRadius: 30,
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

  textinput: {
    fontSize: 14,
    color: "gray",
  },

  input: {
    height: 45,
    justifyContent: "center",
    width: "80%",
    padding: 10,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
