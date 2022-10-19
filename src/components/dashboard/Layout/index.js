import React, { useState } from 'react';

import AppHeader from './AppHeader';
import Sidebar from './AppSidebar';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarPosition] = useState('is_sidebar_close');
    return (
        <div className='layout'>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                closeSidebar={() => setSidebarPosition('is_sidebar_close')}
            />

            <AppHeader
                openSidebar={() => setSidebarPosition('is_sidebar_open')}
            />
            <div className='children'>
                <div className='content-card px-4'>{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
