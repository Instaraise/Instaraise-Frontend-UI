import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import Faucet from '../../components/Dex/Faucet/faucet';
const FaucetLayout = () => {
    return (
        <div>
            <AppLayout>
                <Faucet />
            </AppLayout>
        </div>
    );
};
export default FaucetLayout;
