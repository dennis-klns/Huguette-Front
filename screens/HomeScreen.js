import {
  Image,
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
        <Image source={require('../assets/huguette.png')} resizeMode="cover" style={styles.image}/>

      <Text style={styles.title}>Huguette</Text>
      <Text style={styles.title}>Get Safe</Text>

      <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-end',
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

  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 18,
  },

  button: {
    height: 40,
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: 'white',
    opacity : 0.6,
    borderRadius: 20,
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
