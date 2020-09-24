import React from 'react';
import Settings from './Settings';
import { FILTER } from '../constants/Filters';

const HotHeader = () => {
    return(
        <Settings defaultFilter={FILTER.LAST_24_HOURS} />
    )
}

export default HotHeader;