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
