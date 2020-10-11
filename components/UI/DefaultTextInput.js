import React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { TextInput } from 'react-native';
import Colors from '../../constants/Colors';

const DefaultTextInput = (props) => {
    return (
        <TextInput
            value={props.value}
            onChangeText={(input) => {
                props.onChangeText(input)
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
                props.style
            ]}
            multiline={props.multiline}
            textContentType={props.textContentType}
            secureTextEntry={props.secureTextEntry}
            autoCompleteType={props.autoCompleteType}
            keyboardType={props.keyboardType}
            textContentType={props.textContentType}
            autoCapitalize='none'
            importantForAutofill={props.importantForAutofill}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.surfaceColor,
        elevation: 5,
        textAlignVertical: 'top',
        color: Colors.onBackgroundColor,
        fontSize: 18,
        padding: 15,
        borderRadius: 20,
    },
});

export default DefaultTextInput;
