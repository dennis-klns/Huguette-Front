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
import {addPicture, removePicture} from '../reducers/user'
import ImageResizer from 'react-native-image-resizer';

export default function SignUpPhotoScreen({ navigation }) {

  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  const user = useSelector((state) => state.user.value)
  const profilePicture = useSelector((state) => state.user.value);

  const toggleModal = () => {
    if (!isModalVisible) { // Si on est sur le point d'ouvrir la modale
      setPhotoUri(null); // On réinitialise l'URI de la photo pour cacher l'aperçu précédent
    }
    setModalVisible(!isModalVisible);
  };
  
  const formData = new FormData();
  
  const handleMapScreen = () => {
    navigation.navigate('TabNavigator', { screen: 'Map'});

}

const [isAlertModalVisible, setAlertModalVisible] = useState(false);
const handleMapScreenWithPhoto = () => {
  if (photoUri) { // Si une photo a été sélectionnée
    navigation.navigate('TabNavigator', { screen: 'Map'});
  } else { // Si aucune photo n'a été sélectionnée
    setAlertModalVisible(true); // Afficher le modal d'alerte
  }
};

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
    
    fetch(`https://huguette-back.vercel.app/upload/${user.token}`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Réponse du backend :', data);
      dispatch(addPicture(data.url));
      toggleModal();
    })
    .catch(error => console.error('Erreur lors de la validation de la photo :', error));
  } else {
    console.error('Aucune photo à valider');
  }
};

const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

   if (permissionResult.granted === false) {
    alert("Vous avez refusé d'autoriser l'accès à la bibliothèque de photos !");
    return;
  }
  
  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, // Permet l'édition de l'image
    aspect: [4, 3], // Aspect ratio de l'image éditée
    quality: 0.5, // Compression de l'image (0.5 = 50% de la qualité originale)
  });



  console.log(pickerResult); 

  if (!pickerResult.assets[0].canceled) {
    
    const uri = (pickerResult.assets[0].uri);
    setPhotoUri(pickerResult.uri)
  }
  console.log("test", pickerResult?.assets[0]?.uri); 

  let formData = new FormData();
  formData.append('token', user.token); 
  formData.append('photoFromLibrairie', {
    uri: pickerResult.assets[0].uri,
    name: 'photo.jpg', 
    type: 'image/jpeg', 
  });


  //https://huguette-backend.vercel.app/uploadLibrairie'
  //http://192.168.10.154:3000/uploadLibrairie


  fetch('https://huguette-back.vercel.app/uploadLibrairie', {
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
    dispatch(addPicture(data.url));
    setPhotoUri(data.url)
  })
  .catch((error) => {
    console.error('Error uploading image:', error);
  });

  if (!pickerResult.cancelled) {
    setPhotoUri(pickerResult.uri);
    setIsPhotoUploaded(true);
  }

};


const handleSkip = async () => {
  // Vérifiez d'abord s'il y a une photoUri à ignorer
  if (photoUri) {
      try {
          // Appel à la route de suppression
          const response = await fetch(`https://huguette-back.vercel.app/deletePhoto/${user.token}`, {
              method: 'DELETE',
          });
          const data = await response.json();
          if (data.result) {
              console.log(data.message);
              // Réinitialisez photoUri à null si la suppression est réussie
              setPhotoUri(null);
              dispatch(removePicture());
          } else {
              console.error(data.message);
          }
      } catch (error) {
          console.error('Erreur lors de la suppression de la photo :', error);
      }
  }
  // Naviguez à l'écran suivant après la suppression ou s'il n'y avait pas de photo
  navigation.navigate('TabNavigator', { screen: 'Map' });
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
                        <View >
                          <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />
                          <View style={styles.modalButtonContainer}>
                             <TouchableOpacity onPress={handleValidation} style={styles.modalButton}>
                               <Text style={styles.textModal}>Valider</Text>
                             </TouchableOpacity>
                             <TouchableOpacity  onPress={() => setModalVisible(false)} style={styles.modalButton}>
                               <Text style={styles.textModal}>Annuler</Text>
                             </TouchableOpacity>
                          </View>
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
                  
    // <Image source={{ uri: photoUri }} style={styles.imagePreview} />
    <Image source={profilePicture.picture ? { uri: profilePicture.picture } : require('../assets/profilpicturephoto.png')}
                                 style={{ width: 200, height: 200, borderRadius: 100 }} />
    
  )}
  {isPhotoUploaded && (
    <Text style={styles.uploadSuccessMessage}>Photo téléchargée !</Text>
  )}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleSkip()} style={styles.button2} activeOpacity={0.8}>
                <Text style={styles.textButton}>Passer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMapScreenWithPhoto()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Valider</Text>
              </TouchableOpacity>
                  <Modal isVisible={isAlertModalVisible} style={styles.modal}>
                       <View style={styles.modalContent}>
                            <Text style={styles.alertModalText}>Veuillez ajouter une photo</Text>
                            <TouchableOpacity onPress={() => setAlertModalVisible(false)} style={styles.modalButton}>
                            <Text style={styles.textModal}>OK</Text>
                            </TouchableOpacity>
                       </View>
                 </Modal>
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

  text: {
    width: "80%",
    fontSize: 24,
    fontWeight: "800",
    color: "#473E66",
    paddingTop :'15%',
    fontFamily: 'Ladislav-Bold',
  },
  
  photoContainer: {
    width: '80%',
    height: '50%', 
    maxHeight: '65%', 
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: "#4F4F4F",
    borderTopWidth: 1,
    paddingTop: '5%',
    // borderWidth: 2,
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
    fontFamily: 'Ladislav-Bold',
  },

  buttonContainer:{
    marginTop: '15%',
    width: '80%',
    alignItems: 'center',
  },


  button: {
    height: 40,
    width: "80%",
    alignItems: "center",
    justifyContent: 'center',
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
    width: "40%",
    alignItems: "center",
    justifyContent :'center',
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
      
    
      textModal2: {
        color: 'white',
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

      modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
      },
      
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: "rgba(0, 0, 0, 0.1)",
        maxHeight: '85%', // Ajuste selon le besoin pour plus de contenu
        width: '68%',
      },
      
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        
        marginTop: 10, // Ajuste pour plus d'espacement
        width: '80%', // Assure que les boutons utilisent tout l'espace disponible
      },
      
      modalButton: {
        backgroundColor: "#F88559",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center', // Centre le texte à l'intérieur du bouton
        alignItems: 'center', // Assure que le contenu est centré horizontalement
        width: '40%', // Ajuste la largeur des boutons selon le besoin
      },
      
      textModal: {
        color: 'white',
        textAlign: 'center', // Assure que le texte est bien centré dans le bouton
        fontWeight: '600',
        fontSize: 10,
      },
      
      // Style pour l'aperçu de l'image et le bouton "Valider"
      imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 20, // Adoucit les coins de l'aperçu de l'image
        marginTop: 20,
      },
      
      // Utilise les styles existants pour le bouton "Valider"
      validationButton: {
        marginTop: 20,
        backgroundColor: "#F88559",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      
      validationButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center", // Centre le texte dans le bouton
      },


    });
    


