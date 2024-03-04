import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const handleSignIn = () => {
    navigation.navigate('TabNavigator')

}

export default function HomeScreen({ navigation }) {


  return (

      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/huguette.png')} resizeMode="cover" style={styles.image}/>
      <View style={styles.textgroup}>
      <Text style={styles.title}>Huguette</Text>
      <Text style={styles.title}>Get Safe</Text>
      </View>

      <View style={styles.buttonsgroup}>
      <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogIn()}  style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Se connecter</Text>
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

  textgroup: {
    flex: 1,
    justifyContent: 'flex-end',
  },


  buttonsgroup: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
    flex: 1,
    justifyContent: 'flex-end'
    
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
