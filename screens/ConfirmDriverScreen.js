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

//import { UseSelector } from "react-redux";



export default function ConfirmDriverScreen({ navigation }) {

    const handleValidate = () => {
        navigation.navigate("Route")
        // navigation.navigate("Waiting")
    }



    return (
        <LinearGradient
            colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
            style={styles.linearGradient}
        >

            <View style={styles.container}>

                <Image
                    source={require("../assets/driver.jpg")}
                    style={styles.image}
                />

                <View style={styles.card}>
                    <Text style={styles.title}>Marguerite</Text>
                    <Text style={styles.text}>Note</Text>
                    <View style={styles.note}>
                    <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                    <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                    <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                    <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                    <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                    </View>
                    <Text style={styles.text}>Mood </Text>
                    <Text style={styles.info}>#fun #music </Text>
                    <Text style={styles.text}> AB-123-CD </Text>

                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton} onPress={()=>handleValidate()}>Valider la conductrice</Text>
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
        justifyContent: 'center',
    },

    image : {
        height: '40%',
        width: '80%',
        borderRadius: 20,
    },

    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: '30%',
        width: '80%',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 30,

    },

    title: {
        marginTop: 10,
        fontSize: 22,
        fontFamily: 'Ladislav-Bold',
    },

    note: {
        flexDirection: 'row'
    },

    text: {
        fontWeight: '700',
        fontSize: 15,
        marginTop: 40,
    },


    button: {
        height: 40,
        paddingTop: 8,
        width: "80%",
        alignItems: "center",
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

    textButton: {
        color: "#fff",
        height: 30,
        fontWeight: "600",
        fontSize: 16,
    },
});
