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
import {useDispatch,useSelector } from "react-redux";
import {logoutTrip} from '../reducers/trip';
import {logout} from '../reducers/user';



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
        <SafeAreaView style={styles.container}>


   
       <View style={styles.closeIcon} >
          <TouchableOpacity onPress={() => handleBack()}>
             <FontAwesome name="times" size={30} color="#333" />
          </TouchableOpacity>
       </View>

       <View>
           <Text style={styles.titleTop}>Adresses favorites</Text>
       </View>

       <View style={styles.adressesContainer} >
         <View style={styles.body} activeOpacity={0.3}>
           <View style={styles.body2}>
               <View style={styles.logoContainer}>
                  <FontAwesome name="home" size={33} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Maison</Text>
               </View>
           </View>
               <TextInput style={styles.input} placeholder='adresse maison'></TextInput>
         </View>
         
         <View style={styles.body} activeOpacity={0.3}>
           <View style={styles.body2}>
               <View style={styles.logoContainer}>
                  <FontAwesome name="car" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Travail</Text>
               </View>
           </View>
                <TextInput style={styles.input} placeholder='adresse travail'></TextInput>
         </View>

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
      </View>

       
           

        </SafeAreaView>

    </LinearGradient>

);
}

const styles = StyleSheet.create({


linearGradient: {
    flex: 1,
    paddingTop: '20%',
},

container: {
  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  
 
},

closeIcon: {
  width: '90%',
},

titleTop:{
  paddingTop: '5%',
  fontSize: 30,
  color: "#473E66",
  fontFamily: "OpenSans-Regular",

},

adressesContainer: {
  flex: 1, // Utilisez flex pour une adaptation plus dynamique
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: '10%',
},

body:{
  width: '100%',
  height: '15%',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop : '10%',
  paddingBottom:'6%',


},

body2:{
paddingLeft: '4%',
width: '100%',
height: '50%',
flexDirection: 'row',
alignItems: 'center',
marginBottom: '7%',


},

logoContainer:{
width: '8%',
justifyContent: 'center',
alignItems: 'center',

},

bar12:{
  paddingLeft: '4%',
  
},

startLine:{

},

centerLine: {
    height: 45,
    justifyContent: 'center',
    alignItems: "flex-start",
    backgroundColor: 'transparent',
    borderRadius: 10,

},

input:{
  width: "80%",
  fontSize: 16,
  fontWeight: "800",
  color: "#473E66",

  fontFamily: "OpenSans-Regular",
  borderBottomColor: "#4F4F4F",
  borderBottomWidth: 1,

},

textEmergency: {
    fontWeight: '800',
    fontSize: 20,
    marginRight: '10%',
},

endLine:{

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


  texteModal:{
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
