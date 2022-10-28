import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import Swap_Dex from '../../components/Dex/Swap';
const Swap = () => {
    return (
        <AppLayout>
            <div className=''>
                <Swap_Dex />
            </div>
        </AppLayout>
    );
};
export default Swap;
