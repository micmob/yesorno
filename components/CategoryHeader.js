import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import TitleText from './TitleText';
import { CATEGORIES } from '../data/dummy-data';

const CategoryHeader = (props) => {
  const name = CATEGORIES.filter((cat) => cat.id === props.id)[0].name;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TitleText style={styles.text}>{name}</TitleText>
      </View>
      <View style={styles.goRight}>
        <View style={styles.settingsContainer}>
          <Icon name="settings" color={Colors.onBackgroundColor} size={25} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  settingsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.onBackgroundColor,
  },
  goRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default CategoryHeader;
