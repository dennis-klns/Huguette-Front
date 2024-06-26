import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

import { addHome, addWork } from '../reducers/user'

const googleApiKey = process.env.GOOGLE_API_KEY;
console.log("Google API Key:", googleApiKey);


export default function MapScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState({});
  const [isAccompanied, setIsAccompanied] = useState(false);
  const [mood, setMood] = useState(false);
  const [music, setMusic] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const user = useSelector((state) => state.user.value);
  
  const [home, setHome] = useState({});
  const [work, setWork] = useState({});
  const [addressesList, setAddressesList] = useState([])

  console.log("arrival", arrival);



  const trip = useSelector((state) => state.trip.value);
  const dispatch = useDispatch();

  // Essai en dur avec une liste d'adresses favorites - A SUPPRIMER UNE FOIS DYNAMIQUE


  // Récupération des données lat,long du départ et de l'arrivée
  const handleDepartureSelect = (data, details) => {
    setDeparture({
      latitude: details.geometry?.location.lat,
      longitude: details.geometry?.location.lng,
      completeAddress: data.description,
    });
  };

  const handleArrivalSelect = (data, details) => {
    setArrival({
      latitude: details.geometry?.location.lat,
      longitude: details.geometry?.location.lng,
      completeAddress: data.description,
    });
  };

  const toggleSwitch = () => {
    setIsAccompanied(!isAccompanied);

  };

  const changeMood = () => {
    setMood(!mood);

  };

  const changeMusic = () => {
    setMusic(!music);
  };

  let iconStyleMusic = {};
  let iconStyleMood = {};
  if (music) {
    iconStyleMusic = { color: "#F88559" };
  }

  if (mood) {
    iconStyleMood = { color: "#F88559" };
  }

  const handleValidate = () => {
    if (!arrival.completeAddress) {
      setErrorModalVisible(true); // Affiche la modale d'erreur
      return; // Empêche la navigation si les conditions ne sont pas remplies
    }

    console.log(music, isAccompanied, mood, user.token);


    fetch('https://huguette-back.vercel.app/users/moodpassenger', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        music: false,
        isAccompanied: isAccompanied,
        token: user.token,
        mood: mood,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      })

    fetch("https://huguette-back.vercel.app/trips/", {
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
          // console.log("OK:", trip);
          dispatch(addTripId(data.trip._id));
          dispatch(addDeparture(data.trip.departure.completeAddress));
          dispatch(addArrival(data.trip.arrival.completeAddress));
          dispatch(addDuration(data.trip.estimatedDuration));
          dispatch(addDistance(data.trip.distance));
          dispatch(addLongitude(data.trip.departure.longitude));
          dispatch(addLatitude(data.trip.departure.latitude));
          setArrival({});
          setDeparture({});
          setModalVisible(false);

          if (data.trip.estimatedDuration.includes("hour")) {
            const str = data.trip.estimatedDuration;
            const parts = str.split("mins").join("").split("hours");
            const minutes = Math.floor(
              Number(parts[0]) * 60 + Number(parts[1])
            );
            // console.log(parts);
            // console.log(minutes);
            dispatch(addCost(parseFloat(minutes) * 0.9));
            

          } else {
            dispatch(
              addCost(Math.floor(parseFloat(data.trip.estimatedDuration) * 0.9))
            );
          }
          navigation.navigate("MapPosition");
          // console.log("tripBDD:", data.trip);
        } else {
          console.error("Failed:", data.error);
        }
      }).then(()=>{})
      .catch((error) => {
        console.error("Error:", error);
      });

  };


  const determineAddress = (placeTitle) => {
    placeTitle === 'Maison' ? setArrival(home) : setArrival(work);
  }

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

    

    fetch(`https://huguette-back.vercel.app/users/favoriteAddresses/${user.token}`)
      .then(response => response.json())
      .then(data => {
        const newList = []
        if (data.home) {
          newList.push({
            name: "Maison",
            address: data.home.completeAddress,
          })
          setHome(data.home);
          // console.log('homeBDD',data.home)
        }

        if (data.work) {
          newList.push({
            name: "Travail",
            address: data.work.completeAddress,
          })
          setWork(data.work);
          // console.log('workBDD',data.work)
        }

        setAddressesList(newList)
      })
  }, [modalVisible]);

  useEffect(() => {
    if (addressesList.length > 0) {
      setAddresses(addressesList.map((data, i) => {
        return (
          <TouchableOpacity key={i} style={styles.addresses} onPress={() => determineAddress(data.name)}>
            <Text style={styles.name}>{data.name}</Text>
            <Text>{data.address}</Text>
          </TouchableOpacity>
          );
        }))
      }
  }, [addressesList])



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
    <View style={styles.search}>
      <Text style={styles.title}>Hello {user.firstname},</Text>
      <Text style={styles.text}>Où allons-nous ?</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.addresse}>
          <TextInput placeholder="Addresse" />
          <FontAwesome name="search" size={30} color="grey"></FontAwesome>
        </View>
      </TouchableOpacity>
    </View>
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <LinearGradient
        colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
        style={styles.linearGradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => {
              setModalVisible(false)
              setDeparture({})
              setArrival({})
              }}>
              <FontAwesome name="times" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.shadowContainer}>
            <View style={styles.profile}>
              <View style={styles.autoDeparture}>
                <GooglePlacesAutocomplete
                  placeholder="Ma position"
                  textInputProps={{
                    placeholderTextColor: 'grey',
                  }}
                  onChangeText={(value) => setDeparture(value)}
                  value={departure}
                  onPress={handleDepartureSelect}
                  fetchDetails={true}
                  query={{
                    key: googleApiKey,
                    language: "fr",
                    components: "country:fr",
                  }}
                  styles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 140,
                    },
                    textInputContainer: {
                      height: "50%",
                      marginHorizontal: 20,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textInput: {
                      backgroundColor: "transparent",
                      borderBottomWidth: 1,
                      borderColor: "black",
                      marginBottom: 20,
                      fontSize: 16,
                      padding: 10,
                      fontFamily: "OpenSans-Regular",
                    },
                    listView: {
                      position: "absolute",
                      top: 50,
                      borderWidth: 0,
                      //borderColor: "black",
                      backgroundColor: "#F1C796",
                      marginHorizontal: 20,
                      elevation: 5,
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowOffset: { x: 0, y: 0 },
                      shadowRadius: 15,
                      marginTop: 10,
                      maxHeight: 100, // Limitez la hauteur pour montrer seulement 2 éléments
                      overflow: 'hidden', // Cachez les autres éléments qui dépassent
                    },
                  }}
                  numberOfLines={2}
                />
              </View>

              <View style={styles.autoArrival}>
                <GooglePlacesAutocomplete
                  placeholder={arrival.completeAddress || "Arrivée"}
                  textInputProps={{
                    placeholderTextColor: 'grey',
                  }}
                  onChangeText={(value) => setArrival(value)}
                  value={arrival}
                  onPress={handleArrivalSelect}
                  fetchDetails={true}
                  query={{
                    key: googleApiKey,
                    language: "fr",
                    components: "country:fr",
                  }}
                  styles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 120,

                    },
                    textInputContainer: {
                      height: "50%",
                      marginHorizontal: 20,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,

                    },
                    textInput: {
                      backgroundColor: "transparent",
                      borderBottomWidth: 1,
                      borderColor: "black",
                      marginBottom: 20,
                      fontSize: 16,
                      padding: 10,
                      fontFamily: "OpenSans-Regular",

                    },
                    listView: {
                      position: "absolute",
                      top: 50,
                      borderWidth: 0.5,
                      borderColor: "black",
                      backgroundColor: "#F1C796",
                      marginHorizontal: 20,
                      elevation: 5,
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowOffset: { x: 0, y: 0 },
                      shadowRadius: 15,
                      marginTop: 10,
                      maxHeight: 100, // Limitez la hauteur pour montrer seulement 2 éléments
                      overflow: 'hidden', // Cachez les autres éléments qui dépassent
                    },
                  }}
                  numberOfLines={2}
                />
              </View>

              <View style={styles.isaccompanied}>
                <Text style={styles.textmodal}>Je suis accompagnée</Text>
                <Switch
                  trackColor={{ false: "#F1C796", true: "#F88559" }}
                  thumbColor={isAccompanied ? "#E0CAC2" : "#E0CAC2"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isAccompanied}
                />
              </View>
              <View style={styles.mood}>
                <Text style={styles.textmodal}>MOOD</Text>
                <View style={styles.icon}>
                  <FontAwesome
                    name="music"
                    onPress={() => changeMusic()}
                    size={25}
                    style={iconStyleMusic}
                  />
                  <FontAwesome
                    name="moon-o"
                    onPress={() => changeMood()}
                    size={25}
                    style={iconStyleMood}
                  />
                </View>
              </View>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.titlemodal}>Adresses Favorites</Text>
            {addresses}
          </ScrollView>

          <TouchableOpacity
            onPress={() => handleValidate()}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
          <Modal
            visible={errorModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setErrorModalVisible(false)} // Permet de fermer la modale avec le bouton retour d'Android
          >
            <View style={styles.centeredView}>
              <View style={styles.errorModalView}>
                <Text style={styles.modalText}>
                  Veuillez renseigner une arrivée pour votre course
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setErrorModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
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
    width: "100%",
    justifyContent: "center",
    margin: 10,
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
    backgroundColor: "transparent", // Assurez-vous que le conteneur d'ombre est transparent
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


  button: {
    height: 40,
    //  paddingTop: 8,
    width: "80%",
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


  textButton: {
    color: "#fff",
    //  height: 30,
    fontWeight: "600",
    fontSize: 16,

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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16, // Vous pouvez ajuster la taille du texte ici
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
});
