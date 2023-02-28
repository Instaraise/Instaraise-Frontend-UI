import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import Faucet from '../../components/Dex/Faucet/faucet';
const FaucetLayout = (props) => {
    return (
        <div>
            <AppLayout flag={props.flag}>
                <div>
                    <Faucet />
                </div>
            </AppLayout>
        </div>
    );
};

export default FaucetLayout;
