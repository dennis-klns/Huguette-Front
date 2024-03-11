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




export default function ArrivalScreen({ navigation }) {

    const [personalNote, setPersonalNote] = useState(0);

    const handleValidate = () => {
        navigation.navigate("Map")
    }

    const handleComplain = () => {
        navigation.navigate("Complain")
    }

    const personalStars = [];
    for (let i = 0; i < 5; i++) {
      let iconStyle = {};
      if (i < personalNote) {
        iconStyle = { 'color': 'gold'};
      }
      personalStars.push(<FontAwesome name='star' onPress={() => setPersonalNote(i + 1)} style={iconStyle} size={25}/>);
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
                            {/* <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                            <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                            <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                            <FontAwesome name="star" size={30} color="gold"></FontAwesome>
                            <FontAwesome name="star" size={30} color="gold"></FontAwesome> */}
                            {personalStars}
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} activeOpacity={0.8}>
                    <Text style={styles.text}>Commenter la course (facultatif) </Text>
                </TouchableOpacity>

                <View style={styles.buttonsgroup}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handleValidate()}>
                        <Text style={styles.textButton} >Valider </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handleComplain()}>
                        <Text style={styles.textButton} >Signaler </Text>
                    </TouchableOpacity>
                </View>

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

    textButton: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
