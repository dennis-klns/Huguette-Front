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
//import { UseSelector } from "react-redux";

import * as Location from "expo-location";
import { Marker } from "react-native-maps";

export default function MapScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: currentPosition?.latitude || 0,
    longitude: currentPosition?.longitude || 0,
  });
  const [addresses, setAddresses] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [isAccompanied, setIsAccompanied] = useState(false);
  const [mood, setMood] = useState(false);
  const [music, setMusic] = useState(false);

  //const user = useSelector((state) => state.user.value);

  // Récupération des données lat,long du départ et de l'arrivée

  const handleDepartureSelect = (data, details) => {
    console.log("Data départ:", data);
    console.log("Details départ:", details.geometry?.location);
  };

  const handleArrivalSelect = (data, details) => {
    console.log("Data arrivée:", data);
    console.log("Details arrivée:", details.geometry?.location);
  };

  const handleRegionChange = (region) => {
    setMarkerPosition(region); // Met à jour la position du marker avec la nouvelle région
    console.log(region);
    console.log(markerPosition);
  };

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
          onRegionChange={handleRegionChange}
        >
          <Marker
            coordinate={markerPosition}
            title="Vous êtes ici"
            image={require("../assets/marker.png")}
          />
        </MapView>
      )}
      <View style={styles.search}>
        <Text style={styles.text}>Hello User,</Text>
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
    justifyContent: "space-around",
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /*text: {
    width: '80%',
    fontSize: 16,
    fontWeight: '800',
    color: '#473E66',
    margin: 10,
},*/

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

// Remplir automatiquement les adresses + affichage (à trier) :

/*<!--
    Copyright 2023 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  -->
<!DOCTYPE html>
<html>
  <head>
    <title>Address Selection</title>
    <style>
      body {
        margin: 0;
      }

      .sb-title {
        position: relative;
        top: -12px;
        font-family: Roboto, sans-serif;
        font-weight: 500;
      }

      .sb-title-icon {
        position: relative;
        top: -5px;
      }

      .card-container {
        display: flex;
        height: 500px;
        width: 600px;
      }

      .panel {
        background: white;
        width: 300px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .half-input-container {
        display: flex;
        justify-content: space-between;
      }

      .half-input {
        max-width: 120px;
      }

      .map {
        width: 300px;
      }

      h2 {
        margin: 0;
        font-family: Roboto, sans-serif;
      }

      input {
        height: 30px;
      }

      input {
        border: 0;
        border-bottom: 1px solid black;
        font-size: 14px;
        font-family: Roboto, sans-serif;
        font-style: normal;
        font-weight: normal;
      }

      input:focus::placeholder {
        color: white;
      }
    </style>
    <script>
      "use strict";

      const CONFIGURATION = {
        "ctaTitle": "Checkout",
        "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":false,"mapTypeControl":false,"streetViewControl":false,"zoom":12,"zoomControl":false,"maxZoom":22,"mapId":""},
        "mapsApiKey": "AIzaSyDXDHg0TNXOSiKX6Mj2dWkDrzKLwYVh7R0",
        "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":false}
      };

      const SHORT_NAME_ADDRESS_COMPONENT_TYPES =
          new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

      const ADDRESS_COMPONENT_TYPES_IN_FORM = [
        'location',
        'locality',
        'administrative_area_level_1',
        'postal_code',
        'country',
      ];

      function getFormInputElement(componentType) {
        return document.getElementById(`${componentType}-input`);
      }

      function fillInAddress(place) {
        function getComponentName(componentType) {
          for (const component of place.address_components || []) {
            if (component.types[0] === componentType) {
              return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
                  component.short_name :
                  component.long_name;
            }
          }
          return '';
        }

        function getComponentText(componentType) {
          return (componentType === 'location') ?
              `${getComponentName('street_number')} ${getComponentName('route')}` :
              getComponentName(componentType);
        }

        for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
          getFormInputElement(componentType).value = getComponentText(componentType);
        }
      }

      function renderAddress(place, map, marker) {
        if (place.geometry && place.geometry.location) {
          map.setCenter(place.geometry.location);
          marker.position = place.geometry.location;
        } else {
          marker.position = null;
        }
      }

      async function initMap() {
        const {Map} = google.maps;
        const {AdvancedMarkerElement} = google.maps.marker;
        const {Autocomplete} = google.maps.places;

        const mapOptions = CONFIGURATION.mapOptions;
        mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
        mapOptions.center = mapOptions.center || {lat: 37.4221, lng: -122.0841};

        const map = new Map(document.getElementById('gmp-map'), mapOptions);
        const marker = new AdvancedMarkerElement({map});
        const autocomplete = new Autocomplete(getFormInputElement('location'), {
          fields: ['address_components', 'geometry', 'name'],
          types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(`No details available for input: '${place.name}'`);
            return;
          }
          renderAddress(place, map, marker);
          fillInAddress(place);
        });
      }
    </script>
  </head>
  <body>
    <div class="card-container">
      <div class="panel">
        <div>
          <img class="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="">
          <span class="sb-title">Address Selection</span>
        </div>
        <input type="text" placeholder="Address" id="location-input"/>
        <input type="text" placeholder="Apt, Suite, etc (optional)"/>
        <input type="text" placeholder="City" id="locality-input"/>
        <div class="half-input-container">
          <input type="text" class="half-input" placeholder="State/Province" id="administrative_area_level_1-input"/>
          <input type="text" class="half-input" placeholder="Zip/Postal code" id="postal_code-input"/>
        </div>
        <input type="text" placeholder="Country" id="country-input"/>
      </div>
      <div class="map" id="gmp-map"></div>
    </div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXDHg0TNXOSiKX6Mj2dWkDrzKLwYVh7R0&libraries=places,marker&callback=initMap&solution_channel=GMP_QB_addressselection_v2_cAB" async defer></script>
  </body>
</html>*/
