import React from 'react';

import DashboardLayout from '../../components/dashboard/Layout';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className='d-flex justify-content-between  flex-lg-row flex-column h-100 w-100 align-items-start'>
                <div className='w-100 '>
                    <div className='card_i shadow-sm '>s</div>
                    <div className='card_i shadow-sm  mt-3'>s</div>
                </div>
                <div className='card_i shadow-sm ms-lg-4 mt-3 mt-lg-0 w-30 h-95'>
                    s
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
