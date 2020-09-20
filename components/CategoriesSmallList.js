import React from 'react';
import { StyleSheet } from 'react-native';
import TagSelector from 'react-native-tag-selector';
import Colors from '../constants/Colors';

const CategoriesSmallList = props => {

    return (
        <TagSelector
            maxHeight={70}
            tags={tags}
            onChange={(selected) => {if(selected.length > 3){
                selected.pop();
                alert('You cannot select more than 3 categories.');
            }else {
                if(props.routeName === 'Search') { //temporary fix
                    props.catList(selected);
                }
                
            }}}
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
        color: Colors.onSurfaceColor,
        margin: 5,
        fontSize: 14,
        borderWidth: 0.5,
        borderColor: Colors.onSurfaceSmallColor,
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
