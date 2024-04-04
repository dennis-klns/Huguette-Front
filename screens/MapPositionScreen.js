import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  addCost,
  addDeparture,
  addDuration,
  addLatitude,
  addLongitude,
} from "../reducers/trip";

export default function MapPositionScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const trip = useSelector((state) => state.trip.value);
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: trip.latitude,
    longitude: trip.longitude,
  });
  const [address, setAddress] = useState("");

  const handleRegionChange = (region) => {
    setMarkerPosition(region); // Met à jour la position du marker avec la nouvelle région
    console.log("region", markerPosition);
  };

  const handleValidate = () => {
    navigation.navigate("Confirm");
  };

  const handleTest = () => {
    navigation.navigate("Confirm");
  };

  const changeCostPostion = () => {
    fetch("https://huguette-back.vercel.app/trips/costposition", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tripId: trip.tripId,
        latitudeD: markerPosition.latitude,
        longitudeD: markerPosition.longitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("handleValidateData:", data);
        if (data.result) {
          dispatch(addDeparture(data.trip.departure.completeAddress));
          dispatch(addLatitude(data.trip.departure.latitude));
          dispatch(addLongitude(data.trip.departure.longitude));
          dispatch(addDuration(data.trip.estimatedDuration));
          console.log("trip: ", data);
          console.log("reducer:", trip);

          if (data.trip.estimatedDuration.includes("hour")) {
            const str = data.trip.estimatedDuration;
            const parts = str.split("mins").join("").split("hours");
            const minutes = Number(parts[0]) * 60 + Number(parts[1]);
            console.log(parts);
            console.log(minutes);
            dispatch(addCost(parseFloat(minutes) * 0.9));
          } else {
            dispatch(addCost(parseFloat(data.trip.estimatedDuration) * 0.9));
          }
        } else {
          console.error("Failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  useEffect(() => {
    setMarkerPosition({ latitude: trip.latitude, longitude: trip.longitude });
  }, []);

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      {markerPosition && (
        <MapView
          style={styles.map}
          //provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: trip.latitude,
            longitude: trip.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          onRegionChange={handleRegionChange}
          onTouchEnd={changeCostPostion}
        >
          <Marker
            coordinate={markerPosition}
            title="Vous êtes ici"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      <View style={styles.container}>
        <Text style={styles.title}>Où êtes-vous exactement ?</Text>
        <Text style={styles.text}>Temps de trajet</Text>
        <Text style={styles.info}>{trip.duration}</Text>
        <Text style={styles.text}>Prix</Text>
        <Text style={styles.info}>{trip.cost}€</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleValidate()}
        >
          <Text style={styles.textButton}>Je confirme ma position</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: "65%",
  },

  linearGradient: {
    flex: 1,
  },

  container: {
    width: "100%",
    height: "9%",
    alignItems: "center",
    padding: "5%",
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },

  info: {
    fontSize: 16,
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontFamily: "Ladislav-Bold",
  },

  button: {
    height: 40,
    paddingTop: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#F88559",
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
});
