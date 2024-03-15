import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
 
} from "react-native";

import MapView from "react-native-maps";

import * as Location from "expo-location";
import { Marker } from "react-native-maps";


export default function MapScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [departure, setDeparture] = useState(null);
  //const [addresses, setAddresses] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);


  const handleMapScreen = () => {
    navigation.navigate('TabNavigator', { screen: 'Map'});

}

useEffect(() => {
  // Démarre un compte à rebours au chargement du composant
  const timer = setTimeout(() => {
    navigation.navigate("Route"); // Navigue vers la page ConfirmDriver après 2 secondes
  }, 20000); // 2000 millisecondes = 2 secondes

  return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté avant que le timer se termine
}, [navigation]); // Assurez-vous de lister navigation comme dépendance si vous utilisez linter



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
        <Text style={styles.title}>Votre conductrice Marguerite est en route !</Text>
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
               <Text style={styles.modalText}>Voulez-vous contacter votre conductrice ?</Text>
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
               <Text style={styles.modalText}>Voulez-vous annuler votre course ?</Text>
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

  search: {
    padding: '5%',
    width: "100%",
    justifyContent: "center",
  },

  title: {
    fontSize: 35,
    marginLeft: 10,
    fontFamily: "Ladislav-Bold",
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    margin: 10,
    paddingTop: '2%',
  },

  // DEBUT DES ELEMENTS DE LA MODAL


  textModal: {
    fontSize: 15,
    margin: 2,
    fontWeight: "600",
    color: 'white',
  },

  buttonContainer:{
    paddingTop: '10%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '10%',
    
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
  },

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
  

  modalText: {
    fontSize: 20,
    marginBottom: 20, // Augmentez l'espacement entre le texte et les boutons
    textAlign: "center",
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

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
  

});
