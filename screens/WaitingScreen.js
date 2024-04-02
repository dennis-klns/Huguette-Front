import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { logoutTrip } from "../reducers/trip";

export default function WaitingScreen({ navigation }) {
  const trip = useSelector((state) => state.trip.value);
  const dispatch = useDispatch();

  useEffect(() => {
    // Démarre un compte à rebours de 5 secondes au chargement du composant
    const timer = setTimeout(() => {
      navigation.navigate("ConfirmDriver"); // Navigue vers la nouvelle page après 5 secondes
    }, 10000); // 5000 millisecondes = 5 secondes

    return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté avant que le timer se termine
  }, [navigation]); // Assurez-vous de lister navigation comme dépendance si vous utilisez linter

  const handleCancel = () => {
    fetch("https://huguette-backend.vercel.app/trips/cancelationPassenger", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId: trip.tripId, cancelledPassenger: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.trip);
        if (data.result) {
          console.log("OK");
          dispatch(logoutTrip());
        } else {
          console.log(trip);
          console.error("Failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    navigation.navigate("Map");
  };

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2c0MzNxZnVwM2RyZGUyZTB6NGhqZjZ5OWgxMjFhZ2I3eXBxdTEzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QBd2kLB5qDmysEXre9/giphy.gif",
          }}
          style={styles.image}
        />

      
          <Text style={styles.mainTitle}>Nous recherchons votre conductrice...</Text>
       
        

        <View style={styles.card}>
          <Text style={styles.title}>Récapitulatif</Text>
          <Text style={styles.text}>De : <Text style={styles.info}>{trip.departure}</Text></Text>
          <Text style={styles.text}>à : <Text style={styles.info}>{trip.arrival}</Text></Text>
          <Text style={styles.text}>Prix - {trip.cost}€</Text>
        </View>
     {/*    <View style={styles.card}>
          <Text style={styles.title}>Marguerite</Text>
          <Text style={styles.text}>Mood: #fun #music</Text>
        </View> */}
        <View style={styles.card}>
          <Text style={styles.title}>Votre code</Text>
          <Text style={styles.infoCode}>(à communiquer à votre conductrice)</Text>
          <Text style={styles.code}>7543 </Text>
        </View>

        {/* <View style={styles.card}>
          <Text style={styles.text}>Echanger avec Marguerite...</Text>
        </View> */}

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton} onPress={() => handleCancel()}>
            Annuler la course
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    height: "45%",
    width: "100%",
  },


  mainTitle: {
    marginTop: '10%',
    fontSize: 23,
    fontFamily: "Ladislav-Bold",
    color: 'white',
  

  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "90%",
    borderRadius: 30,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
   
  },

  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "Ladislav-Bold",
    alignSelf: 'center',
  },

  text: {
    fontWeight: "800",
    fontSize: 14,
    paddingLeft: 40,
  },

  info: {
    fontSize: 14,
    fontWeight: "400",
    paddingLeft: 40,
  },

  code: {
    fontWeight: "800",
    fontSize: 20,
    alignSelf: 'center',
  },

  infoCode: {
    fontSize: 14,
    fontWeight: "400",
    alignSelf: 'center',
    marginBottom: '2%',
  },

  button: {
    height: 40,
    width: "80%",
    justifyContent: 'center',
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
    fontWeight: "600",
    fontSize: 16,
  },
});
