import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import LiquidityPositionTable from '../../components/Dex/ManageLiquidity/LiquidityPositionTable';
const Portfolio = () => {
    return (
        <div>
            <AppLayout>
                <div>
                    <LiquidityPositionTable />
                </div>
            </AppLayout>
        </div>
    );
};
export default Portfolio;
