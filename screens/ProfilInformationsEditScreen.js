import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Modal from 'react-native-modal'; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import {useDispatch,useSelector } from "react-redux";
import {logoutTrip} from '../reducers/trip';
import {logout} from '../reducers/user';




export default function ProfilInformations({ navigation }) {

  const user = useSelector((state) => state.user.value);
  const profilePicture = useSelector((state) => state.user.value);

  // console.log("user Pic", user.picture);
  // console.log("user name", user);
  console.log("user Pic", profilePicture.picture);
  console.log("user name", profilePicture);

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

        <View style={styles.profilContainer} activeOpacity={0.3}>

            <View style={styles.profile}>
              <View>
                <Text style={styles.titleTop}>Profil</Text>
              </View>
              <View>
              <Image source={{ uri: profilePicture.picture }} style={{ width: 200, height: 200, borderRadius: 100, }} />
                 </View>
              
              <View style={styles.textContainer}>
                 <View style={styles.titleContainer}>
                     <Text style={styles.title}>Modifiez votre informations</Text>
                 </View>
                    <TextInput style={styles.text2} placeholder={user.firstname}/>
                    <TextInput style={styles.text2} placeholder={user.lastname}/>
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
  fontSize: 30,
  color: "#473E66",
  fontFamily: "OpenSans-Regular",
  paddingBottom: '15%',
},

profilContainer:{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop : '10%',
  paddingBottom:'6%',

 
},

buttonContainer:{
  marginTop: '13%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',

  
},

profile: {
  width: "100%",
  justifyContent: 'center',
  alignItems: "center",
 
  
},

textContainer:{
  width: '80%',
  justifyContent: 'center',
  fontFamily: "OpenSans-Regular",
  
},

titleContainer:{
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: "OpenSans-Regular",
  paddingBottom: '10%',
 
},

title:{
fontSize: 20,
color: "#473E66",
fontFamily: "OpenSans-Regular",
},

text: {
  width: "80%",
  fontSize: 30,
  fontWeight: "800",
  color: "#473E66",
  margin: 10,
  fontFamily: "OpenSans-Regular",
  
},

text2: {
  width: "80%",
  fontSize: 16,
  fontWeight: "800",
  color: "#473E66",
  margin: 10,
  fontFamily: "OpenSans-Regular",
  borderBottomColor: "#4F4F4F",
  borderBottomWidth: 1,
},

input: {
  height: '10%',
  width: "80%",
  marginTop: 25,
  borderBottomColor: "#4F4F4F",
  borderBottomWidth: 1,
  fontSize: 25,
  color: "#4F4F4F",
},

textButton: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
  
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
