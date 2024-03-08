import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Modal from 'react-native-modal'; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import {useDispatch,useSelector } from "react-redux";
import {logoutTrip} from '../reducers/trip';
import {logout} from '../reducers/user';



export default function ProfilInformations({ navigation }) {

  const handleBack = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  
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

        <View style={styles.profilContainer} activeOpacity={0.3}>

            <View style={styles.profile}>
              <View>
                <Text style={styles.text}>Modifier votre profil</Text>
              </View>
              <View>
              <Text style={styles.text}>photo ici</Text>

              </View>
              <View>
                  <TextInput placeholder="Lastname"/>
                  <TextInput placeholder="Firstname"/>
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

closeIcon: {
  width: '90%',
},


profilContainer:{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop : '10%',
  paddingBottom:'6%',
  borderWidth: 2,
 
},


profile: {
  width: "100%",
  justifyContent: 'center',
  alignItems: "center",
  borderWidth: 2,
  
},

text: {
  width: "80%",
  fontSize: 16,
  fontWeight: "800",
  color: "#473E66",
  margin: 10,
},

input: {
  height: '10%',
  width: "80%",
  marginTop: 25,
  borderBottomColor: "#4F4F4F",
  borderBottomWidth: 1,
  fontSize: 25,
  color: "#4F4F4F",
},

});
