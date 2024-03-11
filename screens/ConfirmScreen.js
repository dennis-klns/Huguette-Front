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

import { useDispatch, useSelector } from "react-redux";

import { Marker } from "react-native-maps";

export default function ConfirmScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: currentPosition?.latitude || 0,
    longitude: currentPosition?.longitude || 0,
  });

  const trip = useSelector((state) => state.trip.value);
  const dispatch = useDispatch();

  const handleValidate = () => {
    navigation.navigate("ConfirmDriver");
  };

  /*     useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
                    setCurrentPosition(location.coords);
                });
            }
        })();
    }, []); */

  useEffect(() => {
    setMarkerPosition({
      latitude: trip.latitude,
      longitude: trip.longitude,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    });
  }, []);

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        {markerPosition && (
          <MapView
            style={styles.map}
            //provider={PROVIDER_GOOGLE}

            initialRegion={{
              latitude: trip.latitude,
              longitude: trip.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
          >
            <Marker
              coordinate={markerPosition}
              title="Vous êtes ici"
              image={require("../assets/marker.png")}
            />
          </MapView>
        )}

        <View style={styles.card}>
          <Text style={styles.title}>Récapitulatif de la course</Text>
          <Text style={styles.text}>Départ : </Text>
          <Text style={styles.info}>{trip.departure} </Text>
          <Text style={styles.text}>Arrivée : </Text>
          <Text style={styles.info}>{trip.arrival} </Text>
          <Text style={styles.text}>Distance : </Text>
          <Text style={styles.info}> {trip.distance}</Text>
          <Text style={styles.text}>Temps de trajet estimé :</Text>
          <Text style={styles.info}> {trip.duration}</Text>
          <Text style={styles.text}>Prix : </Text>
          <Text style={styles.info}> {trip.cost}€</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleValidate()}
        >
          <Text style={styles.textButton}>Valider la course</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: "90%",
  },

  linearGradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    height: "30%",
    width: "85%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "50%",
    borderRadius: 10,
  },

  title: {
    fontSize: 22,
  },

  text: {
    fontWeight: "700",
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
