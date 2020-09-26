import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { StatusBar } from 'expo-status-bar';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Colors from './constants/Colors';
import AppNavigator from './navigation/AppNavigator';
import questionsReducer from './store/reducers/questions';
import New from './components/New';

const rootReducer = combineReducers({
    questions: questionsReducer,
});

const enhancer = compose(
    applyMiddleware(ReduxThunk),
    composeWithDevTools()
);

const store = createStore(rootReducer, enhancer);

export default function App() {
    const [newModal, setNewModal] = useState(false);

    const toggleModal = () => {
        setNewModal(!newModal);
    };

    return (
        <Provider store={store}>
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
                    <New closeModal={toggleModal} />
                </Modal>
                <AppNavigator showNewModal={toggleModal} />
                <StatusBar style="light" />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
