import React from 'react';

const AppHeader = ({ openSidebar }) => {
    return (
        <div className='d-flex justify-content-between align-items-center app-header'>
            <HamIcon onClick={openSidebar} />
        </div>
    );
};

export default AppHeader;

export const HamIcon = ({ onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='#4F5E78'
            className='bi bi-list hamburger'
            viewBox='0 0 16 16'
            role={'button'}
            onClick={() => onClick()}
        >
            <path
                fillRule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
            />
        </svg>
    );
};
