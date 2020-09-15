import React from 'react';
import { View, StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native';
import TitleText from '../components/TitleText'
import SmallText from '../components/SmallText'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../Constants/Colors';
import Overline from './Overline';

const QuestionList = props => {
    

    const renderQuestion = itemData => {

        return (
            <View style={styles.card}>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(Colors.onPressColor)}
                    onPress={() => props.navigation.navigate(
                        'Question',{
                            question: itemData.item
                        })}>
                    
                    <View style={styles.insideTouchable}>
                        <Overline question={itemData.item} />
                        <TitleText>
                            {itemData.item.title}
                        </TitleText>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.questions}
                keyExtractor={(item, index) => item.id}
                renderItem={renderQuestion}
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.backgroundColor,
    },
    card: {
        marginBottom: 5,
        backgroundColor: Colors.surfaceColor,
    },
    date: {
        color: Colors.textColor,
        fontSize: 10,
    },
    insideTouchable: {
        flex: 1,
        padding: 10,
    }
});

export default QuestionList;