import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  
  const handleSignIn = () => {
      navigation.navigate('SignIn');
  
  }
  
  export default function SignInScreen({ navigation }) {
  
  
    return (
  
        <SafeAreaView style={styles.container}>
          <Image source={require('../assets/huguette.png')} resizeMode="cover" style={styles.image}/>
        <View style={styles.textgroup}>
        <Text style={styles.title}>BIENVENUE ! </Text>
        </View>
  
        <View style={styles.buttonsgroup}>
            <Text style={styles.title}>Vous êtes : </Text>
        <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Utilisatrice</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => handleLogIn()}  style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Conductrice</Text>
        </TouchableOpacity>
        </View>
  
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center'
      },
  
    image: {
      height: '120%',
      width: '100%',
      position: 'absolute'
   
    },
  
    title: {
      width: '80%',
      fontSize: 38,
      fontWeight: '600',
      textAlign: 'center',
      color: 'white',
    },
  
  
  
  
    buttonsgroup: {
      width: '80%',
      alignItems: 'center',
      marginBottom: 30,
      
    },
  
    button: {
      height: 40,
      paddingTop: 8,
      width: '80%',
      alignItems: 'center',
      marginTop: 10,
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
  