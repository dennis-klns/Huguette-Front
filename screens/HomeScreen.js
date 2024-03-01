import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const handleSignIn = () => {
    navigation.navigate('TabNavigator')

}

export default function HomeScreen({ navigation }) {


  return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/huguette.png')} resizeMode="cover" style={styles.image}>

      <Text style={styles.title}>Huguette</Text>
      <Text style={styles.title}>Get Safe</Text>

      <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>

      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white'
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
