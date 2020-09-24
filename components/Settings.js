import React, { useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import Slider from 'react-native-slider';
import ModalIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import SmallText from './SmallText';
import { filterQuestions } from '../store/actions/questions';
import { FILTER } from '../constants/Filters';

const Settings = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [sliderLabel, setSliderLabel] = useState('last 24 Hours');
    const [sliderFinalValue, setSliderFinalValue] = useState(0);

    const dispatch = useDispatch();
    //dispatch(filterQuestions(props.defaultFilter));
    //TO DO: add default filter
    
    const changeSliderLabel = (label) => {
        setSliderLabel(label);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleSlider = (value) => {
        if (value === 0) {
            changeSliderLabel('last 24 Hours');
        } else {
            if (value === 1) {
                changeSliderLabel('last week');
            } else {
                if (value === 2) {
                    changeSliderLabel('last month');
                } else {
                    changeSliderLabel('last year');
                }
            }
        }
    };

    const handleSlidingComplete = (value) => {
        setSliderFinalValue(value);
    }

    const handleCheckPress = () => {
        toggleModal();
        if(sliderFinalValue === 0) {
            dispatch(filterQuestions(FILTER.LAST_24_HOURS));
        } else {
            if(sliderFinalValue === 1) {
                dispatch(filterQuestions(FILTER.LAST_WEEK));
            } else {
                if(sliderFinalValue === 1) {
                    dispatch(filterQuestions(FILTER.LAST_MONTH));
                } else {
                    dispatch(filterQuestions(FILTER.LAST_YEAR));
                }
            }
        }
    }

    const Button = (props) => {
        return (
            <TouchableNativeFeedback
                onPress={props.onPress}
                background={TouchableNativeFeedback.Ripple(
                    Colors.brandColor,
                    true
                )}
            >
                <View
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ModalIcon
                        name={props.iconName}
                        color={props.color}
                        size={25}
                    />
                </View>
            </TouchableNativeFeedback>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.touchableContainer}>
                <TouchableNativeFeedback
                    onPress={toggleModal}
                    background={TouchableNativeFeedback.Ripple(
                        Colors.brandColor,
                        true
                    )}
                >
                    <View style={styles.iconContainer}>
                        <Icon
                            name="settings"
                            color={Colors.onBackgroundColor}
                            size={25}
                        />
                    </View>
                </TouchableNativeFeedback>
            </View>
            <View>
                <Modal
                    isVisible={isModalVisible}
                    onBackButtonPress={toggleModal}
                    useNativeDriver={true}
                    animationIn="slideInDown"
                    animationOut="slideOutUp"
                    animationInTiming={200}
                    animationOutTiming={200}
                    style={styles.modal}
                    backdropOpacity={0.5}
                >
                    <View style={styles.insideModal}>
                        <View style={styles.labelContainer}>
                            <SmallText style={{ color: Colors.onSurfaceColor }}>
                                Results from{' '}
                            </SmallText>
                            <SmallText
                                style={[
                                    styles.text,
                                    { color: Colors.brandColor },
                                ]}
                            >
                                {sliderLabel}
                            </SmallText>
                        </View>
                        <Slider
                            onValueChange={(value) => {
                                handleSlider(value);
                            }}
                            onSlidingComplete={(value) => {
                                handleSlidingComplete(value);
                            }}
                            value={0}
                            minimumValue={0}
                            maximumValue={3}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            step={1}
                            animationType="spring"
                            thumbTintColor={Colors.brandColor}
                            minimumTrackTintColor={Colors.brandColor}
                            maximumTrackTintColor={Colors.onSurfaceColor}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                iconName="close"
                                onPress={toggleModal}
                                color={Colors.onSurfaceColor}
                            />
                            <Button
                                iconName="check"
                                onPress={handleCheckPress}
                                color={Colors.brandColor}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 5,
    },
    modal: {
        height: 500,
    },
    insideModal: {
        flex: 0,
        backgroundColor: Colors.surfaceColor,
        padding: 20,
        borderRadius: 20,
        elevation: 24,
    },
    card: {
        borderRadius: 20,
        backgroundColor: Colors.brandColor,
        margin: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.onSurfaceColor,
    },
    iconContainer: {
        borderRadius: 100,
    },
    touchableContainer: {
        borderRadius: 100,
        padding: 10,
    },
    labelContainer: {
        //paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 20,
    },
    buttonTouchableContainer: {
        borderRadius: 100,
    },
});

export default Settings;
