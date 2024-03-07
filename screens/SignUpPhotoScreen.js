import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  SafeAreaView,
  Button,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal'; 


export default function SignUpPhotoScreen({ navigation }) {
  
    
  const handleMapScreen = () => {
    navigation.navigate('Map');

}

    return (

        <LinearGradient colors={['#F1C796', '#EBB2B5', '#E0CAC2']} style={styles.linearGradient}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
            <View style={styles.container}>

                        <Text style={styles.title}>PROFIL PASSAGÈRE</Text>

                           <View style={styles.profile}>
                              <Text style={styles.text}>Votre profil</Text>
                           </View>

              <TouchableOpacity onPress={() => handleMapScreen()}  style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Conductrice</Text>
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

    input: {
            width: '80%',
            marginTop: 25,
            borderBottomColor: '#4F4F4F', 
            borderBottomWidth: 1,
            fontSize: 16,
            color: '#4F4F4F',
       
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
        color: '#fff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },

    invalidInput: {
        borderColor: 'red',
        borderBottomColor: 'red', 
        borderWidth: 1,
        borderBottomWidth: 1,
      },

      errorText: {
        color: 'red',
        fontSize: 14,
      },

      datePickerContainer: {
        marginTop: 5,
        borderBottomColor: '#4F4F4F',
        borderBottomWidth: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center', 
      },
      
      datePickerButton: {
        width: '100%',
        height: 38,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      },
      
      datePickerButtonText: {
        fontSize: 16,
        color: 'rgba(80, 80, 80, 0.35)',
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
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#4F4F4F',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginTop: 5,
      },

      genderText: {
        fontSize: 16,
      },

      texteModal:{
        marginTop: 10,
        fontSize: 15,
      },

   
});