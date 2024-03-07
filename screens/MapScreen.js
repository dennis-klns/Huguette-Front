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
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
<<<<<<< HEAD
import { useSelector } from "react-redux";
=======
import { useSelector, useDispatch } from "react-redux";
>>>>>>> fbbbd3cb2a6ce9dca63d940ea31890325e4c8d5f

import * as Location from "expo-location";
import { Marker } from "react-native-maps";

import { addDeparture, addArrival } from '../reducers/trips'

export default function MapScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [addresses, setAddresses] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState("");
  const [isAccompanied, setIsAccompanied] = useState(false);
  const [mood, setMood] = useState(false);
  const [music, setMusic] = useState(false);
<<<<<<< HEAD
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.user.value);
=======


  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();
>>>>>>> fbbbd3cb2a6ce9dca63d940ea31890325e4c8d5f

  // Récupération des données lat,long du départ et de l'arrivée

  const handleDepartureSelect = (data, details) => {
    console.log("Data départ:", data);
    console.log("Details départ:", details.geometry?.location);
    dispatch(addDeparture(data.description));
    setDeparture({ latitude: details.geometry?.location.lat, longitude: details.geometry?.location.lng, completeAddress: data.description })
  }


  const handleArrivalSelect = (data, details) => {
    console.log("Data arrivée:", data);
    console.log("Details arrivée:", details.geometry?.location);
    dispatch(addArrival(data.description));
    setArrival({ latitude: details.geometry?.location.lat, longitude: details.geometry?.location.lng, completeAddress: data.description })
  }

  const toggleSwitch = () =>
    setIsAccompanied((previousState) => !previousState);

  const changeMood = () => {
    setMood((previousState) => !previousState);
  };

  const changeMusic = () => {
    setMusic((previousState) => !previousState);
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
    setModalVisible(false);
    fetch("https://huguette-backend.vercel.app/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        longitudeD: departure.longitude,
        latitudeD: departure.latitude,
        completeAddressD: departure.completeAddress,
        longitudeA: arrival.longitude,
        latitudeA: arrival.latitude,
        completeAddressA: arrival.completeAddress,
        tokenPassenger : user.token,

      }),
    })
      .then((response) => response.json())
      .then(data => {
        if (data.result) {
          console.log('OK');
        } else {
          console.error('Failed:', data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    navigation.navigate("MapPosition");
  };

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
        >
          <Marker
            coordinate={currentPosition}
            title="Vous êtes ici"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      <View style={styles.search}>
        <Text style={styles.text}>Hello {user.firstname},</Text>
        <Text style={styles.text}>Ou allons nous ?</Text>
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
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome name="times" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.profile}>
              <GooglePlacesAutocomplete
                placeholder="Départ"
                onChangeText={(value) => setDeparture(value)}
                fetchDetails={true}
                value={departure}
                onPress={handleDepartureSelect}
                query={{
                  key: "AIzaSyDXDHg0TNXOSiKX6Mj2dWkDrzKLwYVh7R0",
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
                    height: 54,
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
                  },
                }}
              />
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
                    zIndex: 100,
                  },
                  textInputContainer: {
                    height: 54,
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
                  },
                }}
              />

              <View style={styles.isaccompanied}>
                <Text style={styles.text}>Je suis accompagnée</Text>
                <Switch
                  trackColor={{ false: "#F1C796", true: "#F88559" }}
                  thumbColor={isAccompanied ? "#E0CAC2" : "#E0CAC2"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isAccompanied}
                />
              </View>
              <View style={styles.mood}>
                <Text style={styles.text}>MOOD</Text>
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

            <ScrollView contentContainerStyle={styles.scrollView}>
              {addresses}
            </ScrollView>

            <TouchableOpacity
              onPress={() => handleValidate()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: "70%",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalHeader: {
    margin: 20,
  },

  modalHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    fontSize: 16,
    padding: 10,
  },

  searchButton: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },

  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  search: {
    width: "100%",
    justifyContent: "center",
    margin: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  profile: {
    width: "80%",
    minHeight: "30%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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

  input: {
    width: "90%",
    marginTop: 25,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#4F4F4F",
  },

  isaccompanied: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30,
  },

  mood: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
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
