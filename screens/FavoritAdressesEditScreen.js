import { GOOGLE_PLACES_API_KEY } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function FavoritAdresses({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [homeUpdate, setHomeUpdate] = useState({});
  const [workUpdate, setWorkUpdate] = useState({});

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
  
    const loadFavoriteAddresses = async () => {
      fetch(`https://huguette-backend.vercel.app/users/favoriteAddresses/${user.token}`)
        .then(response => response.json())
        .then(data => {

          if (data.result) {
            setHomeUpdate(data.home ? data.home.completeAddress : "");
            setWorkUpdate(data.work ? data.work.completeAddress : "");
          } else {
            console.error("Failed to load addresses:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    loadFavoriteAddresses()
  }, [user.token]
  );


  const handleBack = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleHome = (data, details) => {
    console.log("Data départ:", data);
    console.log("Details départ:", details.geometry?.location);
    setHomeUpdate({
      latitude: details.geometry?.location.lat,
      longitude: details.geometry?.location.lng,
      completeAddress: data.description,
    });
  };
  const handleWork = (data, details) => {
    console.log("Data départ:", data);
    console.log("Details départ:", details.geometry?.location);
    setWorkUpdate({
      latitude: details.geometry?.location.lat,
      longitude: details.geometry?.location.lng,
      completeAddress: data.description,
    });
  };

  const setNewAddress = () => {

    fetch("https://huguette-backend.vercel.app/users/favoriteAddresses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        longitudeH: homeUpdate.longitude,
        latitudeH: homeUpdate.latitude,
        longitudeW: workUpdate.longitude,
        latitudeW: workUpdate.latitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Addresses updated", data);
        } else {
          console.error("Update Addresses Failed:", data.error);
        }
      });
    setModalVisible(false)
  }

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportement différent pour iOS et Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 500 : 0}
      >
        <View style={styles.container}>
          <SafeAreaView>
            <TouchableOpacity onPress={() => handleBack()}>
              <FontAwesome name="times" size={30} color="#333" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Adresses favorites</Text>
            </View>
            <View style={styles.adressesContainer}>
              <View style={styles.home}>
                <View style={styles.group} activeOpacity={0.3}>
                  <FontAwesome name="home" size={25} color="#3e3e3e" />
                  <Text style={styles.text}>Maison</Text>
                </View>
                <GooglePlacesAutocomplete
                  placeholder={homeUpdate.toString()}
                  textInputProps={{
                    placeholderTextColor: 'grey',
                  }}
                  onChangeText={(value) => setHomeUpdate(value)}
                  value={homeUpdate}
                  onPress={handleHome}
                  fetchDetails={true}
                  query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "fr",
                    components: "country:fr",
                  }}
                  styles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      // height:'50%',
                      // zIndex: 1,
                      // backgroundColor:'red',
                    },
                    textInputContainer: {
                      height: "100%",
                      // marginHorizontal: 20,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textInput: {
                      width: "100%",
                      backgroundColor: "transparent",
                      borderBottomWidth: 1,
                      borderColor: "black",
                      marginBottom: 20,
                      fontSize: 16,
                      padding: 10,
                      fontFamily: "OpenSans-Regular",
                    },
                    listView: {
                      width: "100%",
                      position: "absolute",
                      top: "10%",
                      borderWidth: 0,
                      borderColor: "black",
                      marginHorizontal: 20,
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowOffset: { x: 0, y: 0 },
                      shadowRadius: 15,
                      marginTop: "10%",
                      zIndex: 140,
                    },
                  }}
                />
              </View>

              <View style={styles.work}>
                <View style={styles.group} activeOpacity={0.3}>
                  <FontAwesome name="car" size={23} color="#3e3e3e" />
                  <Text style={styles.text}>Bureau</Text>
                </View>
                <GooglePlacesAutocomplete
                  placeholder={workUpdate.toString()}
                  textInputProps={{
                    placeholderTextColor: 'grey',
                  }}
                  onChangeText={(value) => setWorkUpdate(value)}
                  value={workUpdate}
                  onPress={handleWork}
                  fetchDetails={true}
                  query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "fr",
                    components: "country:fr",
                  }}
                  styles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
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
                      width: "100%",
                      backgroundColor: "transparent",
                      borderBottomWidth: 1,
                      borderColor: "black",
                      marginBottom: 20,
                      fontSize: 16,
                      padding: 10,
                      fontFamily: "OpenSans-Regular",
                    },
                    listView: {
                      width: "100%",
                      position: "absolute",
                      top: "10%",
                      borderWidth: 0,
                      borderColor: "black",
                      marginHorizontal: 20,
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowOffset: { x: 0, y: 0 },
                      shadowRadius: 15,
                      marginTop: "10%",
                    },
                  }}
                />
              </View>
            </View>


            <TouchableOpacity
              onPress={() => toggleModal()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Voulez-vous valider vos modifications ?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    onPress={() => setNewAddress()}
                    style={styles.modalButton}
                  >
                    <Text style={styles.textModal}>Oui</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.textModal}>Non</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  container: {
    paddingTop: "10%",
    margin: "3%",
  },
  titleContainer: {
    textAlign: "center",
  },
  work: {
    zIndex: 0,
  },

  home: {
    zIndex: 140,
  },
  title: {
    paddingTop: "10%",
    fontSize: 40,
    color: "#473E66",
    fontFamily: "Ladislav-Bold",
    textAlign: "center",
  },

  adressesContainer: {
    marginTop: "20%",
    height: "40%",
    justifyContent: "space-around",
  },

  group: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: "3%",
  },

  input: {
    fontSize: 16,
    fontFamily: "Ladislav-Bold",
    color: "#473E66",
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
  },

  text: {
    fontSize: 25,
    fontFamily: "Ladislav-Bold",
    marginLeft: "5%",
  },

  button: {
    marginTop: "50%",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F88559",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  modal: {
    justifyContent: "center", // Ajusté pour centrer la modale
    alignItems: "center",
    margin: 0,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingRight: "14%",
    width: "100%",
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

  textModal: {
    color: "white",
  },
});
