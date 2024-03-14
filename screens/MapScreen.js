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
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function MapScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [currentPosition, setCurrentPosition] = useState(null);
  //const [addresses, setAddresses] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState({});
  const [isAccompanied, setIsAccompanied] = useState(false);
  const [mood, setMood] = useState(false);
  const [music, setMusic] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  const trip = useSelector((state) => state.trip.value);
  const dispatch = useDispatch();

  // Essai en dur avec une liste d'adresses favorites - A SUPPRIMER UNE FOIS DYNAMIQUE
  const addressesList = [
    {
      name: "Maison",
      address: "16 rue des Boulets, PARIS",
    },
    {
      name: "La Capsule",
      address: "16 rue des Boulets, PARIS",
    },
  ];

  // Récupération des données lat,long du départ et de l'arrivée
  const handleDepartureSelect = (data, details) => {
    console.log("Data départ:", data);
    console.log("Details départ:", details.geometry?.location);
    setDeparture({
      latitude: details.geometry?.location.lat,
      longitude: details.geometry?.location.lng,
      completeAddress: data?.description,
    });
    if(!departure.completeAddress) {
      setDeparture({
        latitude: trip.latitude,
        longitude: trip.longitude,
        completeAddress: trip.departure,
      });
    }
  };

  const handleArrivalSelect = (data, details) => {
    console.log("Data arrivée:", data);
    console.log("Details arrivée:", details.geometry?.location);
    setArrival({
      latitude: details.geometry?.location.lat,
      longitude: details.geometry?.location.lng,
      completeAddress: data?.description,
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
        // if (data.result) {
        //   console.log( data);
        // } else {
        //   console.error( data.error);
        // }
      });


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
            dispatch(addCost(Math.floor(parseFloat(data.trip.estimatedDuration) * 0.9))
            );
          }

          navigation.navigate("MapPosition");
          // console.log("tripBDD:", data.trip);
        } else {
          console.error("Failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
          dispatch(addLongitude(location.coords.longitude));
          dispatch(addLatitude(location.coords.latitude));
          dispatch(addDeparture('Ma Position'));
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
          }}>
          <Marker
            coordinate={currentPosition}
            title="Vous êtes ici"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      {/* <View style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',

          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          }}> */}
      <View style={styles.search}>
        <View style={styles.searchText}>
          <Text style={styles.title}>Hello {user.firstname},</Text>
          <Text style={styles.text}>Où allons-nous ?</Text>
        </View>
        
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
          <View style={{
          width:'100%',
          height:'100%',      
          // justifyContent: '',
          alignItems: 'center',
          // backgroundColor:'blue',
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome name="times" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.shadowContainer}>

              <View style={styles.profile}>
                <View style={styles.googleInputs}>
                  <View style={styles.autoDeparture}>
                    <GooglePlacesAutocomplete
                      placeholder="Ma position"
                      onChangeText={(value) => setDeparture(value)}
                      value={departure}
                      onPress={handleDepartureSelect}
                      fetchDetails={true}
                      query={{
                        key: "AIzaSyDXDHg0TNXOSiKX6Mj2dWkDrzKLwYVh7R0",
                        language: "fr",
                        components: "country:fr",
                      }}
                      styles={{
                        container: {
                          justifyContent: "center",
                          alignItems: "center",
                          width:'100%',
                          // height:'50%',
                          // zIndex: 140,
                          // backgroundColor:'red',
                        },
                        textInputContainer: {
                          height: "100%",
                          // marginHorizontal: 20,
                          borderTopWidth: 0,
                          borderBottomWidth: 0,
                        },
                        textInput: {
                          width:'100%',
                          // backgroundColor: "black",
                          borderBottomWidth: 1,
                          borderColor: "black",
                          marginBottom: 20,
                          fontSize: 16,
                          padding: 10,
                          fontFamily: "OpenSans-Regular",
                        },
                        listView: {
                          height:'400%',
                          width:'100%',
                          position: "absolute",
                          top: '10%',
                          borderWidth: 0,
                          borderColor: "black",
                          marginHorizontal: 20,
                          shadowColor: "#000",
                          shadowOpacity: 0.1,
                          shadowOffset: { x: 0, y: 0 },
                          shadowRadius: 15,
                          marginTop: '20%',
                          /*position: "absolute",
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
                          marginTop: 10,*/ 
                        },
                      }}
                    />
                  </View>

                  <View style={styles.autoArrival}>
                    <GooglePlacesAutocomplete
                      placeholder="Arrivée"
                      onChangeText={(value) => setArrival(value)}
                      value={arrival}
                      onPress={handleArrivalSelect}
                      fetchDetails={true}
                      query={{
                        key: "AIzaSyDXDHg0TNXOSiKX6Mj2dWkDrzKLwYVh7R0",
                        language: "fr",
                        components: "country:fr",
                      }}
                      styles={{
                        container: {
                          justifyContent: "center",
                          alignItems: "center",
                          // zIndex: 120,
                          // backgroundColor:'blue',
                          // height: "100%",
                          width: "100%",
                        },
                        textInputContainer: {
                          height: "100%",
                          width: "100%",
                          // marginHorizontal: 20,
                          borderTopWidth: 0,
                          borderBottomWidth: 0,
                          // backgroundColor: "black",
                        },
                        textInput: {
                          borderBottomWidth: 1,
                          borderColor: "black",
                          marginBottom: 20,
                          fontSize: 16,
                          padding: 10,
                          fontFamily: "OpenSans-Regular",
                        },
                        listView: {
                          height:'400%',
                          width:'100%',
                          position: "absolute",
                          top: '10%',
                          borderWidth: 0,
                          borderColor: "black",
                          marginHorizontal: 20,
                          shadowColor: "#000",
                          shadowOpacity: 0.1,
                          shadowOffset: { x: 0, y: 0 },
                          shadowRadius: 15,
                          marginTop: '20%',
                          /*position: "absolute",
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
                          marginTop: 10,*/ 
                        },
                      }}
                    />
                  </View>
                </View>

                <View style={styles.isaccompanied}>
                  <Text style={styles.textmodal}>Je suis accompagnée</Text>
                  <Switch
                    trackColor={{ false: "#3e3e3e", true: "#EBB2B5" }}
                    thumbColor={isAccompanied ? "#E0CAC2" : "#E0CAC2"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isAccompanied}
                  />
                </View>

                <View style={styles.mood}>
                  <Text style={styles.textmodal}>MOOD</Text>
                  <View style={styles.icons}>
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
              
              <View style={styles.favouriteAddresses}>
                <Text style={styles.titleModal}>Adresses Favorites</Text>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  {addresses}
                </ScrollView>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleValidate()}
                  style={styles.button}
                  activeOpacity={0.8}>
                  <Text style={styles.textButton}>Valider</Text>
                </TouchableOpacity>
              </View>
              
              
          </View>
        </LinearGradient>
        
      </Modal>

      
      {/* </View> */}

      <Modal
                  visible={errorModalVisible}
                  transparent={false}
                  animationType="slide"
                  onRequestClose={() => setErrorModalVisible(false)} // Permet de fermer la modale avec le bouton retour d'Android
                >
                  <LinearGradient 
                  colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
                  style={styles.linearGradient}
                  >
                
                 
                    <View style={styles.errorModalView}>
                      <Text style={styles.modalText}>
                        Veuillez renseigner une arrivée pour votre course.
                      </Text>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setErrorModalVisible(false)}
                      >
                        <Text style={styles.textStyle}>Fermer</Text>
                      </TouchableOpacity>
                    </View>
                  
                  </LinearGradient>
                </Modal>
    </LinearGradient>
    
    
  );
}

const styles = StyleSheet.create({
  // Caractéristiques pour la page principale
  linearGradient: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },

  map: {
    width: Dimensions.get("window").width,
    height: "70%",
  },

  addresse: {
    width: "95%",
    height: "30%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom:'10%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  search: {
    width: "100%",
    height:'40%',
    justifyContent: "space-around",
    alignItems:'flex-start',
    paddingLeft:'5%',
  },

  searchText: {
    width: "100%",
  },

  title: {
    fontSize: 40,
    fontFamily: "Ladislav-Bold",
  },

  text: {
    fontSize: 20,
    fontWeight: "400",
  },

  // DEBUT DES ELEMENTS DE LA MODAL
  container: {
    // flex: 1,
    // width:'100%',
    // height:'100%',
    // alignItems: "center",
    // justifyContent:'center'
  },

  modalHeader: {
    margin: '1%',
    // height: Dimensions.get("window"),
    height:'5%',
    width:'100%',
    // backgroundColor:'purple',
    alignItems:'center',
    justifyContent:'center',
  },
  
  shadowContainer: {
    width: "80%",
    height: "40%",
    alignItems: 'center',
    // justifyContent:'space-between',
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: '5',
    // backgroundColor:'blue',

  },

  profile: {
    justifyContent:'space-around',
    alignItems:'center',
    height:'100%',
    width: '100%',
    // backgroundColor:'purple',
  },

  googleInputs: {
    height: "50%",
    width: "100%",
    alignItems:'center',
    // justifyContent:'center',
    // zIndex: 150,
    // backgroundColor:'orange',
  },

  autoDeparture: {
    height: "50%",
    width: "100%",
    // zIndex: 150,
  },

  autoArrival: {
    height: "50%",
    width: "100%",
    // zIndex: 120,
    // marginTop:'5%',
  },

  isaccompanied: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height:'25%',
    // backgroundColor:'green',
  },

  textmodal: {
    fontSize: 16,
    margin: '3%',
    fontWeight: "600",
    
  },

  mood: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
    width: "95%",
    height:'25%',
    marginRight:'5%',
    // backgroundColor:'blue',
  },

  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "25%",
  },

  favouriteAddresses: {
    marginTop: '7%',
    color: "#000",
    // borderBottomColor: "#4F4F4F",
    // borderBottomWidth: 1,
    justifyContent:'center',
    // alignItems:'center',
    width:'80%',
    height:'35%',
    // marginLeft:'10%',
    // backgroundColor:'red',
    marginBottom:'5%',
    
  },

  titleModal: {
    fontSize: 22,
    // marginLeft: 10,
    fontFamily: "Ladislav-Bold",
    // textAlign: "center",
    marginTop:'5%',

  },

  addresses: {
    marginTop: '5%',
    // marginBottom: '2%',
    color: "#000",
    // borderBottomColor: "#4F4F4F",
    // borderBottomWidth: 1,
    width:'100%',
    height:'40%',
    // backgroundColor:'green',
    // alignItems:'flex-start'
    // justifyContent:'center',
  },

  scrollView: {
    // width: Dimensions.get("window").width,
    marginTop: '10%',
    width:'100%',
    height: '80%',
    // padding: "10%",
    // position:'absolute',
    // backgroundColor:'yellow',
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  buttonContainer: {
    width:'100%',
    height:'10%',
    // backgroundColor:'yellow',
    alignItems: "center",
    justifyContent:'center',
  },

  button: {
    height: '70%',
    width: "80%",
    alignItems: "center",
    justifyContent:'center',
    // marginTop: '2%',
    backgroundColor: "#F88559",
    borderRadius: 20,
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
    fontFamily: "OpenSans-Regular",
  },

  // centeredView: {
  //   height:'70%',
  //   width:'70%',
  //   backgroundColor:'red',
  //   // justifyContent: "center",
  //   // alignItems: "center",
  // },

  errorModalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    justifyContent:'space-around',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:'50%',
    width:'70%',
    // backgroundColor:'blue',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    fontSize: 18, // Vous pouvez ajuster la taille du texte ici
    fontWeight:'500',
    margin:'5%',
  },
  buttonClose: {
    backgroundColor: "#F88559", // Couleur du bouton pour fermer la modale, ajustable
    borderRadius: 20,
    // padding: 10,
    // elevation: 2,
    // justifyContent: "center",
    // alignItems: "center",
    width:'80%',
    height:'15%',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    // textAlign: "center",
  },
});
