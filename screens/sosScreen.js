import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

//import { UseSelector } from "react-redux";



export default function SosScreen({ navigation }) {

    const handleValidate = () => {
        navigation.navigate("Arrival")
    }




    return (
        <LinearGradient
            colors={["#F1C796", "#EBB2B5", "#E0CAC2"]}
            style={styles.linearGradient}
        >

            <View style={styles.container}>

                <TouchableOpacity style={styles.emergency} activeOpacity={0.8}>
                    <Text style={styles.textEmergency }>Contact en cours</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.emergency} activeOpacity={0.8}>
                    <Text style={styles.textEmergency}>Contact d'urgence </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={()=>handleValidate()}>
                    <Text style={styles.textButton} >Signaler </Text>
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

    emergency: {
        height: 45,
        justifyContent: 'center',
        paddingTop: 8,
        width: "80%",
        alignItems: "center",
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

    textEmergency: {
        fontWeight: '800',
        fontSize: 16,
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
        marginTop: '30%',

    },

    textButton: {
        color: "#fff",
        height: 30,
        fontWeight: "600",
        fontSize: 16,
    },
});
