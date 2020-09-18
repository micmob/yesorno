import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import Colors from './constants/Colors';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import TitleText from './components/TitleText';
import { TextInput } from 'react-native';
import { CATEGORIES } from './data/dummy-data';
import TagSelector from 'react-native-tag-selector';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {

  const [newModal, setNewModal] = useState(false);
  
  const toggleModal = () => {
    setNewModal(!newModal);
  }

  tags = CATEGORIES;

  return (
    <View style={styles.container}>
      <Modal
        isVisible={newModal}
        onBackButtonPress={toggleModal}
        useNativeDriver={true}
        animationIn='slideInDown'
        animationOut='slideOutUp'
        animationInTiming={200}
        animationOutTiming={200}
        backdropOpacity={1}
        backdropColor={Colors.backgroundColor}
        style={styles.modal}
      >
        <View style={styles.insideModal}>
          <View style={styles.headerContainer}>
            <TitleText style={styles.header}>New</TitleText>
            <View style={styles.iconContainer}>
              <Icon name='paper-plane' color={Colors.backgroundColor} size={25} style={styles.icon} />
            </View>
            
          </View>
          <TextInput
            label='Text'
            placeholder={'Need inspiration? Well.. too bad, I got none either.'}
            placeholderTextColor={Colors.onSurfaceSmallColor}
            selectionColor={Colors.brandColor}
            style={styles.input}
            multiline={true}
          />
          
          
          <TagSelector
            maxHeight={70}
            tags={tags}
            onChange={() => console.log('selected')}
            selectedTagStyle={[styles.tagStyle, styles.selectedTagStyle]}
            tagStyle={styles.tagStyle}
            containerStyle={styles.tagContainerStyle}
            maxHeight={0}
          />
        </View>
      </Modal>
      <AppNavigator showNewModal={toggleModal} />
      <StatusBar style='light' />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  modal: {
    flex: 1,
    margin: 0,
    padding: 20,
  },
  insideModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 25,
    fontWeight: 'normal',
  },
  dropdown: {
    backgroundColor: Colors.surfaceColor,
    fontSize: 18,
    color: 'white',
  },
  cat: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    color: Colors.onBackgroundColor,
    paddingBottom: 20
  },
  picker: {
    flex: 1,
    backgroundColor: Colors.onBackgroundColor,
    borderWidth: 1,
    marginLeft: 20,
    color: Colors.backgroundColor,
  },
  itemStyle: {
    color: Colors.backgroundColor,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.surfaceColor,
    textAlignVertical: 'top',
    height: 300,
    color: Colors.onSurfaceColor,
    fontSize: 18,
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  tagStyle: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'center',
    color: Colors.onSurfaceColor,
    margin: 5,
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: Colors.onSurfaceSmallColor
  },
  selectedTagStyle: {
    backgroundColor: Colors.brandColor
  },
  tagContainerStyle: {
    //backgroundColor: Colors.surfaceColor,
    //borderRadius: 20,
    //padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    flex: 0,
    //marginTop: 20
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'flex-end',
    flex: 1,
    
  },
  icon: {
    borderRadius: 100,
    padding: 15,
    backgroundColor: Colors.brandColor
  }
})