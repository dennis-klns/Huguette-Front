import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    TextInput,
    KeyboardAvoidingView,
 
} from "react-native";

//import LottieView from "lottie-react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";




export default function ArrivalScreen({ navigation }) {

    /* FONCTION POUR LES CONFETTIS
    const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, []); 
    
    
     <AnimatedLottieView
                source={require("../path/to/animation.json")}
                progress={animationProgress.current}
                style={{ width: "100%", height: "100%" }}
            />*/






    // DONNER LES ETATS INITIAUX DES ELEMENTS

    const [personalNote, setPersonalNote] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('')

    const trip = useSelector((state) => state.trip.value)

    // POUR VALIDER ET CLOTURER LA COURSE + ENVOI DANS LE BACK END DE LA NOTE DE LA COURSE
    const handleValidate = () => {

        fetch("https://huguette-backend.vercel.app/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tripId: trip.tripId,
                noteByPassenger: personalNote,
                commentByPassenger: null,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    console.log("Reviews updated:", data);
                } else {
                    console.error("Failed reviews:", data.error);
                }
            })
        navigation.navigate("Map")
    }

    const handleComplain = () => {
        navigation.navigate("Complain")
    }


    // EN CAS DE COMMENTAIRE DANS LA MODAL - ENVOI DANS LE BACK END DU COMMENT
    const handleComment = () => {
        fetch("https://huguette-backend.vercel.app/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tripId: trip.tripId,
                noteByPassenger: personalNote,
                commentByPassenger: comment,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    console.log("Reviews updated:", data);
                } else {
                    console.error("Failed reviews:", data.error);
                }
                setComment('')
                setModalVisible(false)
            })

    }

    // POUR NOTER LA COURSE PAR DES ETOILES
    const personalStars = [];
    for (let i = 0; i < 5; i++) {
        let iconStyle = {};
        if (i < personalNote) {
            iconStyle = { 'color': 'gold' };
        }
        personalStars.push(<FontAwesome key={i} name='star' onPress={() => setPersonalNote(i + 1)} style={iconStyle} size={25} />);
    }



    return (
        <LinearGradient
            colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
            style={styles.linearGradient}
        >

           

            <View style={styles.container}>
                <Text style={styles.title}>Vous êtes arrivée ! </Text>

                <TouchableOpacity style={styles.input} activeOpacity={0.8}>
                    <View style={styles.note}>
                        <Text style={styles.text}>Notez la course</Text>
                        <View style={styles.icon}>

                            {personalStars}
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                    <Text style={styles.text}>Commenter la course (facultatif) </Text>
                </TouchableOpacity>

                <View style={styles.buttonsgroup}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handleValidate()}>
                        <Text style={styles.textButton} >Valider </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signalButton} activeOpacity={0.8} onPress={() => handleComplain()}>
                        <Text style={styles.textButton} >Signaler </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <LinearGradient
                    colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
                    style={styles.linearGradient}
                >
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <FontAwesome name="times" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                    <View style={styles.containerModal}>
                        <Text style={styles.textModal} >On vous écoute...</Text>

                        <KeyboardAvoidingView>
                            <TextInput style={styles.messageInput} placeholder="Ecrivez votre commentaire" multiline={true} numberOfLines={4} value={comment}
                                onChangeText={value => setComment(value)} />

                            <TouchableOpacity
                                onPress={() => handleComment()}
                                style={styles.modalButton}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.textButton}>Envoyer</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </LinearGradient>
            </Modal>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    linearGradient: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 40,
        fontWeight: '600',
        marginBottom: '20%',
    },

    note: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    icon: {
        flexDirection: 'row',
    },

    input: {
        height: 45,
        justifyContent: 'center',
        width: "80%",
        padding: 10,
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

    text: {
        fontWeight: '300',
        fontSize: 16,
    },

    buttonsgroup: {
        width: '70%',
        alignItems: 'center',
        marginTop: '30%',
    },

    button: {
        height: 40,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#F88559",
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

    signalButton: {
        height: 40,
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#EBB2B5",
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
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },

    // DEBUT DES CARACTERISTIQUES DE LA MODALE

    containerModal: {
        flex: 1,
        justifyContent: 'center',
        margin: '5%',
    },

    modalHeader: {
        marginTop: '15%',
        marginLeft: '5%',
    },

    textModal: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Ladislav-Bold',
        alignSelf: 'center',
        marginBottom: '10%',
        marginTop: '10%',
    },

    messageInput: {
        height: '45%',
        fontSize: 16,
        color: "#473E66",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
    },

    modalButton: {
        height: 40,
        width: '80%',
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#F88559",
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
});
