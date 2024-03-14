import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import {
  addArrival,
  addCost,
  addDeparture,
  addDistance,
  addDuration,
  addLatitude,
  addLongitude,
  addTripId,
} from "../reducers/trip";

export default function MapScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  //const [addresses, setAddresses] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState({});
  const [isAccompanied, setIsAccompanied] = useState(false);
  const [mood, setMood] = useState(false);
  const [music, setMusic] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  const trip = useSelector((state) => state.trip.value);
  const dispatch = useDispatch();


  const handleMapScreen = () => {
    navigation.navigate('TabNavigator', { screen: 'Map'});

}

useEffect(() => {
  // Démarre un compte à rebours au chargement du composant
  const timer = setTimeout(() => {
    navigation.navigate("Route"); // Navigue vers la page ConfirmDriver après 2 secondes
  }, 3000); // 2000 millisecondes = 2 secondes

  return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté avant que le timer se termine
}, [navigation]); // Assurez-vous de lister navigation comme dépendance si vous utilisez linter



  // Essai en dur avec une liste d'adresses favorites - A SUPPRIMER UNE FOIS DYNAMIQUE
  const addressesList = [
    {
      name: "Maison",
      address: "16 rue des Boulets, PARIS",
    },
    {
      name: "La Capsule",
      address: "56 boulevard Pereire, PARIS",
    },
  ];



  let iconStyleMusic = {};
  let iconStyleMood = {};
  if (music) {
    iconStyleMusic = { color: "#EBB2B5" };
  }

  if (mood) {
    iconStyleMood = { color: "#EBB2B5" };
  }

  const handleValidate = () => {
    if (!arrival.completeAddress) {
      setErrorModalVisible(true); // Affiche la modale d'erreur
      return; // Empêche la navigation si les conditions ne sont pas remplies
    }


    fetch("https://huguette-backend.vercel.app/trips/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        longitudeD: departure.longitude,
        latitudeD: departure.latitude,
        longitudeA: arrival.longitude,
        latitudeA: arrival.latitude,
        tokenPassenger: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("OK:", trip);
          dispatch(addTripId(data.trip._id));
          dispatch(addDeparture(data.trip.departure.completeAddress));
          dispatch(addArrival(data.trip.arrival.completeAddress));
          dispatch(addDuration(data.trip.estimatedDuration));
          dispatch(addDistance(data.trip.distance));
          //dispatch(addCost(parseFloat(data.trip.estimatedDuration) * 30));
          dispatch(addLongitude(data.trip.departure.longitude));
          dispatch(addLatitude(data.trip.departure.latitude));
          setArrival({});
          setDeparture({});
          setModalVisible(false);
          navigation.navigate("MapPosition");

          if (data.trip.estimatedDuration.includes("hour")) {
            const str = data.trip.estimatedDuration;
            const parts = str.split("mins").join("").split("hours");
            const minutes = Math.floor(
              Number(parts[0]) * 60 + Number(parts[1])
            );
            console.log(parts);
            console.log(minutes);
            dispatch(addCost(parseFloat(minutes) * 0.9));
          } else {
            dispatch(
              addCost(Math.floor(parseFloat(data.trip.estimatedDuration) * 0.9))
            );
          }
          if (data.trip.estimatedDuration.includes("hour")) {
            const str = data.trip.estimatedDuration;
            const parts = str.split("mins").join("").split("hours");
            const minutes = Math.floor(
              Number(parts[0]) * 60 + Number(parts[1])
            );
            console.log(parts);
            console.log(minutes);
            dispatch(addCost(Math.floor(parseFloat(minutes) * 0.9)));
          } else {
            dispatch(
              addCost(Math.floor(parseFloat(data.trip.estimatedDuration) * 0.9))
            );
          }

          console.log("tripBDD:", data.trip);
        } else {
          console.error("Failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      fetch("https://huguette-backend.vercel.app/users/moodPassenger", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isAccompanied: isAccompanied,
        token: user.token,
        music: music,
        mood: mood,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Music changed:", data);
        } else {
          console.error("Failed Music:", data.error);
        }
      });
  };

  //console.log("tripReducer:", trip);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
          setDeparture(location.coords);
        });
      }
    })();
  }, [modalVisible]);

  // Affichage des adresses favorites
  const addresses = addressesList.map((data, i) => {
    return (
      <View key={i} style={styles.addresses}>
        <Text style={styles.name}>{data.name}</Text>
        <Text>{data.address}</Text>
      </View>
    );
  });

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
        >
          <Marker
            coordinate={currentPosition}
            title="Vous êtes ici"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      <ScrollView >
        
      <View style={styles.search}>
        <Text style={styles.title}>Votre chauffeuse Margueritte est en route !</Text>
        <Text style={styles.text}>Temps estimé : 4 minutes</Text>
        <View style={styles.buttonContainer}>
           <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonScreen}>
                <Text style={styles.textButton}>Contacter</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => setModalVisible2(true)} style={styles.buttonScreen}>
                <Text style={styles.textButton}>Annuler</Text>
           </TouchableOpacity>
       </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
         <View style={styles.centeredView}>
            <View style={styles.modalContent}>
               <Text style={styles.modalText}>Voulez-vous contacter votre chauffeur ?</Text>
                  <View style={styles.buttonModalContainer}> 
                     <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.textModal}>Message</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                      <Text style={styles.textModal}>Fermer</Text>
                     </TouchableOpacity>
                  </View>
              </View>    
        </View>
    </Modal>
    <Modal visible={modalVisible2} transparent={true} animationType="slide">
         <View style={styles.centeredView}>
            <View style={styles.modalContent}>
               <Text style={styles.modalText}>Voulez-vous annumler votre course ?</Text>
                  <View style={styles.buttonModalContainer}> 
                     <TouchableOpacity style={styles.modalButton} onPress={() => handleMapScreen()} >
                        <Text style={styles.textModal}>Oui</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible2(false)}>
                      <Text style={styles.textModal}>Non</Text>
                     </TouchableOpacity>
                  </View>
              </View>    
        </View>
    </Modal>
            </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Caractéristiques pour la page principale
  linearGradient: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: "70%",
  },

  modalHeader: {
    margin: 20,
    height: Dimensions.get("window"),
  },

  addresse: {
    width: "95%",
    height: "35%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  search: {
    paddingTop: '7%',
    width: "100%",
    justifyContent: "center",
  },

  title: {
    fontSize: 40,
    marginLeft: 10,
    fontFamily: "Ladislav-Bold",
  },

  text: {
    fontSize: 20,
    fontWeight: "400",
    margin: 10,
    paddingTop: '2%',
    fontFamily: "Ladislav-Bold",
  },

  // DEBUT DES ELEMENTS DE LA MODAL
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  shadowContainer: {
    width: "80%",
    height: "38%",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: 'transparent', // Assurez-vous que le conteneur d'ombre est transparent
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  
  profile: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
    }),
  },

  titlemodal: {
    fontSize: 22,
    marginLeft: 10,
    fontFamily: "Ladislav-Bold",
    textAlign: "center",
    color: 'red',
   
  },

  autoDeparture: {
    height: "20%",
    width: "90%",
    zIndex: 150,
  },

  autoArrival: {
    height: "20%",
    width: "90%",
    zIndex: 120,
  },

  isaccompanied: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },

  textmodal: {
    fontSize: 16,
    margin: 10,
    fontWeight: "600",
  },

  mood: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    margin: 30,
  },

  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "25%",
  },

  addresses: {
    marginTop: 20,
    color: "#000",
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
  },

  scrollView: {
    width: Dimensions.get("window").width,
    padding: 30,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  buttonContainer:{
    paddingTop: '10%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '10%',
    
    
  },

  button: {
    height: 40,
    width: "60%",
    alignItems: "center",
    justifyContent: 'center',
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

  buttonScreen: {
    height: 40,
    width: "40%",
    alignItems: "center",
    justifyContent: 'center',
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
    fontFamily: "Ladislav-Bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  

  buttonClose: {
    backgroundColor: "#F88559", // Couleur du bouton pour fermer la modale, ajustable
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  // modalContent: {
  //   backgroundColor: "white",
  //   padding: 20,
    
  //   alignItems: "center",
  //   borderRadius: 10,
  //   borderColor: "rgba(0, 0, 0, 0.1)",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
    width: '80%', // Définissez une largeur fixe pour la modale pour un meilleur contrôle
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // modalText: {
  //   fontSize: 20,
  //   marginBottom: 15,
  //   textAlign: "center",
  // },

  modalText: {
    fontSize: 20,
    marginBottom: 20, // Augmentez l'espacement entre le texte et les boutons
    textAlign: "center",
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  
  // buttonModalContainer:{
  //   flexDirection: 'row',
  //   width: '50%',
  //   backgroundColor: 'blue',
  // },

  buttonModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Cela va espacer les boutons automatiquement
    width: '100%', // Utilisez la largeur totale de la modale pour le conteneur des boutons
    marginTop: 10, // Ajoutez un peu d'espace au-dessus des boutons si nécessaire
  },

  modalButton: {
    backgroundColor: "#F88559",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  // Ajoutez un style pour le texte des boutons dans la modale
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  
  textModal: {
    color: 'white',
  },
  

});
