import { useState } from 'react';
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
    <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image style={styles.image} source={require('../assets/huguette.JPEG')} />
      <Text style={styles.title}>Huguette</Text>
      <Text style={styles.title}>Get Safe</Text>

      <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>S'inscrire</Text>
      </TouchableOpacity>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
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
