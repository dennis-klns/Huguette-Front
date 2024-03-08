import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from 'react-native-modal'; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState,useEffect, useRef } from "react";
import { UseDispatch, useDispatch } from "react-redux";

export default function ProfileScreen({ navigation }) {

  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handledDontDisconnect = () => {
    toggleModal();
    }

  
  const handleSignIn = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  return (
 
    <LinearGradient
        colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
        style={styles.linearGradient}
    >
        <SafeAreaView style={styles.container}>

        <TouchableOpacity style={styles.bar} activeOpacity={0.3}>
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


        <TouchableOpacity style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="user" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Informations personnelles</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="car" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Adresses préférées</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="money" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Paiement</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bar} activeOpacity={0.3}>
           <View style={styles.bar1}>
               <View style={styles.bar11}>
                  <FontAwesome name="phone" size={25} color="#ffffff" />
               </View>
               <View style={styles.bar12}>
                 <Text style={styles.textEmergency}>Contacts d'urgence</Text>
               </View>
           </View>
           <View style={styles.bar2}>
                <FontAwesome name="arrow-right" size={30} color="#ffffff" />
           </View>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => toggleModal()} style={styles.button} activeOpacity={0.8} >
             <Text style={styles.textButton}>Se déconnecter</Text>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContent}>
                 
                        <View>
                          <TouchableOpacity>
                            <Text>Souhaitez-vous vous déconnecter ?</Text>
                          </TouchableOpacity>

                               <View>
                                  <TouchableOpacity onPress={() => handleLogOut()}>
                                     <Text>Oui</Text>
                                  </TouchableOpacity>
                               </View>
                               <View>
                                  <TouchableOpacity onPress={() => handledDontDisconnect()}>
                                     <Text>non</Text>
                                  </TouchableOpacity>
                               </View>
                        </View>
                    
         </View>

          </Modal>
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
  marginTop: '13%',
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
