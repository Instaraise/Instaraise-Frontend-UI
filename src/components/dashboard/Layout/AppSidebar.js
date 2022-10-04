import React from 'react';

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    return (
        <div className={`sidebar ${isSidebarOpen}`}>
            <CloseIcon onClick={closeSidebar} />
            <div className='sidebar-content shadow-sm'>s</div>
        </div>
    );
};

export default Sidebar;

export const CloseIcon = ({ onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='#4F5E78'
            className='bi bi-x closeIcon mt-3 me-2'
            viewBox='0 0 16 16'
            role={'button'}
            onClick={() => onClick()}
        >
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
        </svg>
    );
};
