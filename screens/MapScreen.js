import {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Location from "expo-location";
import { Marker } from "react-native-maps";

export default function MapScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [addresse, setAddresse] = useState("");

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
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      )}
      <View style={styles.search}>
        <Text style={styles.text}>Hello User,</Text>
        <Text style={styles.text}>Ou allons nous ?</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Addresse"
            onChangeText={(value) => setAddresse(value)}
            value={addresse}
          />
          <FontAwesome name="search" size={30} color="grey"></FontAwesome>
        </View>
      </View>
      {/*<Modal visible={modalVisible} transparent>

        <View style={styles.centeredView}>
         <View style={styles.modalView}>
        <TextInput placeholder="New place" onChangeText={(value) => setNewPlace(value)} value={newPlace} style={styles.input} />

        <TouchableOpacity onPress={() => handleAddPlace()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Close</Text>
        </TouchableOpacity>

        </View>
       </View>

      </Modal> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: "70%",
  },

  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
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

  input: {
    width: "95%",
    height: "20%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontFamily: "Ladislav-Bold",
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
