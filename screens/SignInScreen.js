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
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SignUpUserScreen({ navigation }) {
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
    fetch("https://huguette-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone, email: email, password: password,  }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ firstname: data.firstname, token: data.token, lastname: data.lastname, picture: data.picture }));
          setEmail("");
          setPhone("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "Map" }); 
          console.log('token : ',data.token)
          // navigation.navigate("TabNavigator", { screen: "Map" });
          // navigation.navigate("SignUpPhoto");  
          console.log(data);
          console.log(data.url);
        } else {
          setErrorMessage("Identifiants manquants ou incorrects");
          setIsErrorModalVisible(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
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
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <FontAwesome
                    name={passwordVisibility ? "eye-slash" : "eye"}
                    size={20}
                    color="#4F4F4F"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handlePasswordResetRequest}>
                <Text style={styles.forgotPasswordText}>
                  Mot de passe oublié
                </Text>
              </TouchableOpacity>

              <Modal
                isVisible={isPasswordResetModalVisible}
                onBackdropPress={() => setIsPasswordResetModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.resetPasswordMessage}>
                    {passwordResetMessage}
                  </Text>
                  {passwordResetMessage ===
                    "Voulez-vous changer votre mot de passe ?" && (
                    <View style={styles.answerModal}>
                      <Button
                        title="Oui"
                        onPress={() => handlePasswordResetConfirmation(true)}
                      />
                      <Button
                        title="Non"
                        onPress={() => handlePasswordResetConfirmation(false)}
                      />
                    </View>
                  )}
                </View>
              </Modal>
            </View>

            <TouchableOpacity
              onPress={signInClick}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
            <Modal
              isVisible={isErrorModalVisible}
              onBackdropPress={() => setIsErrorModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.textModalValider}>{errorMessage}</Text>
                <Button
                  title="Fermer"
                  onPress={() => setIsErrorModalVisible(false)}
                />
              </View>
            </Modal>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: "80%",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#473E66",
    margin: 40,
    fontFamily: "OpenSans-Regular",
  },

  profile: {
    width: "100%",
    alignItems: "center",
    marginBottom: 80,
  },

  pay: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },

  paywith: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },

  text: {
    width: "80%",
    fontSize: 16,
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
    paddingTop: 30,
    fontFamily: "OpenSans-Regular",
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
    fontSize: 16,
    color: "#4F4F4F",
    fontFamily: "OpenSans-Regular",
  },

  halfinput: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  smallinput: {
    width: "30%",
    marginTop: 25,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#4F4F4F",
    fontFamily: "OpenSans-Regular",
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
  },

  textButton: {
    color: "#fff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
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
  },

  resetPasswordMessage: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 15,
    color: "#4F4F4F",
    fontFamily: "OpenSans-Regular",
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
    fontFamily: "OpenSans-Regular",
  },
});
