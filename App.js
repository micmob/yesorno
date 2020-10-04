import React, { useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
//import Modal from 'react-native-modal';
import { StatusBar } from 'expo-status-bar';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import AppNavigator from './navigation/AppNavigator';
import questionsReducer from './store/reducers/questions';
import New from './components/New';

const rootReducer = combineReducers({
    questions: questionsReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
    const [newModal, setNewModal] = useState(false);

    const toggleModal = () => {
        setNewModal(!newModal);
    };

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Modal
                    visible={newModal}
                    animationType="slide"
                    presentationStyle="fullScreen"
                    transparent={false}
                    onRequestClose={toggleModal}
                    style={{ margin: 0 }}
                >
                    <New closeModal={toggleModal} />
                </Modal>
                <AppNavigator showNewModal={toggleModal} />
                <StatusBar style="light" translucent={true} />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
