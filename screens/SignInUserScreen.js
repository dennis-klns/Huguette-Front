import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
  } from 'react-native';
  import { LinearGradient } from "expo-linear-gradient";
  import {useState} from 'react'
  
  
  export default function SignInUserScreen({ navigation }) {
      
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [gender, setGender] = useState('')

      const handleSignInUser = () => {
          navigation.navigate('SignInUser');
      
      }
  
    return (
        
        <LinearGradient colors={['#F1C796', '#EBB2B5', '#E0CAC2']} style={styles.linearGradient}>
        <SafeAreaView style={styles.container}>

        <Text style={styles.title}>PROFIL UTILISATRICE</Text>

        <View style={styles.textgroup}>
        <Text style={styles.text}>Votre profil</Text>
        <TextInput placeholder="Lastname" onChangeText={(value) => setLastname(value)} value={lastname} style={styles.input} />
        <TextInput placeholder="Firstname" onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} />
        <TextInput placeholder="Birthdate" onChangeText={(value) => setBirthdate(value)} value={birthdate} style={styles.input} />
        <TextInput placeholder="Gender" onChangeText={(value) => setGender(value)} value={gender} style={styles.input} />
        </View>
  


  
        <TouchableOpacity onPress={() => handleSignInDriver()}  style={styles.button} activeOpacity={0.8}>
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
  
  
    title: {
      width: '80%',
      fontSize: 38,
      fontWeight: '600',
      textAlign: 'center',
      color: 'white',
    },


    text: {
      width: '80%',
      fontSize: 25,
      fontWeight: '400',
      textAlign: 'center',
      color: 'white',
    },
    
    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 18,
      },


    button: {
      height: 40,
      paddingTop: 8,
      width: '80%',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: 'white',
      opacity : 0.5,
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
      color: '#000',
      height: 30,
      fontWeight: '600',
      fontSize: 16,
    },
  
  });
  