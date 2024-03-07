import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProfileScreen({ navigation }) {

  
  const handleSignIn = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const handleLogIn = () => {
    navigation.navigate("Home");
  };

  return (
 
    <LinearGradient
        colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
        style={styles.linearGradient}
    >
        <SafeAreaView style={styles.container}>

        <TouchableOpacity
  style={styles.bar}
  
  activeOpacity={0.3}
>
  <View style={styles.bar1}>
    <View style={styles.bar11}>
      <FontAwesome name="bolt" size={25} color="#ffffff" />
    </View>
    <View style={styles.bar12}>
      <Text style={styles.textEmergency}>Conductrice/ Cliente</Text>
    </View>
  </View>
  <View style={styles.bar2}>
    <FontAwesome name="arrow-right" size={30} color="#ffffff" />
  </View>
</TouchableOpacity>

          <TouchableOpacity style={styles.bar}>
              <View style={styles.bar1}>
                <View style={styles.bar11}>
                   <FontAwesome name="user" size={25} color="#ffffff"  />
                </View>
                <View style={styles.bar12}>
                      <TouchableOpacity style={styles.centerLine} activeOpacity={0.8}>
                          <Text style={styles.textEmergency }>Informations personnelles</Text>
                      </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bar2}>
                   <FontAwesome name="arrow-right" size={30} color="#ffffff"  />
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bar}>
              <View style={styles.bar1}>
                <View style={styles.bar11}>
                   <FontAwesome name="car" size={25} color="#ffffff"  />
                </View>
                <View style={styles.bar12}>
                      <TouchableOpacity style={styles.centerLine} activeOpacity={0.8}>
                          <Text style={styles.textEmergency }>Adresses préférées</Text>
                      </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bar2}>
                   <FontAwesome name="arrow-right" size={30} color="#ffffff"  />
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bar}>
              <View style={styles.bar1}>
                <View style={styles.bar11}>
                   <FontAwesome name="money" size={25} color="#ffffff"  />
                </View>
                <View style={styles.bar12}>
                      <TouchableOpacity style={styles.centerLine} activeOpacity={0.8}>
                          <Text style={styles.textEmergency }>Paiement</Text>
                      </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bar2}>
                   <FontAwesome name="arrow-right" size={30} color="#ffffff"  />
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bar}>
              <View style={styles.bar1}>
                <View style={styles.bar11}>
                   <FontAwesome name="phone" size={25} color="#ffffff"  />
                </View>
                <View style={styles.bar12}>
                      <TouchableOpacity style={styles.centerLine} activeOpacity={0.8}>
                          <Text style={styles.textEmergency }>Contacts d'urgence</Text>
                      </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bar2}>
                   <FontAwesome name="arrow-right" size={30} color="#ffffff"  />
              </View>
          </TouchableOpacity>

        

          <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={() => handleLogIn()}
          style={styles.button} activeOpacity={0.8} >
          <Text style={styles.textButton}>Se déconnecter</Text>
        </TouchableOpacity>
        </View>

           

        </SafeAreaView>

    </LinearGradient>

);
}

const styles = StyleSheet.create({


linearGradient: {
    flex: 1,
    paddingTop: '30%',
},

container: {
  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
 
},

bar:{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom:'6%',
 
},

bar1:{
paddingLeft: '4%',
width: '85%',
flexDirection: 'row',
alignItems: 'center',
},

bar2:{
  paddingRight: '5%',
},

bar11:{
width: '8%',
justifyContent: 'center',
alignItems: 'center',
},

bar12:{
  paddingLeft: '4%',
},

startLine:{

},

centerLine: {
    height: 45,
    justifyContent: 'center',
    alignItems: "flex-start",
    backgroundColor: 'transparent',
    borderRadius: 10,

},


textEmergency: {
    fontWeight: '800',
    fontSize: 20,
    marginRight: '10%',
},

endLine:{

},

buttonContainer:{
  marginTop: '10%',
  width: '60%',
  alignItems: 'center',
},

button: {
  
  height: 40,
  paddingTop: 8,
  width: "60%",
  alignItems: "center",
  marginTop: 20,
  backgroundColor: "#EAAC8B",
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
      color: '#fff',
      height: 30,
      fontWeight: '600',
      fontSize: 16,
      
  },



});
