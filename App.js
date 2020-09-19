import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Colors from './constants/Colors';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import TitleText from './components/TitleText';
import { CATEGORIES } from './data/dummy-data';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoriesSmallList from './components/CategoriesSmallList';
import DefaultTextInput from './components/DefaultTextInput';

export default function App() {
    const [newModal, setNewModal] = useState(false);

    const toggleModal = () => {
        setNewModal(!newModal);
    };

    tags = CATEGORIES;

    return (
        <View style={styles.container}>
            <Modal
                isVisible={newModal}
                onBackButtonPress={toggleModal}
                useNativeDriver={true}
                animationIn="slideInDown"
                animationOut="slideOutUp"
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
                            <Icon
                                name="paper-plane"
                                color={Colors.backgroundColor}
                                size={25}
                                style={styles.icon}
                            />
                        </View>
                    </View>
                    <DefaultTextInput
                        placeholder={
                            'Need inspiration? Well.. too bad, I got none either.'
                        }
                        height={300}
                        multiline={true}
                        routeName='New'
                    />
                    <CategoriesSmallList />
                </View>
            </Modal>
            <AppNavigator showNewModal={toggleModal} />
            <StatusBar style="light" />
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
        paddingBottom: 20,
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
        backgroundColor: Colors.brandColor,
    },
});
