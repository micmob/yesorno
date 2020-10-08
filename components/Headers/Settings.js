import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import ModalIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import SmallText from '../UI/SmallText';
import { filterQuestions } from '../../store/actions/questions';
import { FILTER } from '../../constants/Filters';
import TouchMe from '../UI/TouchMe';

const Settings = props => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [sliderLabel, setSliderLabel] = useState(props.initialSliderLabel);
    const [sliderFinalValue, setSliderFinalValue] = useState(
        props.sliderInitialValue
    );

    const dispatch = useDispatch();

    const changeSliderLabel = label => {
        setSliderLabel(label);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleSlider = value => {
        if (value === 0) {
            changeSliderLabel('last 24 Hours');
        } else {
            if (value === 1) {
                changeSliderLabel('last week');
            } else {
                if (value === 2) {
                    changeSliderLabel('last month');
                } else {
                    if (value === 3) {
                        changeSliderLabel('last year');
                    } else {
                        changeSliderLabel('all time');
                    }
                }
            }
        }
    };

    const handleSlidingComplete = value => {
        setSliderFinalValue(value);
    };

    const handleCheckPress = () => {
        toggleModal();
        if (sliderFinalValue === 0) {
            dispatch(filterQuestions(FILTER.LAST_24_HOURS));
        } else {
            if (sliderFinalValue === 1) {
                dispatch(filterQuestions(FILTER.LAST_WEEK));
            } else {
                if (sliderFinalValue === 2) {
                    dispatch(filterQuestions(FILTER.LAST_MONTH));
                } else {
                    if (sliderFinalValue === 3) {
                        dispatch(filterQuestions(FILTER.LAST_YEAR));
                    } else {
                        dispatch(filterQuestions(FILTER.ALL_TIME));
                    }
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchMe type="medium" onPress={toggleModal}>
                <Icon
                    name="settings"
                    color={Colors.onSurfaceColor}
                    size={25}
                />
            </TouchMe>
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
                            onValueChange={value => {
                                handleSlider(value);
                            }}
                            onSlidingComplete={value => {
                                handleSlidingComplete(value);
                            }}
                            value={props.sliderInitialValue}
                            minimumValue={0}
                            maximumValue={4}
                            step={1}
                            thumbTintColor={Colors.brandColor}
                            minimumTrackTintColor={Colors.brandColor}
                            maximumTrackTintColor={Colors.onSurfaceColor}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchMe type="medium" onPress={toggleModal}>
                                <ModalIcon
                                    name="close"
                                    color={Colors.brandColor}
                                    size={25}
                                />
                            </TouchMe>
                            <TouchMe type="medium" onPress={handleCheckPress}>
                                <ModalIcon
                                    name="check"
                                    color={Colors.brandColor}
                                    size={25}
                                />
                            </TouchMe>
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
