import React from 'react';

import Settings from './Settings';
import { FILTER } from '../../constants/Filters';

const HomeHeader = () => {
    return (
        <Settings
            defaultFilter={FILTER.LAST_WEEK}
            sliderInitialValue={1}
            initialSliderLabel={'last week'}
        />
    );
};

export default HomeHeader;
