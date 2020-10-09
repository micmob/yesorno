import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const ProfileImage = props => {
    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                <Image
                    source={{
                        uri: props.image,
                    }}
                    style={styles.image}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100
    },
    insideContainer: {
        borderRadius: 100,
        width: 100,
        height: 100,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
});

export default ProfileImage;
