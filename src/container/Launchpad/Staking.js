import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import ActiveStaking from '../../components/Launchpad/Staking/ActiveStaking';
const Staking = (props) => {
    return (
        <AppLayout flag={props.flag}>
            <div className='mx-2'>
                <h4 className='fw-600 mt-5 mx-lg-3 mx-0 text-dark-to-light text-center text-lg-start'>
                    IDO Staking
                </h4>
                <h6 className='fw-normal mb-3 mx-lg-3 mx-0 text-dark-to-light text-center text-lg-start'>
                    Stake your INSTA tokens for allocation
                </h6>
                <div className='mt-2 mt-lg-5'>
                    <ActiveStaking />
                </div>
            </div>
        </AppLayout>
    );
};

export default Staking;
