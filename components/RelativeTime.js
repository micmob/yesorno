import React from 'react';
import SmallText from './SmallText';

const RelativeTime = (props) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = props.current - props.previous;

    if (elapsed < msPerMinute) {
        return (
            <SmallText>Now</SmallText>
        );
    } else if (elapsed < msPerHour) {
        return (
            <SmallText>
                {Math.round(elapsed / msPerMinute)}m ago
            </SmallText>
        );
    } else if (elapsed < msPerDay) {
        return (
            <SmallText>
                {Math.round(elapsed / msPerHour)}h ago
            </SmallText>
        );
    } else if (elapsed < msPerMonth) {
        return (
            <SmallText>
                {Math.round(elapsed / msPerDay)}d ago
            </SmallText>
        );
    } else if (elapsed < msPerYear) {
        return (
            <SmallText>
                {Math.round(elapsed / msPerMonth)}mo ago
            </SmallText>
        );
    } else {
        return (
            <SmallText>
                {Math.round(elapsed / msPerYear)}y ago
            </SmallText>
        );
    }
};

export default RelativeTime;
