import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SignUpUserScreen({ navigation }) {
  const dispatch = useDispatch();
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [isLastnameValid, setIsLastnameValid] = useState(true);
  const [isFirstnameValid, setIsFirstnameValid] = useState(true);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  //   const [birthdate, setBirthdate] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [gender, setGender] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expdate, setExpdate] = useState("");
  const [crypto, setCrypto] = useState("");

  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");

  const validatePasswordsMatch = () => {
    return password === confirmPassword;
  };

  const signUpClick = () => {
    if (
      !lastname ||
      !firstname ||
      !email ||
      !phone ||
      !date ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      setInfoModalMessage(
        "Veuillez remplir tous les champs requis pour continuer."
      );
      setIsInfoModalVisible(true);
      return;
    }

      if (password.length < 5) {
        setInfoModalMessage('Le mot de passe doit contenir au moins 5 caractères.');
        setIsInfoModalVisible(true);
        return;
      }

    if (!validatePasswordsMatch()) {
      setInfoModalMessage("Les mots de passe saisis ne correspondent pas.");
      setIsInfoModalVisible(true);
      return;
    }

    const formattedBirthdate = date.toISOString().split("T")[0];

    fetch("https://huguette-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastname,
        firstname,
        email,
        phone,
        birthdate: formattedBirthdate,
        gender,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ phone, token: data.token,firstname, lastname })); 
          navigation.navigate("SignUpPhoto");
        } else {
          console.error("Signup failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const validateEmail = (value) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(value);
    setEmailValid(value === "" || emailRegex.test(value));
  };

  const validateName = (value, setName, setIsValid) => {
    const nameRegex = /^[A-Za-z\u00C0-\u00FF]+$/;
    setName(value);
    setIsValid(nameRegex.test(value) || value === "");
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    setPhone(value);
    setIsPhoneValid(value === "" || phoneRegex.test(value));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const openPickerModal = () => {
    setIsPickerVisible(true);
  };

  const onPickerSelect = (itemValue) => {
    setGender(itemValue);
    setIsPickerVisible(false);
  };

  const handleBack = () => {
    navigation.navigate("SignUp");
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
            <Text style={styles.title}>PROFIL PASSAGÈRE</Text>

            <View style={styles.profile}>
              <Text style={styles.text}>Votre profil</Text>
              <TextInput
                placeholder="Nom de famille"
                onChangeText={(value) =>
                  validateName(value, setLastname, setIsLastnameValid)
                }
                value={lastname}
                style={[
                  styles.input,
                  !isLastnameValid && styles.invalidInput,
                  !isLastnameValid && { borderBottomColor: "red" },
                ]}
              />
              <TextInput
                placeholder="Prénom"
                onChangeText={(value) =>
                  validateName(value, setFirstname, setIsFirstnameValid)
                }
                value={firstname}
                style={[
                  styles.input,
                  !isFirstnameValid && styles.invalidInput,
                  !isFirstnameValid && { borderBottomColor: "red" },
                ]}
              />

              <TextInput
                placeholder="Email"
                onChangeText={validateEmail}
                value={email}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {!emailValid && (
                <Text style={styles.errorText}>Entrer un email valide</Text>
              )}
              <TextInput
                placeholder="Numéro de téléphone"
                onChangeText={validatePhone}
                value={phone}
                style={[
                  styles.input,
                  phone && !isPhoneValid ? styles.invalidInput : null,
                ]}
                keyboardType="phone-pad"
              />
              {phone && !isPhoneValid && (
                <Text style={styles.errorText}>
                  Le numéro doit contenir 10 chiffres
                </Text>
              )}

              <View style={styles.datePickerContainer}>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.datePickerButton}
                >
                  <Text style={styles.datePickerButtonText}>
                    Choisir une date de naissance
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    style={styles.calendrier}
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()}
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.genderInput}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={[
                    styles.genderText,
                    { color: gender ? "#4F4F4F" : "rgba(80, 80, 80, 0.35)" },
                  ]}
                >
                  {gender || "Sélectionner le genre"}
                </Text>
              </TouchableOpacity>
              <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  <Picker
                    selectedValue={gender}
                    style={{ width: "100%", height: 200 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setGender(itemValue);
                      setModalVisible(false);
                    }}
                  >
                    <Picker.Item
                      label="Sélectionner le genre"
                      value="Sélectionner le genre"
                    />
                    <Picker.Item label="Homme" value="Homme" />
                    <Picker.Item label="Femme" value="Femme" />
                  </Picker>
                </View>
              </Modal>

              <TextInput
                placeholder="Mot de passe"
                onChangeText={(value) => setPassword(value)}
                value={password}
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry={true}
                textContentType="oneTimeCode"
              />
              <TextInput
                placeholder="Confirmer le mot de passe"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.pay}>
              <Text style={styles.text}>Payer avec</Text>
              <TextInput placeholder="Apple Pay" style={styles.input} />
              <TextInput placeholder="Paypal" style={styles.input} />
            </View>

            <View style={styles.paywith}>
              <Text style={styles.text}>Ajouter un moyen de paiement</Text>
              <TextInput
                placeholder="Numéro de carte"
                onChangeText={(value) => setCardNumber(value)}
                value={cardNumber}
                style={styles.input}
              />

              <View style={styles.halfinput}>
                <TextInput
                  placeholder="Date d'expiration"
                  onChangeText={(value) => setExpdate(value)}
                  value={expdate}
                  style={styles.smallinput}
                />
                <TextInput
                  placeholder="Crypto"
                  onChangeText={(value) => setCrypto(value)}
                  value={crypto}
                  style={styles.smallinput}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={signUpClick}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>

            <Modal
              isVisible={isInfoModalVisible}
              onBackdropPress={() => setIsInfoModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.texteModal}>{infoModalMessage}</Text>
                <Button
                  title="Fermer"
                  onPress={() => setIsInfoModalVisible(false)}
                />
              </View>
            </Modal>
            <TouchableOpacity onPress={handleBack} style={styles.button2} activeOpacity={0.8}>
              <Text style={styles.textButton2}>Retour</Text>
            </TouchableOpacity>
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
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#473E66",
    paddingTop :'15%',
    fontFamily: "Ladislav-Bold",
  },

  profile: {
    width: "100%",
    alignItems: "center",
    marginBottom: '10%',
  },

  paywith: {
    width: "100%",
    alignItems: "center",
    marginBottom: '20%',
   
  },

  pay: {
    width: "100%",
    alignItems: "center",
   
    
  },


  text: {
    width: "80%",
    fontSize: 24,
    fontWeight: "800",
    color: "#473E66",
    paddingTop :'15%',
    fontFamily: 'Ladislav-Bold',
  },

  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
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

  smallinput: {
    width: "30%",
    marginTop: 25,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#4F4F4F",
  },

  button: {
    height: 45,
    width: "80%",
    alignItems: "center",
    justifyContent :'center',
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
    height: '3%',
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
    marginBottom: '10%',
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

  textButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  invalidInput: {
    borderColor: "red",
    borderBottomColor: "red",
    borderWidth: 1,
    borderBottomWidth: 1,
  },

  errorText: {
    color: "red",
    fontSize: 14,
  },

  datePickerContainer: {
    marginTop: 5,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  datePickerButton: {
    width: "100%",
    height: 38,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  datePickerButtonText: {
    fontSize: 16,
    color: "rgba(80, 80, 80, 0.35)",
  },

  calendrier: {
    paddingBottom: 10,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  genderInput: {
    height: 40,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#4F4F4F",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginTop: 5,
  },

  genderText: {
    fontSize: 16,
  },

  texteModal: {
    marginTop: 10,
    fontSize: 15,
  },
});
