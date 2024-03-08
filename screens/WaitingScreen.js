import { LinearGradient } from "expo-linear-gradient";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { logoutTrip } from "../reducers/trip";



export default function WaitingScreen({ navigation }) {

    
    const trip = useSelector((state) => state.trip.value);
    const dispatch = useDispatch();

    const handleCancel = () => {
        fetch("https://huguette-backend.vercel.app/trips/cancelationPassenger", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tripId: trip.tripId, cancelledPassenger: true, }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.trip)
                if (data.result) {
                    console.log("OK");
                    dispatch(logoutTrip());
                } else {
                    console.log(trip)
                    console.error("Failed:", data.error);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        /* navigation.navigate("Map") */
    }



    return (
        <LinearGradient
            colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
            style={styles.linearGradient}
        >

            <View style={styles.container}>

                <Image
                    source={require("../assets/map.png")}
                    style={styles.image}
                />

                <View style={styles.card}>
                    <Text style={styles.title}>Récapitulatif</Text>
                    <Text style={styles.text}>{trip.departure} - {trip.arrival}</Text>
                    <Text style={styles.text}>Prix - {trip.cost}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.title}>Marguerite</Text>
                    <Text style={styles.text}>Mood: #fun #music</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.title}>Votre code</Text>
                    <Text style={styles.text}>7543</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.text}>Echanger avec Marguerite...</Text>

                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton} onPress={() => handleCancel()}>Annuler la course</Text>
                </TouchableOpacity>
            </View>

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
    },

    image: {
        height: '40%',
        width: '100%',
    },

    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '90%',
        borderRadius: 10,
        marginTop: 20,
        padding: 10,


    },

    title: {
        marginTop: 10,
        fontSize: 18,
    },



    text: {
        fontWeight: '700',
        marginTop: 10,
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
        color: "#fff",
        height: 30,
        fontWeight: "600",
        fontSize: 16,
    },
});
