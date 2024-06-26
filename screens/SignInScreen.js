import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { login, addHome, addWork, } from "../reducers/user";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';


export default function SignUpUserScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isPasswordResetModalVisible, setIsPasswordResetModalVisible] =
    useState(false);
  const [passwordResetMessage, setPasswordResetMessage] = useState("");

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signInClick = () => {
    fetch("https://huguette-back.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone, email: email, password: password,  }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('DATA', data);
        if (data.result) {
          dispatch(login({ firstname: data.firstname, token: data.token, lastname: data.lastname, picture: data.picture }));
          
          setEmail("");
          setPhone("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "Map" }); 
          // navigation.navigate("SignUpPhoto");  
          // console.log(data);
          if(data.home) {
            dispatch(addHome(data.home));
          }
          if(data.work) {
            dispatch(addWork(data.work));
          }
        } else {
          setErrorMessage("Identifiants manquants ou incorrects");
          setIsErrorModalVisible(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

// console.log('REDUCER', user)
  const handlePressIn = () => {
    setPasswordVisibility(false);
  };

  const handlePressOut = () => {
    setPasswordVisibility(true);
  };

  const handlePasswordResetRequest = () => {
    setIsPasswordResetModalVisible(true);
    setPasswordResetMessage("Voulez-vous changer votre mot de passe ?");
  };

  const handlePasswordResetConfirmation = (confirm) => {
    if (confirm) {
      setPasswordResetMessage(
        "Un mail vous a été envoyé afin de changer votre mot de passe !"
      );
    } else {
      setIsPasswordResetModalVisible(false);
    }
  };


  const handleBack = () => {
    navigation.navigate("Home");
  };

  return (
      <LinearGradient
        colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
        style={styles.linearGradient}>
            <View style={styles.closeIcon}>
         <TouchableOpacity onPress={handleBack}>
           <FontAwesome name="times" size={30} color="#333" />
         </TouchableOpacity>
       </View>
        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',

          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          }}>
          <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}> 

            <View style={styles.container}>

              <Text style={styles.title}>Connexion</Text>

              <View style={styles.profile}>
                <Text style={styles.text}>Votre profil</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Text style={styles.text2}> ou </Text>
                <TextInput
                  placeholder="Phone"
                  onChangeText={(value) => setPhone(value)}
                  value={phone}
                  style={styles.input}
                />
                <View style={styles.trait}></View>
                <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                  secureTextEntry={passwordVisibility}
                  style={styles.input}
                  autoCapitalize="none"/>
                <TouchableOpacity
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}>
                  <FontAwesome
                    name={passwordVisibility ? "eye-slash" : "eye"}
                    size={20}
                    color="#4F4F4F"/>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handlePasswordResetRequest}>
                <Text style={styles.forgotPasswordText}>
                  Mot de passe oublié
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={isPasswordResetModalVisible}
                onBackdropPress={() => setIsPasswordResetModalVisible(false)}>
                <View style={styles.modalContent}>
                  <Text style={styles.resetPasswordMessage}>
                    {passwordResetMessage}
                  </Text>
                  {passwordResetMessage ===
                    "Voulez-vous changer votre mot de passe ?" && (
                    <View style={styles.answerModal}>
                      <Button title="Oui" onPress={() => handlePasswordResetConfirmation(true)}/>
                      <Button title="Non" onPress={() => handlePasswordResetConfirmation(false)}/>
                    </View>
                  )}
                </View>
              </Modal>

            </View>
            
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={signInClick} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleBack} style={styles.button2} activeOpacity={0.8}>
              <Text style={styles.textButton2}>Retour</Text>
            </TouchableOpacity> */}
            <Modal isVisible={isErrorModalVisible} onBackdropPress={() => setIsErrorModalVisible(false)}>
                <View style={styles.modalContent}>
                  <Text style={styles.textModalValider}>{errorMessage}</Text>
                  <Button title="Fermer" onPress={() => setIsErrorModalVisible(false)}/>
                </View>
              </Modal>
              </View>

            </View> 
          </KeyboardAwareScrollView> 
        </View>
      </LinearGradient>
  );
} 

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  closeIcon:{
   paddingLeft: '5%',
   paddingTop: '15%',
  },

  container: {
    width: '100%',
    height:'80%',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: '15%',
  },

  title: {
    width: "80%",
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#473E66",
    paddingTop :'5%',
    fontFamily: "Ladislav-Bold",
  },

  profile: {
    paddingTop: '15%',
    width: "100%",
    alignItems: "center",
    marginBottom: '5',
  },


  text: {
    width: "80%",
    fontSize: 24,
    fontWeight: "800",
    color: "#473E66",
    margin: 10,
    fontFamily: 'Ladislav-Bold',
  },

  text2: {
    width: "80%",
    fontSize: 16,
    fontWeight: "800",
    color: "#473E66",
    paddingTop: 30,
    fontFamily: 'Ladislav-Bold',

  },

  trait: {
    height: 2,
    backgroundColor: "#473E66",
    width: "80%",
    marginTop: 60,
    marginBottom: 20,
  },

  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#4F4F4F",
    fontFamily: 'Ladislav-Bold',
  },

  halfinput: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    fontFamily: 'Ladislav-Bold',
  },

  buttonsContainer: {
    width: '100%',
    height:'20%',
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    height: '40%',
    width: "80%",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: '15%',
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


  button2: {
    height: '40%',
    width: "50%",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: '5%',
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

  textButton2: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
 
  },

  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  textModal: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "OpenSans-Regular",
    fontFamily: 'Ladislav-Bold',
  },

  textModalValider: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontFamily: "OpenSans-Regular",
  },

  answerModal: {
    justifyContent: "space-between",
    width: "40%",
    paddingTop: 20,
    flexDirection: "row",
    fontFamily: 'Ladislav-Bold',
  },

  resetPasswordMessage: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 15,
    color: "#4F4F4F",

    fontFamily: 'Ladislav-Bold',
  },

  passwordContainer: {
    marginTop: 7,
    paddingLeft: 64,
    width: "110%",
    alignItems: "center",
    marginBottom: 80,
    flexDirection: "row",
  },

  forgotPasswordText: {
    color: "#4F4F4F",
    marginTop: 15,
    textDecorationLine: "underline",
    fontFamily: 'Ladislav-Bold',
  },
});
