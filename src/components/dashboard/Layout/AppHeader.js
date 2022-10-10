import React from 'react';

import light_wallet_img from '../../../assets/images/connect_wallet.svg';
import dark_mode_img from '../../../assets/images/dark_mode_img.svg';
import dark_wallet_img from '../../../assets/images/dark_wallet.svg';
import plusSign from '../../../assets/images/plus-sign.svg';
import light_mode_img from '../../../assets/images/sun_img.svg';
import { ThemeContext } from '../../../routes/root';
const AppHeader = ({ openSidebar }) => {
    const { theme, handleThemeChange } = React.useContext(ThemeContext);
    return (
        <nav className='app-header navbar navbar-expand-lg d-flex justify-content-md-end justify-content-sm-between mr-3'>
            <HamIcon onClick={openSidebar} />
            <div className='d-block d-md-flex d-lg-flex d-flex'>
                {theme ? (
                    <img
                        className='mr-4 cursor-pointer'
                        src={dark_mode_img}
                        onClick={() => handleThemeChange()}
                    />
                ) : (
                    <img
                        className='mr-4 cursor-pointer'
                        src={light_mode_img}
                        onClick={() => handleThemeChange()}
                    />
                )}

                <div className='d-none d-lg-block btn shadow-none bg-light-secondary border-10 text-dark-to-light fw-bold'>
                    <img className='mr-3' src={plusSign} />
                    <span className='me-2'>Connect wallet</span>
                </div>
                <div className='d-lg-none'>
                    {theme ? (
                        <img
                            src={light_wallet_img}
                            alt='ligh-mode-wallet-img'
                        />
                    ) : (
                        <img src={dark_wallet_img} alt='dark-mode-wallet-img' />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AppHeader;

export const HamIcon = ({ onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='#4F5E78'
            className='bi bi-list hamburger'
            viewBox='0 0 16 16'
            role={'button'}
            onClick={() => onClick()}
        >
            <path d='M2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z'></path>
        </svg>
    );
};
