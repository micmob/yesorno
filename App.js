import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import AppNavigator from './navigation/AppNavigator';
import questionsReducer from './store/reducers/questions';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    questions: questionsReducer,
    auth: authReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <AppNavigator />
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
