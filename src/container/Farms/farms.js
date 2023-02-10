import React from 'react';

import AppLayout from '../../components/dashboard/Layout/index';
import FarmCard from '../../components/Farm/FarmCard';
import { FARMS_CONFIG } from '../../config/FarmsConfig/farms.config';
const Farms = (props) => {
    return (
        <div>
            <AppLayout flag={props.flag}>
                <div>
                    <div className='row row-cols-1 text-dark-to-light project-layout my-3 my-lg-0 my-md-0 mx-0 mx-lg-3 mx-md-3 text-sm-start'>
                        <div className='d-flex bg-red flex-column flex-lg-row text-lg-start justify-content-between align-items-center p-0'>
                            <div className='col'>
                                <h4 className='fw-600 '>Farms</h4>
                                <h6 className='fw-normal '>
                                    Stake LP tokens to earn{' '}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 mb-5 mb-lg-0 mb-md-0 row p-0 row-cols-1 row-cols-xxl-3 gx-5 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 project-layout mx-0 mx-lg-3 mx-md-3'>
                        {FARMS_CONFIG.map((item, index) => (
                            <FarmCard
                                key={index}
                                {...props}
                                projectdata={item}
                                index={true}
                            />
                        ))}
                    </div>
                </div>
            </AppLayout>
        </div>
    );
};
export default Farms;
