import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import CreateCrowdSale from '../../components/Launchpad/CreateCrowdSale/CreateCrowdSale';
const CrowdSale = (props) => {
    return (
        <div>
            <AppLayout flag={props.flag}>
                <div>
                    <CreateCrowdSale />
                </div>
            </AppLayout>
        </div>
    );
};

export default CrowdSale;
