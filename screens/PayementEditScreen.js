import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import Modal from 'react-native-modal';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PaiementEdit({ navigation }) {
  const handleBack = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expdate, setExpdate] = useState("");
  const [crypto, setCrypto] = useState("");
  
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  return (
    <LinearGradient colors={["#F1C796", "#EBB2B5", "#E0CAC2"]} style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={handleBack}>
            <FontAwesome name="times" size={30} color="#333" />
          </TouchableOpacity>
        </View>


    <View>
        <Text style={styles.titleTop}>Moyen de paiement</Text>
    </View>

        <View style={styles.pay}>
          <Text style={styles.text}>Payer avec</Text>
          <TextInput placeholder="Apple Pay" style={styles.input} />
          <TextInput placeholder="Paypal" style={styles.input} />
        </View>

        <View style={styles.paywith}>
          <Text style={styles.text}>Ajouter un moyen de paiement</Text>
          <TextInput placeholder="Numéro de carte" onChangeText={setCardNumber} value={cardNumber} style={styles.input} />
          <View style={styles.halfinput}>
            <TextInput placeholder="Date d'expiration" onChangeText={setExpdate} value={expdate} style={styles.smallinput} />
            <TextInput placeholder="Crypto" onChangeText={setCrypto} value={crypto} style={styles.smallinput} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible} style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Voulez-vous valider vos modifications ?</Text>
              <View style={styles.modalButtonContainer}>
                <View>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Oui</Text>
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Non</Text>
                </TouchableOpacity>
                </View>
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
    paddingTop: '20%',
    fontFamily: "OpenSans-Regular",
  paddingBottom: '10%',
  },

  titleTop:{
    fontSize: 40,
    color: "#473E66",
    fontFamily: "OpenSans-Regular",
    paddingBottom: '15%',
    fontFamily: 'Ladislav-Bold',
  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  closeIcon: {
    width: '90%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  pay: {
    width: "80%",
    alignItems: "center",
    marginBottom: '15%',  },

  paywith: {
    width: "80%",
    alignItems: "center",
    marginBottom: '15%',
  },
  text: {
    fontSize: 24,
    fontWeight: "Regular",
    color: "#473E66",
    marginBottom: 10,
    fontFamily: 'Ladislav-Bold',
  },
  input: {
    width: "100%",
    marginTop: 10,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#4F4F4F",
    paddingVertical: 5,
  },
  halfinput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  smallinput: {
    width: "48%",
    marginTop: 10,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#4F4F4F",
    paddingVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
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
    color: "#fff",
    fontSize: 18,
    fontFamily: 'Ladislav-Bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    alignItems: "center",
    borderRadius: 20,
    width: '80%', // Définissez une largeur fixe pour la modale
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
    marginBottom: 20, // Augmente l'espace entre le texte et les boutons
    textAlign: "center",
  },


  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Espacement automatique des boutons
    width: '100%', // Utilisation de la largeur totale de la modale pour le conteneur
    marginTop: 10, // Espacement au-dessus des boutons, si nécessaire
  },

  modalButton: {
    backgroundColor: "#F88559",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    
   
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
   
  },
});
