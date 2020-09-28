import React from 'react';
import { StyleSheet } from 'react-native';
import TagSelector from './TagSelector';
import Colors from '../constants/Colors';
import { CATEGORIES } from '../data/dummy-data';

const CategoriesSmallList = (props) => {

    return (
        <TagSelector
            value = {props.catId}
            maxHeight={70}
            tags={CATEGORIES}
            onChange={(selected) => {
                if (selected.length > 3) {
                    selected.pop();
                    alert('You cannot select more than 3 categories.');
                } else {
                    if (props.routeName === 'Search') {
                        //temporary fix
                        props.catList(selected);
                    } else {
                        if (props.routeName === 'New' || props.routeName === 'Edit') {
                            props.onCatPress(selected);
                        }
                    }
                }
            }}
            selectedTagStyle={[styles.tagStyle, styles.selectedTagStyle]}
            tagStyle={styles.tagStyle}
            containerStyle={styles.tagContainerStyle}
            maxHeight={0}
        />
    );
};

const styles = StyleSheet.create({
    tagStyle: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'center',
        color: Colors.onBackgroundColor,
        margin: 5,
        fontSize: 14,
        borderWidth: 0.5,
        borderColor: Colors.onBackgroundSmallColor,
    },
    selectedTagStyle: {
        backgroundColor: Colors.brandColor,
        color: Colors.backgroundColor,
    },
    tagContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        flex: 0,
    },
});

export default CategoriesSmallList;
