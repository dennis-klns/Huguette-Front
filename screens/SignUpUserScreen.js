import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,

  Platform,

  SafeAreaView,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUpUserScreen({ navigation }) {
  const dispatch = useDispatch();
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState(0);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');


    

    const [cardNumber, setCardNumber] = useState('')
    const [expdate, setExpdate] = useState('')
    const [crypto, setCrypto] = useState('')

    const signUpClick = () => {

        fetch('http://localhost:3000/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lastname, firstname, email, phone, birthdate, gender, password }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            dispatch(login({ phone, token: data.token }));
            navigation.navigate('TabNavigator', { screen: 'Map' });
          } else {
            console.error('Signup failed:', data.error);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        })
       
      };


    
    
    return (

        <LinearGradient colors={['#F1C796', '#EBB2B5', '#E0CAC2']} style={styles.linearGradient}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
            <View style={styles.container}>

                        <Text style={styles.title}>PROFIL PASSAGÈRE</Text>

                        <View style={styles.profile}>
                            <Text style={styles.text}>Votre profil</Text>
                            <TextInput placeholder="Lastname" onChangeText={(value) => setLastname(value)} value={lastname} style={styles.input} />
                            <TextInput placeholder="Firstname" onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} />
                            <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
                            <TextInput placeholder="Phone" onChangeText={(value) => setPhone(value)} value={phone} style={styles.input} />
                            <TextInput placeholder="Birthdate" onChangeText={(value) => setBirthdate(value)} value={birthdate} style={styles.input} />
                            <TextInput placeholder="Gender" onChangeText={(value) => setGender(value)} value={gender} style={styles.input} />
                            <TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />
                        </View>

                        <View style={styles.pay}>
                            <Text style={styles.text}>Payer avec</Text>
                            <TextInput placeholder="Apple Pay" style={styles.input} />
                            <TextInput placeholder="Paypal" style={styles.input} />
                        </View>

                        <View style={styles.paywith}>
                            <Text style={styles.text}>Ajouter un moyen de paiement</Text>
                            <TextInput placeholder="Numéro de carte" onChangeText={(value) => setCardNumber(value)} value={cardNumber} style={styles.input} />


                            <View style={styles.halfinput}>
                                <TextInput placeholder="Date d'expiration" onChangeText={(value) => setExpdate(value)} value={expdate} style={styles.smallinput} />
                                <TextInput placeholder="Crypto" onChangeText={(value) => setCrypto(value)} value={crypto} style={styles.smallinput} />
                            </View>
                        </View>

                        <TouchableOpacity onPress={signUpClick} style={styles.button} activeOpacity={0.8} >
                            <Text style={styles.textButton}>Valider</Text>
                        </TouchableOpacity>

                        </View>
                        </KeyboardAwareScrollView>
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


    title: {
        width: '80%',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#473E66',
        margin: 40,
    },


    profile: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 80,
    },

    pay: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },

    paywith: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },


    text: {
        width: '80%',
        fontSize: 16,
        fontWeight: '800',
        color: '#473E66',
        margin: 10,
    },

    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#4F4F4F',
        borderBottomWidth: 1,
        fontSize: 16,
        color: '#4F4F4F',
    },

    halfinput : {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'

    },

    smallinput: {
        width: '30%',
        marginTop: 25,
        borderBottomColor: '#4F4F4F',
        borderBottomWidth: 1,
        fontSize: 16,
        color: '#4F4F4F',
       
    },


    button: {
        height: 40,
        paddingTop: 8,
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
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },

});
