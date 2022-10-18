import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import Liquidity from '../../components/Dex/Liquidity/liquidity';
const LiquidityLayout = () => {
    return (
        <div>
            <AppLayout>
                <div className=''>
                    <Liquidity />
                </div>
            </AppLayout>
        </div>
    );
};
export default LiquidityLayout;
