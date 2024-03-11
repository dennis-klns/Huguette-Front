import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SosScreen({ navigation }) {
  const handleValidate = () => {
    navigation.navigate("Arrival");
  };

  const handleBack = () => {
    navigation.navigate("Route");
  };

  const sendSMS = () => {
    
    const phoneNumber = '0624797127';
    const message = "Bonjour, je suis actuellement dans une situation inconfortable, est-ce que vous pouvez m'appeler maintenant merci ! ";
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Impossible d\'ouvrir l\'URL pour l\'envoi de SMS');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Une erreur est survenue', err));
  };

  const makePhoneCall = () => {
    const phoneNumber = '0624797127'; // Remplacer par le numéro de votre contact d'urgence
    const url = `tel:${phoneNumber}`;

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
