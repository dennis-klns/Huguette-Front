import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    SafeAreaView,
    Switch,
    Dimensions,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useState } from 'react';
import { useSelector } from 'react-redux';


export default function SearchScreen({ navigation }) {

    const [departure, setDeparture] = useState('')
    const [arrival, setArrival] = useState('')
    const [isAccompanied, setIsAccompanied] = useState(false)
    const toggleSwitch = () => setIsAccompanied(previousState => !previousState);

    const [mood, setMood] = useState(false)
    const [music, setMusic] = useState(false)

    const user = useSelector((state) => state.user.value);

    const addressesList = [
        {
            name: 'Maison',
            address: '16 rue des Boulets, PARIS'
        },
        {
            name: 'La Capsule',
            address: '56 boulevard Pereire, PARIS'
        }
    ]


    const changeMood = () => {
        setMood(previousState => !previousState)
    }

    const changeMusic = () => {
        setMusic(previousState => !previousState)
    }


    const handleValidate = () => {
        navigation.navigate('TabNavigator', { screen: 'Map' });
    }

    let iconStyleMusic = {};
    let iconStyleMood = {};
    if (music) {
        iconStyleMusic = { 'color': '#F88559' };
    }

    if (mood) {
        iconStyleMood = { 'color': '#F88559' }
    }


    const addresses = addressesList.map((data, i) => {
        return (
            <View key={i} style={styles.addresses}>
            
                    <Text style={styles.name}>{data.name}</Text>
                    <Text>{data.address}</Text>
               
            </View>
        )


    });

    return (

        <LinearGradient colors={['#F1C796', '#EBB2B5', '#E0CAC2']} style={styles.linearGradient}>
            <SafeAreaView style={styles.container}>

                <View style={styles.profile}>

                    <TextInput placeholder="Départ" onChangeText={(value) => setDeparture(value)} value={departure} style={styles.input} />
                    <TextInput placeholder="Arrivée" onChangeText={(value) => setArrival(value)} value={arrival} style={styles.input} />

                    <View style={styles.isaccompanied}>
                        <Text style={styles.text}>Je suis accompagnée</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isAccompanied ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isAccompanied}
                        />
                    </View>

                    <View style={styles.mood}>
                        <Text style={styles.text}>MOOD</Text>
                        <View style={styles.icon}>
                            <FontAwesome name='music' onPress={() => changeMusic()} size={25} style={iconStyleMusic} />
                            <FontAwesome name='moon-o' onPress={() => changeMood()} size={25} style={iconStyleMood} />
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollView}>
                    {addresses}
                </ScrollView>


                <TouchableOpacity onPress={() => handleValidate()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Valider</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    linearGradient: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        width: '80%',
        fontSize: 16,
        fontWeight: '800',
        color: '#473E66',
        margin: 10,
    },

    profile: {
        width: '80%',
        height: '30%',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#4F4F4F',
        borderBottomWidth: 1,
        fontSize: 16,
        color: '#4F4F4F',
    },

    isaccompanied: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 30,
    },

    mood: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 30,
    },

    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%',

    },

    addresses: {
        marginTop: 20,
        color: '#000',
        borderBottomColor: '#4F4F4F',
        borderBottomWidth: 1,

    },

    scrollView: {
        width: Dimensions.get('window').width,
        padding: 30,
    },


    name: {
        fontSize: 18,
        fontWeight: '700',
    },

    button: {
        height: 40,
        // paddingTop: 8,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#F88559',
        borderRadius: 10,
        shadowColor: '#000',
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

});
