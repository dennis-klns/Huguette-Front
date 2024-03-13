import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from 'react-native-modal';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutTrip } from '../reducers/trip';
import { logout } from '../reducers/user';



export default function FavoritAdresses({ navigation }) {

  const handleBack = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (

    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>

        <SafeAreaView>

          <TouchableOpacity onPress={() => handleBack()}>
            <FontAwesome name="times" size={20} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Adresses favorites</Text>


          <View style={styles.adressesContainer}>

            <View style={styles.group} activeOpacity={0.3}>
              <FontAwesome name="home" size={25} color="#3e3e3e" />
              <Text style={styles.text}>Maison</Text>
            </View>
            <TextInput style={styles.input} placeholder='Adresse du domicile'></TextInput>
          </View>

          <View style={styles.group} activeOpacity={0.3}>
            <FontAwesome name="home" size={25} color="#3e3e3e" />
            <Text style={styles.text}>Maison</Text>
          </View>
          <TextInput style={styles.input} placeholder='adresse maison'></TextInput>
     



      {/* <View style={styles.body} activeOpacity={0.3}>
        <View style={styles.body2}>
          <View style={styles.logoContainer}>
            <FontAwesome name="car" size={25} color="#3e3e3e" />
          </View>
          <View style={styles.bar12}>
            <Text style={styles.textEmergency}>Travail</Text>
          </View>
        </View>
        <TextInput style={styles.input} placeholder='adresse travail'></TextInput>
      </View> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => toggleModal()} style={styles.button} activeOpacity={0.8} >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Voulez-vous valider vos modifications ?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.textModal}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.textModal}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

    </SafeAreaView>
      </View >

    </LinearGradient >

  );
}

const styles = StyleSheet.create({


  linearGradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '20%'
  },

  title: {
    paddingTop: '5%',
    fontSize: 30,
    color: "#473E66",
    fontFamily: 'Ladislav-Bold',
  },

  adressesContainer: {
    flex: 1, // Utilisez flex pour une adaptation plus dynamique
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '10%',
  },

  group: {
    width: '100%',
    height: '15%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10%',
    paddingBottom: '6%',


  },

  


  input: {
    width: "80%",
    fontSize: 16,
    fontWeight: "800",
    color: "#473E66",

    fontFamily: "OpenSans-Regular",
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,

  },

  text: {
    fontWeight: '800',
    fontSize: 20,
    marginRight: '10%',
  },



  buttonContainer: {
    width: '60%',
    alignItems: 'center',
    marginBottom: 20,
  },

  button: {
    height: 50,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F88559",
    borderRadius: 25,
    marginTop: '30%',
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
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,

  },


  texteModal: {
    marginTop: 10,
    fontSize: 15,
  },

  modal: {
    justifyContent: 'center', // Ajusté pour centrer la modale
    alignItems: 'center',
    margin: 0,
  },


  modalContent: {
    height: '70%',
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",

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
