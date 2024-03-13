import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Dimensions,
} from "react-native";
import Modal from 'react-native-modal';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutTrip } from '../reducers/trip';
import { logout } from '../reducers/user';

export default function ProfileScreen({ navigation }) {

  const trip = useSelector((state) => state.trip.value);
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);


  /* const [isAccompanied, setIsAccompanied] = useState(false);
  const toggleSwitch = () =>
    setIsAccompanied((previousState) => !previousState); */

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handledDontDisconnect = () => {
    toggleModal();
  }



  const handleProfileInfo = () => {
    navigation.navigate("ProfilInformationsEdit");
  };

  const handleFavorite = () => {
    navigation.navigate("FavoritAdressesEdit");
  };

  const handlePaiement = () => {
    navigation.navigate("PaiementEdit");
  };

  const handleContact = () => {
    navigation.navigate("ContactEdit");
  };

  const handleLogOut = () => {
    dispatch(logoutTrip());
    dispatch(logout());
    navigation.navigate("Home");
    console.log(trip, user)
  };

  return (

    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <SafeAreaView>

          <View style={styles.bar}>
            <FontAwesome name="bolt" size={25} color="#3e3e3e" style={styles.icon}/>
            <View style={styles.navigation}>
            <Text style={styles.text}>Conductrice/ Passagère</Text>
            <Switch
              trackColor={{ false: "#F1C796", true: "#F88559" }}
              //thumbColor={isAccompanied ? "#E0CAC2" : "#E0CAC2"}
              ios_backgroundColor="#3e3e3e"
            //onValueChange={toggleSwitch}
            //value={isAccompanied}
            />
            </View>
          </View>



          <TouchableOpacity onPress={() => handleProfileInfo()} style={styles.bar} activeOpacity={0.3}>
            <FontAwesome name="user" size={26} color="#3e3e3e" style={styles.icon}/>
            <View style={styles.navigation}>
            <Text style={styles.text}>Informations personnelles</Text>
            <FontAwesome name="arrow-right" size={20} color="#3e3e3e" />
            </View>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleFavorite()} style={styles.bar} activeOpacity={0.3}>
            <FontAwesome name="car" size={20} color="#3e3e3e" style={styles.icon}/>
            <View style={styles.navigation}>
            <Text style={styles.text}>Adresses favorites</Text>
            <FontAwesome name="arrow-right" size={20} color="#3e3e3e" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePaiement()} style={styles.bar} activeOpacity={0.3}>
            <FontAwesome name="money" size={21} color="#3e3e3e" style={styles.icon}/>
          <View style={styles.navigation}>
            <Text style={styles.text}>Paiement</Text>
            <FontAwesome name="arrow-right" size={20} color="#3e3e3e" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleContact()} style={styles.bar} activeOpacity={0.3}>
            <FontAwesome name="phone" size={25} color="#3e3e3e" style={styles.icon}/>
          <View style={styles.navigation}>
            <Text style={styles.text}>Contact d'urgence</Text>
            <FontAwesome name="arrow-right" size={20} color="#3e3e3e" />
            </View>
          </TouchableOpacity>



            <TouchableOpacity onPress={() => toggleModal()} style={styles.button} activeOpacity={0.8} >
              <Text style={styles.textButton}>Se déconnecter</Text>
            </TouchableOpacity>


            <Modal isVisible={isModalVisible} style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Voulez-vous vous déconnecter ?</Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity onPress={() => handleLogOut(false)} style={styles.modalButton}>
                    <Text style={styles.textModal}>Oui</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handledDontDisconnect(false)} style={styles.modalButton}>
                    <Text style={styles.textModal}>Non</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

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
    paddingTop: '25%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

  },

  bar: {
    width: Dimensions.get("window").width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2%',

  },

  icon: {
    alignItems: 'flex-start',
    marginRight: '5%',

  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '91%'
  },

  text: {
    fontSize: 20,
    fontFamily: 'Ladislav-Bold',

  },


  button: {
    marginTop: '90%',
    height: '8%',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#EAAC8B",
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
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,

  },


  // CARACTERISTIQUES DE LA MODAL

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


  textModal: {
    color: 'white',
  },

});
