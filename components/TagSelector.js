import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

// Yoinked from github

const TagSelector = (props) => {
    const [state, setState] = useState({
        expanded: false,
        overflowed: false,
        tagsSelected: [],
    });

    useEffect(() => {
        if(typeof props.value !== 'undefined') {
            setState({tagsSelected: props.value});
        }
    }, [])

    const onTagSelected = (key) => {
        const tagsSelected = state.tagsSelected.includes(key)
            ? state.tagsSelected.filter((i) => i !== key)
            : [...state.tagsSelected, key];
        setState({ tagsSelected: tagsSelected });
        props.onChange(tagsSelected);
    };

    const renderTag = (tag) => {
        const selectedTagStyle = props.selectedTagStyle;
        const tagStyle = props.tagStyle;
        const maxHeight = props.maxHeight;
        return (
            <Text
                style={
                    state.tagsSelected.includes(tag.id)
                        ? selectedTagStyle
                        : tagStyle
                }
                onPress={() => onTagSelected(tag.id)}
                key={tag.id}
                onLayout={maxHeight > 0 ? onLayoutTag : () => {}}
            >
                {tag.name}
            </Text>
        );
    };

    const onExpand = () => {
        setState({ expanded: !state.expanded });
    };

    const onLayoutTag = (event) => {
        const { y } = event.nativeEvent.layout;
        if (!state.overflowed && y > props.maxHeight) {
            setState({ overflowed: true });
        }
    };

    const {
        maxHeight,
        containerStyle,
        expdandedContainerStyle,
        expandCaptions,
        separatorStyle,
        expandBtnStyle,
        expandTextStyle,
    } = props;
    return (
        <View>
            <View
                style={
                    state.expanded
                        ? expdandedContainerStyle
                        : [
                              containerStyle,
                              maxHeight > 0
                                  ? { maxHeight: props.maxHeight }
                                  : {},
                          ]
                }
            >
                {props.tags.map((i) => renderTag(i))}
            </View>
            {state.overflowed ? (
                <View style={separatorStyle}>
                    <TouchableOpacity style={expandBtnStyle} onPress={onExpand}>
                        <Text style={expandTextStyle}>
                            {state.expanded
                                ? expandCaptions[1]
                                : expandCaptions[0]}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

TagSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    maxHeight: PropTypes.number,
    tags: PropTypes.array.isRequired,
    expandCaptions: PropTypes.array,
    expdandedContainerStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    selectedTagStyle: Text.propTypes.style,
    tagStyle: Text.propTypes.style,
    separatorStyle: ViewPropTypes.style,
    expandBtnStyle: ViewPropTypes.style,
    expandTextStyle: Text.propTypes.style,
};

const styles = StyleSheet.create({
    btnText: {
        fontSize: 12,
        textAlign: 'right',
        padding: 0,
    },
    btnStyle: {
        height: 25,
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
    },
    showMore: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'grey',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
    containerExpanded: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        alignSelf: 'center',
        fontSize: 12,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        height: 32,
        margin: 2,
        backgroundColor: '#EBF1FD',
    },
    tagSelected: {
        alignSelf: 'center',
        fontSize: 12,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        height: 32,
        margin: 2,
        color: 'white',
        backgroundColor: '#6242f4',
    },
});

TagSelector.defaultProps = {
    expandCaptions: ['more', 'less'],
    expdandedContainerStyle: styles.containerExpanded,
    containerStyle: styles.container,
    selectedTagStyle: styles.tagSelected,
    tagStyle: styles.tag,
    separatorStyle: styles.showMore,
    expandBtnStyle: styles.btnStyle,
    expandTextStyle: styles.btnText,
    maxHeight: 0,
};

export default TagSelector;
