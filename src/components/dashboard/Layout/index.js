import React from 'react';

import AppHeader from './AppHeader';
import Sidebar from './AppSidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className='layout'>
            <Sidebar />
            <AppHeader />
            <div className='children'>{children}</div>
        </div>
    );
};

export default DashboardLayout;
