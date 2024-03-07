import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";



export default function WaitingScreen({ navigation }) {

    const trips = useSelector((state) => state.trips.value)

    const handleValidate = () => {
        navigation.navigate("Route")
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
                    <Text style={styles.text}>{trips.departure} - {trips.arrival}</Text>
                    <Text style={styles.text}>Prix - 13€</Text>
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
                    <Text style={styles.textButton} onPress={() => handleValidate()}>Annuler la course</Text>
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
