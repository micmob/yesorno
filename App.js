import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import Colors from './constants/Colors';
import { StatusBar } from 'expo-status-bar';


///// FILE IMPORTS /////
import HomeScreen from './screens/HomeScreen';
import AppNavigator from './navigation/AppNavigator';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function App() {

  const [newModal, setNewModal] = useState(false);

  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={newModal} animationType='slide'>
        <View style={styles.newContainer}>
          <Text>hello</Text>
          <Button title='Cancel' onPress={() => setNewModal(false)} />
        </View>
      </Modal>
      <AppNavigator showNewModal={setNewModal} />
      <StatusBar style='light' />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newContainer: {
    flex: 1,
    marginVertical: '50%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  }
})