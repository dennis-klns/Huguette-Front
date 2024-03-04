import { StyleSheet, Dimensions, View, Modal, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';



import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';


export default function MapScreen() {

 

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
          });
      }
    })();
  }, []);


 



  return (
    <View style={{ flex: 1 }}>
      {/* <Modal visible={modalVisible} transparent>

        <View style={styles.centeredView}>
         <View style={styles.modalView}>
        <TextInput placeholder="New place" onChangeText={(value) => setNewPlace(value)} value={newPlace} style={styles.input} />

        <TouchableOpacity onPress={() => handleAddPlace()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Close</Text>
        </TouchableOpacity>

        </View>
       </View>

      </Modal> */}

      <MapView style={{ flex: 1 }} onLongPress={(e) => handleLongPress(e)}>
     
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height

  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
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
  width: 150,
  borderBottomColor: '#ec6e5b',
  borderBottomWidth: 1,
  fontSize: 16,
},

button: {
  width: 150,
  alignItems: 'center',
  marginTop: 20,
  paddingTop: 8,
  backgroundColor: '#ec6e5b',
  borderRadius: 10,
},


});

