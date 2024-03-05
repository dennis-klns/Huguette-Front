import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpUserScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const signInClick = () => {
    fetch("http://192.168.10.182:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone, email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ phone: phone, email: email, token: data.token }));
          setEmail("");
          setPhone("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "Map" });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
              />
              <Text style={styles.text2}> ou </Text>
              <TextInput
                placeholder="Phone"
                onChangeText={(value) => setPhone(value)}
                value={phone}
                style={styles.input}
              />
              <View style={styles.trait}></View>
              <TextInput
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                value={password}
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              onPress={signInClick}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
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
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#473E66",
    margin: 40,
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
  },

  text2: {
    width: "80%",
    fontSize: 16,
    fontWeight: "800",
    color: "#473E66",
    paddingTop: 30,
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
  },
});
