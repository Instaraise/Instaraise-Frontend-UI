import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import { IdoSale } from '../../components/Launchpad/Ido/IdoSale';
const Ido = (props) => {
    return (
        <div>
            <AppLayout flag={props.flag}>
                <div>
                    <IdoSale />
                </div>
            </AppLayout>
        </div>
    );
};

export default Ido;
