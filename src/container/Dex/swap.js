import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import Swap_Dex from '../../components/Dex/Swap';
const Swap = (props) => {
    return (
        <AppLayout>
            <div className=''>
                <Swap_Dex
                    showAnalytics={props.showAnalytics}
                    setShowAnalytics={props.setShowAnalytics}
                />
            </div>
        </AppLayout>
    );
};
export default Swap;
