import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import Modal from 'react-native-modal'; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import {useDispatch,useSelector } from "react-redux";
import {logoutTrip} from '../reducers/trip';
import {logout} from '../reducers/user';

export default function WaitingFilesScreen({ navigation }) {

  const handleSignUp = () => {
    navigation.navigate("");
  };



  return (
 
    <LinearGradient
        colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
        style={styles.linearGradient}
    >
        <SafeAreaView style={styles.container}>

            <View>
               <Text style={styles.titleTop}>Nous examinons votre dossier</Text>
            </View>
     

        <View style={styles.buttonContainer}>
          <TouchableOpacity /*onPress={() => handleSignUp()}*/ style={styles.button} activeOpacity={0.8} >
             <Text style={styles.textButton}>Suivant</Text>
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

titleTop:{
  paddingTop: '5%',
  fontSize: 30,
  color: "#473E66",
  fontFamily: "OpenSans-Regular",
  paddingBottom: '20%',

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
  paddingRight: '6%',
},

bar11:{
width: '8%',
justifyContent: 'center',
alignItems: 'center',
},

bar12:{
  paddingLeft: '4%',
},

isaccompanied: {
  marginRight: "20%",
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
  marginTop: '75%',
  width: '60%',
  alignItems: 'center',
},

button: {
  
  height: 40,
  // paddingTop: 8,
  width: "60%",
  alignItems: "center",
  justifyContent: 'center',
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
      // height: 30,
      fontWeight: '600',
      fontSize: 16,
      
  },


  texteModal:{
    marginTop: 10,
    fontSize: 15,
  },
  
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },


  modalContent: {
    height: '70%',
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
 
  },


});
