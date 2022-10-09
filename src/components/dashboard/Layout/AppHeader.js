import React from 'react';

import dark_mode_img from '../../../assets/images/dark_mode_img.svg';
import plusSign from '../../../assets/images/plus-sign.svg';
const AppHeader = ({ openSidebar }) => {
    return (
        <div className='app-header'>
            <div className='d-flex justify-content-md-end justify-content-sm-between pt-3'>
                <HamIcon onClick={openSidebar} />
                <div className='d-block d-md-flex d-lg-flex'>
                    <img className='mr-4' src={dark_mode_img} />
                    <div className='btn shadow-none bg-light-secondary border-10 text-dark-to-light fw-bold'>
                        <img className='mr-3' src={plusSign} />
                        <span className='me-2'>Connect wallet</span>
                    </div>
                </div>
            </div>
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
