import React, { useState,useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export default function SignUpPhotoScreen({ navigation }) {

  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  const user = useSelector((state) => state.user.value)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const formData = new FormData();
  
  const handleMapScreen = () => {
    navigation.navigate('TabNavigator', { screen: 'Map'});

}

const dispatch = useDispatch();
const isFocused = useIsFocused();

const [hasPermission, setHasPermission] = useState(false);
const [type, setType] = useState(CameraType.front);
const [flashMode, setFlashMode] = useState(FlashMode.off);

let cameraRef  = useRef(null);

useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}, []);


// const takePicture = async () => {
//   if (cameraRef.current) {
//     const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
//     const uri = photo?.uri;
//     setPhotoUri(uri);


// const formData = new FormData();

// const file = {
// uri: uri,
// name: 'photo.jpg',
// type: 'image/jpeg',
// };

// formData.append('photoFromFront', file);
// const user = useSelector((state) => state.value)

// //fetch('https://huguette-backend.vercel.app/upload'
// //http://192.168.10.154:3000/upload

// fetch(`https://huguette-backend.vercel.app/upload/${user.token}`, {
//   method: 'POST',
//   body: formData,
// }).then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error('Error uploading photo:', error);
//   });
//   }

//   if (!hasPermission || !isFocused) {
//     return <View />;
//   }
// };

const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

   if (permissionResult.granted === false) {
    alert("Vous avez refusé d'autoriser l'accès à la bibliothèque de photos !");
    return;
  }
  
  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true, 
    quality: 1, 
  });


  console.log(pickerResult); 

  if (pickerResult?.assets[0]?.canceled === true) {
    setPhotoUri(pickerResult.assets[0].uri);
  }
  console.log("test", pickerResult?.assets[0]?.uri); 

  let formData = new FormData();
  formData.append('photoFromLibrairie', {
    uri: pickerResult?.assets[0]?.uri,
    name: 'photo.jpg', 
    type: 'image/jpeg', 
  });


  //https://huguette-backend.vercel.app/uploadLibrairie'
  //http://192.168.10.154:3000/uploadLibrairie


  fetch('https://huguette-backend.vercel.app/uploadLibrairie', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur réseau'); 
    }
    return response.json();
  })
  .then(data => {
    console.log('librairie2:', data);
  })
  .catch((error) => {
    console.error('Error uploading image:', error);
  });

  setIsPhotoUploaded(true);

};


const handleTakePhoto = async () => {
  if (cameraRef.current) {
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
    const uri = photo?.uri;
    setPhotoUri(uri);
  }
};

const handleValidation = () => {
  console.log(user.token);
  if (photoUri) {
    const formData = new FormData();
    formData.append('photoFromFront', {
      uri: photoUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    fetch(`https://huguette-backend.vercel.app/upload/${user.token}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse du backend :', data);
        toggleModal();
      })
      .catch(error => console.error('Erreur lors de la validation de la photo :', error));
  } else {
    console.error('Aucune photo à valider');
  }
};

    return (

      <LinearGradient colors={['#F1C796', '#EBB2B5', '#E0CAC2']} style={styles.linearGradient}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <View style={styles.container}>
            <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>PROFIL PASSAGÈRE</Text>
            <View style={styles.profile}>
              <Text style={styles.text}>Ajouter votre photo de profil</Text>
            </View>
            <View style={styles.photoContainer}>
              <View style={styles.photoContent}>
                <View style={styles.textWrapper}>
                  <TouchableOpacity onPress={toggleModal}>
                    <Text style={styles.text1}>Prendre une photo</Text>
                  </TouchableOpacity>
                  <Modal isVisible={isModalVisible} style={styles.modal}>
                    <View style={styles.modalContent}>
                      {photoUri ? (
                        <View>
                          <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />
                          <TouchableOpacity onPress={handleValidation}>
                            <Text>Validerr</Text>
                          </TouchableOpacity>
                        </View>
                      ) : hasPermission ? (
                        <Camera style={styles.camera} type={type} ref={cameraRef} flashMode={flashMode}>
                          <View style={styles.cameraContent}>
                            <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} style={styles.cameraButton}>
                              <FontAwesome name="rotate-right" size={25} color="#ffffff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleTakePhoto} style={styles.cameraButton}>
                              <FontAwesome name="camera" size={25} color="#ffffff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleModal} style={styles.cameraButton}>
                              <FontAwesome name="times" size={25} color="#ffffff" />
                            </TouchableOpacity>
                          </View>
                        </Camera>
                      ) : (
                        <Text>No access to camera</Text>
                      )}
                    </View>
                  </Modal>
                </View>
                <View style={styles.textWrapper}>
                  <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.text1}>Choisir une photo dans votre librairie</Text>
                  </TouchableOpacity>
                </View>
                {photoUri && (
                  
    <Image source={{ uri: photoUri }} style={styles.imagePreview} />
    
  )}
  {isPhotoUploaded && (
    <Text style={styles.uploadSuccessMessage}>Photo téléchargée !</Text>
  )}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleMapScreen()} style={styles.button2} activeOpacity={0.8}>
                <Text style={styles.textButton}>Passer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMapScreen()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Valider</Text>
              </TouchableOpacity>
            </View>
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

  text: {
    width: "80%",
    fontSize: 16,
    fontWeight: "800",
    color: "#473E66",
    margin: 10,
  },

  photoContainer: {
    width: '80%',
    height: '50%', 
    maxHeight: '65%', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  
  photoContent: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  textWrapper: {
    marginVertical: 25,
  },

  text1:{
    fontSize: 19,
  },

  buttonContainer:{
    marginTop: '15%',
    width: '80%',
    alignItems: 'center',
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

  button2: {
    height: 40,
    paddingTop: 8,
    width: "40%",
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

      camera: {
        width: '100%',
        height: '70%',
      },
      cameraContent: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
      },
      cameraButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },

      imagePreview: {
        width: 200, // Ou une largeur en pourcentage si vous préférez
        height: 200, // Idem pour la hauteur
        marginTop: 20, // Ajustez l'espacement selon vos besoins
      },

      uploadSuccessMessage: {
        color: 'green',
        marginTop: 10,
        fontSize: 16,
      },
      
    });
    

