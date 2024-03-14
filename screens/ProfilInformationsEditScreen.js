import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addPicture } from "../reducers/user";

export default function ProfilInformations({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const profilePicture = useSelector((state) => state.user.value);

  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);

  const [isModalVisible3, setModalVisible3] = useState(false);
  const [CameraVisible, setCameraVisible] = useState(false);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);

  const togglePhotoModal = () => {
    setPhotoModalVisible(!isPhotoModalVisible);
  };

  const toggleModal = () => {
    setModalVisible3(!isModalVisible3);
  };

  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const openCamera = () => {
    setIsCameraVisible(true); // Affiche le composant Camera
    setPhotoModalVisible(false); // Ferme la modal actuelle
  };

  // console.log("user Pic", user.picture);
  // console.log("user name", user);
  console.log("user Pic", profilePicture.picture);
  console.log("user name", profilePicture);

  const handleBack = () => {
    navigation.navigate("TabNavigator", { screen: "Profile" });
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModalValider = () => {
    setModalVisible(!isModalVisible);
  };

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(
        "Vous avez refusé d'autoriser l'accès à la bibliothèque de photos !"
      );
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
    formData.append("token", user.token);
    formData.append("photoFromLibrairie", {
      uri: pickerResult?.assets[0]?.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    //https://huguette-backend.vercel.app/uploadLibrairie'
    //http://192.168.10.154:3000/uploadLibrairie

    fetch("https://huguette-backend.vercel.app/uploadLibrairie", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }
        return response.json();
      })
      .then((data) => {
        console.log("librairie2:", data);
        dispatch(addPicture(data.url));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
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
      formData.append("photoFromFront", {
        uri: photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      fetch(`https://huguette-backend.vercel.app/upload/${user.token}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Réponse du backend :", data);
          dispatch(addPicture(data.url));
          setIsCameraVisible(false);
          // toggleModal();
        })
        .catch((error) =>
          console.error("Erreur lors de la validation de la photo :", error)
        );
    } else {
      console.error("Aucune photo à valider");
    }
  };

  return (
    <LinearGradient
      colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={() => handleBack()}>
            <FontAwesome name="times" size={30} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.profilContainer} activeOpacity={0.3}>
          <View style={styles.profile}>
            <View>
              <Text style={styles.titleTop}>Profil</Text>
            </View>
            <View>
              <TouchableOpacity onPress={togglePhotoModal}>
                <Image
                  source={
                    profilePicture.picture
                      ? { uri: profilePicture.picture }
                      : require("../assets/profilpicturephoto.png")
                  }
                  style={styles.photo}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPhotoUri(null); // Réinitialise photoUri à null pour une nouvelle prise de photo
                  setIsCameraVisible(true); // Affiche le modal de la caméra
                }}
                style={styles.button}
              >
                <Text style={styles.textButton}>Prendre une photo</Text>
              </TouchableOpacity>

              <Modal isVisible={isCameraVisible} style={styles.modal}>
                <View style={styles.modalContent}>
                  {hasPermission && !photoUri && (
                    <Camera
                      style={styles.camera}
                      type={type}
                      ref={cameraRef}
                      flashMode={flashMode}
                    >
                      <View style={styles.cameraContent}>
                        <TouchableOpacity
                          onPress={() =>
                            setType(
                              type === CameraType.back
                                ? CameraType.front
                                : CameraType.back
                            )
                          }
                          style={styles.cameraButton}
                        >
                          <FontAwesome
                            name="rotate-right"
                            size={25}
                            color="#ffffff"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleTakePhoto}
                          style={styles.cameraButton}
                        >
                          <FontAwesome
                            name="camera"
                            size={25}
                            color="#ffffff"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setIsCameraVisible(false)}
                          style={styles.cameraButton}
                        >
                          <FontAwesome name="times" size={25} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    </Camera>
                  )}

                  {photoUri && (
                    <View style={styles.modalContent}>
                      <Image
                        source={{ uri: photoUri }}
                        style={{ width: 300, height: 300 }}
                      />
                      <TouchableOpacity
                        onPress={handleValidation}
                        style={styles.modalButton}
                      >
                        <Text style={styles.textButton}>Valider</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </Modal>

              <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.textButton}>Importer une photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Modifiez vos informations :</Text>
              </View>
              <TextInput
                style={styles.text2}
                placeholder={user.firstname}
                value={firstname}
                onChangeText={setFirstname}
              />
              <TextInput
                style={styles.text2}
                placeholder={user.lastname}
                value={lastname}
                onChangeText={setLastname}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => toggleModalValider()}
                  style={styles.buttonValidate}
                  activeOpacity={0.8}
                >
                  <Text style={styles.textButton}>Valider</Text>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} style={styles.modal}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                      Voulez-vous valider vos modifications ?
                    </Text>
                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalButton}
                      >
                        <Text style={styles.textModal}>Oui</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalButton}
                      >
                        <Text style={styles.textModal}>Non</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
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
    paddingTop: "20%",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  closeIcon: {
    width: "90%",
  },

  titleTop: {
    width: "80%",
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#473E66",
    paddingTop: "3%",
    fontFamily: "Ladislav-Bold",
  },

  profilContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "10%",
    paddingBottom: "6%",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  profile: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    width: "80%",
    alignItems: "center",
    fontFamily: "OpenSans-Regular",
    padding: "2%",
  },

  titleContainer: {
    alignItems: "center",
    fontFamily: "OpenSans-Regular",
    margin: "3%",
  },

  title: {
    fontSize: 20,
    color: "#473E66",
    fontFamily: "OpenSans-Regular",
    paddingBottom: "5%",
  },

  text: {
    width: "80%",
    fontSize: 30,
    fontWeight: "800",
    color: "#473E66",
    fontFamily: "OpenSans-Regular",
  },

  text2: {
    width: "80%",
    fontSize: 16,
    fontWeight: "800",
    color: "#473E66",
    margin: "3%",
    fontFamily: "OpenSans-Regular",
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
  },

  input: {
    height: "10%",
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#4F4F4F",
    borderBottomWidth: 1,
    fontSize: 25,
    color: "#4F4F4F",
  },

  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "12%",
    marginTop: "10%",
  },

  textButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  button: {
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F88559",
    borderRadius: 25,
    shadowColor: "#000",
    margin: "3%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonValidate: {
    height: "30%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F88559",
    borderRadius: 25,
    shadowColor: "#000",
    margin: "3%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modal: {
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    color: "#333",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  modalButton: {
    backgroundColor: "#F88559",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  // Ajoutez un style pour le texte des boutons dans la modale
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  textModal: {
    color: "white",
  },

  camera: {
    width: "100%",
    height: "80%",
  },
  cameraContent: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    margin: 20,
  },
  cameraButton: {
    backgroundColor: "#F88559",
    borderRadius: "20%",
    padding: "3%",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContent2: {
    height: "70%",
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
