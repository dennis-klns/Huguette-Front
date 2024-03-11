import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from 'react-native-modal'; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useDispatch,useSelector } from "react-redux";
import {logoutTrip} from '../reducers/trip';
import {logout} from '../reducers/user';



export default function ContactEdit({ navigation }) {

  const [emergencyFirstname, setEmergencyFirstname] = useState("");
  const [emergencyLastname, setEmergencyLastname] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const user = useSelector((state) => state.user.value);
  const userToken = useSelector((state) => state.user.value.token); 

  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const handleBack = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const updateEmergencyContact = () => {

    const url = "https://huguette-backend.vercel.app/users/emergencyContact"; 

    const body = {
      emergencyFirstname,
      emergencyLastname,
      emergencyPhone,
      emergencyMessage,
      token: user.token,
    };
    console.log(body);

    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
      setShowConfirmation(true); 
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour:', error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour.");
    });
  };

  useEffect(() => {
    fetch(`https://huguette-backend.vercel.app/users/emergencyInfos/${userToken}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setEmergencyFirstname(data.emergencyInfos.firstname || "");
          setEmergencyLastname(data.emergencyInfos.lastname || "");
          setEmergencyPhone(data.emergencyInfos.phone || "");
          setEmergencyMessage(data.emergencyInfos.emergencyMessage || "");
        }
      })
      .catch(error => console.log(error));
  }, [userToken]);

  
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

       <View style={styles.body}>
              <View>
                <Text style={styles.titleTop}>Contact d'urgence</Text>
              </View>
           <View style={styles.textContainer}>
                 <View style={styles.titleContainer}>
                     <Text style={styles.title}>Modifier votre contact d'urgence</Text>
                </View>
                <View>
                <TextInput
          style={styles.text2}
          placeholder='Prénom'
          value={emergencyFirstname}
          onChangeText={text => setEmergencyFirstname(text)}
        />
                    <TextInput style={styles.text2} placeholder='Nom' value={emergencyLastname} 
    onChangeText={text => setEmergencyLastname(text)}/>
                    <TextInput style={styles.text2} placeholder='Phone' value={emergencyPhone} 
    onChangeText={text => setEmergencyPhone(text)}/>
                    <View style={styles.messageInputContainer}>

                 <View style={styles.titleContainer}>
                     <Text style={styles.title}>Modifier votre message d'urgence</Text>
                </View>
                <TextInput
          style={styles.messageInput}
          placeholder="Message personnalisé"
          multiline={true}
          numberOfLines={4}
          value={emergencyMessage}
          onChangeText={text => setEmergencyMessage(text)}
        />

    value={emergencyMessage} // Lie l'état emergencyMessage à ce TextInput
    onChangeText={text => setEmergencyMessage(text)} />
                    </View>
                </View>
                    <View style={styles.buttonContainer}>
                         <TouchableOpacity onPress={() => toggleModal()} style={styles.button} activeOpacity={0.8} >
                           <Text style={styles.textButton}>Valider</Text>
                        </TouchableOpacity>
                        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContent}>
            {
              // Condition pour afficher soit le message de confirmation soit la question de validation
              showConfirmation ? (
                <>
                  <Text style={styles.modalText}>Modification enregistrée</Text>
                  <TouchableOpacity onPress={() => {setModalVisible(false); setShowConfirmation(false);}} style={styles.modalButton}>
                    <Text style={styles.textModal}>Fermer</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.modalText}>Voulez-vous valider vos modifications ?</Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity onPress={updateEmergencyContact} style={styles.modalButton}>
                      <Text style={styles.textModal}>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                      <Text style={styles.textModal}>Non</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )
            }
          </View>
        </Modal>
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

titleTop:{
  fontSize: 30,
  color: "#473E66",
  fontFamily: "OpenSans-Regular",
  paddingBottom: '15%',
},

text2:{
  width: "80%",
  fontSize: 16,
  fontWeight: "800",
  color: "#473E66",
  margin: 10,
  fontFamily: "OpenSans-Regular",
  borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
},

messageInputContainer:{
alignItems: 'center',
paddingTop: '7%',

},


messageInput: {
 
  height: '55%',
  width: "90%",
  fontSize: 16,
  color: "#473E66",
  margin: 10,
  padding: 10,
  backgroundColor: "#FFF", // Vous pouvez ajuster cette couleur comme vous le souhaitez
  borderRadius: 10,
  fontFamily: "OpenSans-Regular",
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderWidth: 1,
},

closeIcon: {
  width: '90%',
},


textContainer:{
  width: '80%',
  justifyContent: 'center',
  fontFamily: "OpenSans-Regular",
height : '80%',
paddingTop: '10%',
  
},

titleContainer:{
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: "OpenSans-Regular",
  paddingBottom: '10%',
  
 
},

title:{
fontSize: 20,
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

body: {
  width: "100%",
  justifyContent: 'center',
  alignItems: "center",
},

textButton: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
  
},

buttonContainer:{
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',

  
},


button: {
  height: 50,
  width: "60%",
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

