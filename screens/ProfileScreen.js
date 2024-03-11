import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import Modal from 'react-native-modal'; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import {useDispatch,useSelector } from "react-redux";
import {logoutTrip} from '../reducers/trip';
import {logout} from '../reducers/user';

export default function ProfileScreen({ navigation }) {

  const trip = useSelector((state) => state.trip.value);
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isAccompanied, setIsAccompanied] = useState(false);

  const toggleSwitch = () =>
  setIsAccompanied((previousState) => !previousState);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handledDontDisconnect = () => {
    toggleModal();
    }

  
  const handleSignIn = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const handleProfilInfo = () => {
    navigation.navigate("ProfilInformationsEdit");
  };

  const handleFavorit = () => {
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
        <SafeAreaView style={styles.container}>

        <View  style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="bolt" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Conductrice/ Passagère</Text>
               </View>
           </View>
           <View style={styles.isaccompanied}>
                <Switch
                  trackColor={{ false: "#F1C796", true: "#F88559" }}
                  thumbColor={isAccompanied ? "#E0CAC2" : "#E0CAC2"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isAccompanied}
                />
              </View>
        </View>


        <TouchableOpacity onPress={() => handleProfilInfo()} style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="user" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Informations personnelles</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => handleFavorit()} style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="car" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Adresses préférées</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => handlePaiement()} style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="money" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Paiement</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleContact()} style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="phone" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Contacts d'urgence</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => toggleModal()} style={styles.button} activeOpacity={0.8} >
             <Text style={styles.textButton}>Se déconnecter</Text>
          </TouchableOpacity>


          {/* <Modal isVisible={isModalVisible} style={styles.modal}>
           <View style={styles.modalContent}>
                 
                        <View>
                          <TouchableOpacity>
                            <Text>Voulez-vous valider vos modifications ?</Text>
                          </TouchableOpacity>
                            <View style={styles.modalButtonContainer}>
                               <View>
                                  <TouchableOpacity onPress={() => handleLogOut()} style={styles.modalButton}>
                                     <Text tyle={styles.textModal}>Oui</Text>
                                  </TouchableOpacity>
                               </View>
                               <View>
                                  <TouchableOpacity onPress={() => handledDontDisconnect()} style={styles.modalButton}>
                                     <Text tyle={styles.textModal}>non</Text>
                                  </TouchableOpacity>
                               </View>
                          </View>
                        </View>     
           </View>
          </Modal> */}


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


        </View> 
           

        </SafeAreaView>

    </LinearGradient>

);
}

const styles = StyleSheet.create({


linearGradient: {
    flex: 1,
    paddingTop: '30%',
},

container: {
  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
 
},

bar:{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom:'6%',
 
},

bar1:{
paddingLeft: '4%',
width: '85%',
flexDirection: 'row',
alignItems: 'center',
},

bar2:{
  paddingRight: '6%',
},

bar11:{
width: '8%',
justifyContent: 'center',
alignItems: 'center',
},

bar12:{
  paddingLeft: '4%',
},

isaccompanied: {
  marginRight: "20%",
},

centerLine: {
    height: 45,
    justifyContent: 'center',
    alignItems: "flex-start",
    backgroundColor: 'transparent',
    borderRadius: 10,

},


textEmergency: {
    fontWeight: '800',
    fontSize: 20,
    marginRight: '10%',
},

endLine:{

},

buttonContainer:{
  marginTop: '75%',
  width: '60%',
  alignItems: 'center',
},

button: {
  
  height: 40,
  paddingTop: 8,
  width: "60%",
  alignItems: "center",
  marginTop: 20,
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
      height: 30,
      fontWeight: '600',
      fontSize: 16,
      
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
