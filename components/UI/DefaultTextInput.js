import React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { TextInput } from 'react-native';
import Colors from '../../constants/Colors';

const DefaultTextInput = (props) => {
    return (
        <TextInput
            value={props.value}
            onChangeText={(input) => {
                if (props.routeName === 'Search') {
                    props.searchKeyword(input);
                } else {
                    if (props.routeName === 'New' || props.routeName === 'Edit') {
                        props.onTextInput(input);
                    }
                }
            }}
            onSubmitEditing={(event) => {
                if (props.routeName === 'Search') {
                    Keyboard.dismiss();
                    props.onSubmitEditing(event.nativeEvent.text);
                }
            }}
            placeholder={props.placeholder}
            placeholderTextColor={Colors.onSurfaceSmallColor}
            selectionColor={Colors.brandColor}
            style={[
                styles.input,
                {
                    height: props.height,
                    borderTopRightRadius: props.borderRadiusRight,
                    borderBottomRightRadius: props.borderRadiusRight,
                },
            ]}
            multiline={props.multiline}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.surfaceColor,
        textAlignVertical: 'top',
        color: Colors.onBackgroundColor,
        fontSize: 18,
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
    },
});

export default DefaultTextInput;
