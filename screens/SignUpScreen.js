import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
  } from 'react-native';
  import { LinearGradient } from "expo-linear-gradient";
  
  
  export default function SignUpScreen({ navigation }) {
      
      const handleSignUpUser = () => {
          navigation.navigate('SignUpUser');
      
      }

      const handleSignUpDriver = () => {
        navigation.navigate('SignUpdriver');
    
    }
  
    return (
        
        <LinearGradient colors={['#F1C796', '#EBB2B5', '#E0CAC2']} style={styles.linearGradient}>
        <SafeAreaView style={styles.container}>

        <View style={styles.textgroup}>
        <Text style={styles.title}>BIENVENUE ! </Text>
        <Text style={styles.text}>Vous êtes : </Text>
        </View>
  
        <View style={styles.buttonsgroup}>
        <TouchableOpacity onPress={() => handleSignUpUser()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Passagère</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => handleSignUpDriver()}  style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Conductrice</Text>
        </TouchableOpacity>
        </View>
  
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


    textgroup : {
        alignItems: 'center',
        marginBottom: 30,
    },
  
    title: {
      width: '80%',
      fontSize: 38,
      fontWeight: '600',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Ladislav-Bold',
      
    },


    text: {
      width: '80%',
      fontSize: 25,
      fontWeight: '400',
      textAlign: 'center',
      color: 'white',
   
    },
    
  
    buttonsgroup: {
      width: '80%',
      alignItems: 'center',
      
    },
  
    button: {
      height: 40,
      paddingTop: 8,
      width: '80%',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: 'white',
      opacity : 0.5,
      borderRadius: 30,
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
  