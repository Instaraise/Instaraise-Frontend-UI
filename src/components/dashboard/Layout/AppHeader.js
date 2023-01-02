// eslint-disable-next-line
import React, { useRef } from 'react';

import { connect } from 'react-redux';
import truncateMiddle from 'truncate-middle';

import copy from 'copy-to-clipboard';
import Fade from '@mui/material/Fade';
import { IoEllipsisVertical, IoSettingsSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import { BsBoxArrowInUpRight, BsFiles } from 'react-icons/bs';
import light_wallet_img from '../../../assets/images/connect_wallet.svg';
import dark_mode_img from '../../../assets/images/dark_mode_img.svg';
import dark_plus_sign from '../../../assets/images/dark_plus_sign.svg';
import dark_wallet_img from '../../../assets/images/dark_wallet.svg';
import plusSign from '../../../assets/images/plus-sign.svg';
import light_mode_img from '../../../assets/images/sun_img.svg';
import {
    connectWallet,
    disconnectWallet,
    getWallet,
} from '../../../redux/actions/wallet/action.wallet';
import { ThemeContext } from '../../../routes/root';
const AppHeader = (props) => {
    const { connectWallet, disconnectWallet, openSidebar, getWallet, wallet } =
        props;
    const [openAccountModal, setOpenAccountModal] = React.useState(false);
    const { theme, handleThemeChange } = React.useContext(ThemeContext);
    const [copySuccess, SetCopySuccess] = React.useState(false);
    const location = useLocation();
    const ref = useRef();
    const isTestnet = location.pathname.includes('dex')
        ? location.pathname.includes('dex')
        : location.pathname.includes('portfolio');

    React.useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                openAccountModal &&
                ref.current &&
                !e.target.classList.contains('menu-icon') &&
                !ref.current.contains(e.target)
            ) {
                setOpenAccountModal(!openAccountModal);
            }
        };
        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [openAccountModal]);
    const CopyText = () => {
        copy(wallet);
        SetCopySuccess(true);
        setTimeout(() => {
            SetCopySuccess(false);
        }, 30000);
    };
    React.useEffect(() => {
        if (!location.pathname.includes('dashboard')) {
            getWallet({
                NETWORK: isTestnet ? 'testnet' : 'mainnet',
            });
        } else {
            getWallet({
                NETWORK: 'mainnet',
            });
        }
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
                        className='d-none d-lg-block btn bg-light-secondary border-10 text-dark-to-light fw-bold menu-icon'
                        onClick={() => {
                            !wallet
                                ? connectWallet({
                                      NETWORK: isTestnet
                                          ? 'testnet'
                                          : 'mainnet',
                                  })
                                : setOpenAccountModal(!openAccountModal);
                        }}
                    >
                        {!wallet ? (
                            <>
                                <img
                                    className='mr-3'
                                    src={theme ? plusSign : dark_plus_sign}
                                />
                                <span className='me-2'>Connect wallet</span>
                            </>
                        ) : (
                            <>
                                <span className='me-2 fw-bolder menu-icon'>
                                    {truncateMiddle(wallet, 4, 4, '...')}
                                </span>
                                <span className='menu-icon cursor-pointer menu-icon'>
                                    <IoSettingsSharp className='menu-icon' />
                                </span>
                            </>
                        )}
                    </div>

                    {/* for mobile views */}
                    <div
                        className='d-lg-none'
                        onClick={() =>
                            connectWallet({
                                NETWORK: isTestnet ? 'testnet' : 'mainnet',
                            })
                        }
                    >
                        {!wallet ? (
                            theme ? (
                                <img
                                    src={light_wallet_img}
                                    alt='ligh-mode-wallet-img'
                                />
                            ) : (
                                <img
                                    src={dark_wallet_img}
                                    alt='dark-mode-wallet-img'
                                />
                            )
                        ) : (
                            <span className='cursor-pointer text-dark-to-light'>
                                <span
                                    className='menu-icon cursor-pointer hide-navbar text-dark-to-light material-icons'
                                    onClick={() => {
                                        setOpenAccountModal(!openAccountModal);
                                    }}
                                >
                                    <IoEllipsisVertical className='menu-icon' />
                                </span>
                            </span>
                        )}
                    </div>
                    <Fade appear={true} ref={ref} in={openAccountModal}>
                        <div
                            style={{
                                width: '250px',
                            }}
                            className='text-dark-to-light extra-div p-3 fade-in position-absolute me-2 border-10 shadow-sm token-information'
                        >
                            <div className='d-flex justify-content-between align-items-center text-dark-to-light'>
                                <h6>Account</h6>
                                <span
                                    data-for='custom-color-no-arrow'
                                    data-tip='Disconnect wallet'
                                    className='cursor-pointer'
                                >
                                    <FaPowerOff
                                        onClick={() => {
                                            disconnectWallet({
                                                NETWORK: isTestnet
                                                    ? 'testnet'
                                                    : 'mainnet',
                                            });
                                            setOpenAccountModal(false);
                                        }}
                                    />
                                </span>
                            </div>
                            <div className='mt-1 d-flex justify-content-start align-items-center'>
                                <div>
                                    <div className='d-flex justify-content-start align-items-center'>
                                        <div
                                            className=' text-14 cursor-pointer'
                                            id='wallet-address'
                                        >
                                            {truncateMiddle(
                                                wallet,
                                                4,
                                                4,
                                                '...'
                                            )}
                                        </div>

                                        <BsBoxArrowInUpRight
                                            className='text-sm router-l ms-2 me-2'
                                            role={'button'}
                                            onClick={() => {
                                                window.open(
                                                    `https://tzkt.io/${wallet}`
                                                );
                                            }}
                                        />

                                        <BsFiles
                                            role={'button'}
                                            className='text-sm text-dark-to-light'
                                            onClick={() => CopyText()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                {copySuccess ? (
                                    <p className='address-copied'>
                                        Wallet address copied to clipboard!
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>
                            <hr className='' />
                            <div className='text-14 text-dark-to-light fw-normal mb-1'>
                                Buy INSTA
                            </div>
                            <ul className='px-2'>
                                <li className='list-style-none'>
                                    {/* <img
                                        src={Quipu}
                                        width={30}
                                        height={30}
                                        className='gray-scale'
                                    /> */}
                                    <Link
                                        to='#'
                                        onClick={() =>
                                            window.open(
                                                'https://quipuswap.com/swap?to=KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ_0&from=tez'
                                            )
                                        }
                                        className='router-l ms-2 text-14'
                                    >
                                        Quipuswap&nbsp;
                                        <BsBoxArrowInUpRight />
                                    </Link>
                                </li>
                                <li className='list-style-none '>
                                    {/* <img
                                        src={Mexc}
                                        width={30}
                                        height={30}
                                        className='gray-scale'
                                    /> */}
                                    <Link
                                        to='#'
                                        onClick={() =>
                                            window.open(
                                                'https://www.mexc.com/exchange/INSTA_USDT'
                                            )
                                        }
                                        className='router-l ms-2 text-14'
                                    >
                                        Mexc&nbsp;
                                        <BsBoxArrowInUpRight />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Fade>
                </div>
            </nav>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    connectWallet: (payload) => dispatch(connectWallet(payload)),
    getWallet: (payload) => dispatch(getWallet(payload)),
    disconnectWallet: (payload) => dispatch(disconnectWallet(payload)),
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
