import React from 'react';
import { StyleSheet, Text, View, useState } from 'react-native';
import Colors from './constants/Colors';
import { StatusBar } from 'expo-status-bar';


///// FILE IMPORTS /////
import HomeScreen from './screens/HomeScreen';
import AppNavigator from './navigation/AppNavigator';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
      <StatusBar style='light' />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})