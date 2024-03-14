import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const handleSignUp = () => {
    navigation.navigate("SignUp");
    // navigation.navigate("SignUpPhoto");
    //navigation.navigate("SignUp")
    //navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",

        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Image
        source={require("../assets/huguette.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.textgroup}>
        <Text style={styles.title}>Huguette</Text>
        <Text style={styles.slogan}>Get Safe</Text>
      </View>

      <View style={styles.buttonsgroup}>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSignIn()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "120%",
    width: "100%",
    position: "absolute",
  },

  title: {
    width: "80%",
    fontSize: 80,
    fontFamily: "Ladislav-Bold",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },

  slogan: {
    width: "80%",
    fontSize: 38,
    fontFamily: "Ladislav-Inline",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },

  textgroup: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "4%",
  },

  buttonsgroup: {
    width: "80%",
    alignItems: "center",
    marginBottom: "8%",
    flex: 1,
    justifyContent: "flex-end",
  },

  button: {
    height: "12%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white",
    opacity: 0.5,
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
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
});
