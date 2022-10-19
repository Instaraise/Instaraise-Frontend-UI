import React from 'react';
import { connect } from 'react-redux';
import truncateMiddle from 'truncate-middle';

import light_wallet_img from '../../../assets/images/connect_wallet.svg';
import dark_mode_img from '../../../assets/images/dark_mode_img.svg';
import dark_plus_sign from '../../../assets/images/dark_plus_sign.svg';
import dark_wallet_img from '../../../assets/images/dark_wallet.svg';
import plusSign from '../../../assets/images/plus-sign.svg';
import light_mode_img from '../../../assets/images/sun_img.svg';
import {
    connectWallet,
    getWallet,
} from '../../../redux/actions/wallet/action.wallet';
import { ThemeContext } from '../../../routes/root';
const AppHeader = (props) => {
    const { connectWallet, openSidebar, getWallet, wallet } = props;
    const { theme, handleThemeChange } = React.useContext(ThemeContext);
    React.useEffect(() => {
        getWallet();

        // eslint-disable-next-line
    }, []);
    return (
        <div className=''>
            <nav className='app-header navbar navbar-expand-lg d-flex justify-content-lg-end justify-content-sm-between justify-content-md-between mr-3'>
                <HamIcon onClick={openSidebar} />
                <div className='d-block d-md-flex d-lg-flex d-flex'>
                    <img
                        className='mr-4 cursor-pointer'
                        src={theme ? dark_mode_img : light_mode_img}
                        onClick={() => handleThemeChange()}
                    />

                    <div
                        className='d-none d-lg-block btn bg-light-secondary border-10 text-dark-to-light fw-bold'
                        onClick={() => connectWallet()}
                    >
                        {!wallet ? (
                            <>
                                <img
                                    className='mr-3'
                                    src={theme ? plusSign : dark_plus_sign}
                                />
                                <span
                                    className='me-2'
                                    onClick={() => connectWallet()}
                                >
                                    Connect wallet
                                </span>
                            </>
                        ) : (
                            <span className='me-2 fw-bolder'>
                                {truncateMiddle(wallet, 4, 4, '...')}
                            </span>
                        )}
                    </div>
                    <div className='d-lg-none' onClick={() => connectWallet()}>
                        {theme ? (
                            <img
                                src={light_wallet_img}
                                alt='ligh-mode-wallet-img'
                            />
                        ) : (
                            <img
                                src={dark_wallet_img}
                                alt='dark-mode-wallet-img'
                            />
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    connectWallet: (payload) => dispatch(connectWallet(payload)),
    getWallet: (payload) => dispatch(getWallet(payload)),
});

const mapStateToProps = (state) => ({
    wallet: state.wallet,
});
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);

export const HamIcon = ({ onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-list hamburger nav-svg-color ml-2'
            viewBox='0 0 16 16'
            role={'button'}
            onClick={() => onClick()}
        >
            <path d='M2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z'></path>
        </svg>
    );
};
