import React from 'react';

import Settings from './Settings';
import { FILTER } from '../constants/Filters';

const HomeHeader = () => {
    return(
        <Settings defaultFilter={FILTER.LAST_WEEK} />
    )
}

export default HomeHeader;