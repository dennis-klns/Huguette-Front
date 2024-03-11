import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View, Linking, Alert, } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function SosScreen({ navigation }) {

  const [emergencyContact, setEmergencyContact] = useState({phone: '', message: ''});

  const userToken = useSelector((state) => state.user.value.token);

  const handleValidate = () => {
    navigation.navigate("Arrival");
  };

  const handleBack = () => {
    navigation.navigate("Route");
  };

  useEffect(() => {
    const fetchEmergencyContact = async () => {
      try {
        // Assurez-vous que l'adresse de votre serveur et le port sont corrects
        console.log(userToken)
        const response = await fetch(`https://huguette-backend.vercel.app/users/emergencyInfos/${userToken}`);

        const data = await response.json();
        console.log(data);
            setEmergencyContact({
              phone: data.emergencyInfos.phone,
              message: data.emergencyInfos.emergencyMessage,
            });
      } catch (error) {
        console.error('Erreur lors de la récupération du contact d\'urgence:', error);
        Alert.alert("Erreur", error.toString());
      }
    };
  
    fetchEmergencyContact();
  }, [userToken]);

  //       const data = await response.json();

  //       if (response.ok) {
  //         setEmergencyContact({
  //           phone: data.emergencyInfos.phone,
  //           message: data.emergencyInfos.emergencyMessage,
  //         });
  //       } else {
  //         throw new Error(data.error || "Une erreur est survenue");
  //       }
  //     } catch (error) {
  //       Alert.alert("Erreur", error.toString());
  //     }
  //   };

  //   fetchEmergencyContact();
  // }, [userToken]); 

  const sendSMS = () => {
    const url = `sms:${emergencyContact.phone}?body=${encodeURIComponent(emergencyContact.message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          throw new Error('Impossible d\'ouvrir l\'URL pour l\'envoi de SMS');
        }
      })
      .catch((err) => Alert.alert("Erreur", err.toString()));
  };

   const makePhoneCall = () => {
    // Utilisez l'état emergencyPhone pour passer l'appel
    const url = `tel:${emergencyContact.phone}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Impossible de lancer un appel');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Une erreur est survenue', err));
  };



  return (
    <LinearGradient
    colors={['#F1C796', '#EBB2B5', '#E0CAC2']}
    style={styles.linearGradient}
  >
       
    <View style={styles.closeIcon} >
          <TouchableOpacity onPress={() => handleBack()}>
             <FontAwesome name="times" size={30} color="#333" />
          </TouchableOpacity>
       </View>
    <View style={styles.container}>
      <TouchableOpacity style={styles.emergency} activeOpacity={0.8} onPress={sendSMS}>
        <Text style={styles.textEmergency}>Contact en cours</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.emergency} activeOpacity={0.8} onPress={makePhoneCall}>
        <Text style={styles.textEmergency}>Contact d'urgence</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        // onPress={() => handleValidate()}
      >
        <Text style={styles.textButton}>Signaler</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  closeIcon: {
    marginTop: '20%',
    marginLeft: '10%',
    width: '90%',
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: '30%',
  },

  emergency: {
    height: 45,
    justifyContent: "center",
    paddingTop: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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

  textEmergency: {
    fontWeight: "800",
    fontSize: 16,
  },

  button: {
    height: 40,
    paddingTop: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#F88559",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "30%",
  },

  textButton: {
    color: "#fff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
