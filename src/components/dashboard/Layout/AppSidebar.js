import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

import dark_comp_name from '../../../assets/images/dark_comp_name.svg';
import darkmodelogo from '../../../assets/images/darkmodelogo.png';
import dashboard from '../../../assets/images/dashboard.svg';
import dashboard_dark from '../../../assets/images/dashboard_dark.svg';
import dex from '../../../assets/images/dex.svg';
import dex_dark from '../../../assets/images/dex_dark.svg';
import farm from '../../../assets/images/farm.svg';
import farm_dark from '../../../assets/images/farm_dark.svg';
import instaLogo from '../../../assets/images/InstaLogo.svg';
import CompName from '../../../assets/images/Instaraise.svg';
import launchpad from '../../../assets/images/launchpad.svg';
import launchpad_dark from '../../../assets/images/launchpad_dark.svg';
import pool from '../../../assets/images/pool.svg';
import pool_dark from '../../../assets/images/pool_dark.svg';
import telegramLogoDashboard from '../../../assets/images/socials/Telegram_dashboard.svg';
import { SOCIALS_DATA_DASHBOARD } from '../../../config/HomeConfig/FooterConfig/config.footer';
import { ThemeContext } from '../../../routes/root';
const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    const { theme } = React.useContext(ThemeContext);
    const sidebarRef = useRef();
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            closeSidebar();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div ref={sidebarRef} className={`sidebar ${isSidebarOpen}`}>
            <div className='d-flex mr-5 mr-md-5 mr-lg-0 pt-2 pt-md-4 pt-lg-0'>
                {/* d-flex mr-5 mr-md-0 mr-lg-0 */}
                <CloseIcon onClick={closeSidebar} theme={theme} />
                <NavLink className='navbar-brand py-3 mx-3' to='/'>
                    <img
                        className='compLogo'
                        src={theme ? darkmodelogo : instaLogo}
                        alt='insta-logo-img'
                    />
                    <img
                        className='ml-2'
                        src={theme ? dark_comp_name : CompName}
                        alt='insta-img'
                    />
                </NavLink>
            </div>
            <div className='sidebar-content shadow-sm'>
                <ul className='nav nav-pills flex-column py-4 px-3'>
                    <li className='nav-item justify-content-center pt-2 w-100'>
                        <NavLink
                            to='/dashboard'
                            className=' text-sm nav-link sidebar-links d-flex '
                            activeclassname='sidebar-links-active'
                            aria-current='page'
                        >
                            <div>
                                <div className='dashboard-color'>
                                    <img
                                        className='me-2'
                                        src={theme ? dashboard : dashboard_dark}
                                        alt='dashboard-img'
                                        style={{
                                            width: '1.3em',
                                            height: '1.3em',
                                        }}
                                    />
                                    <span className=''>Dashboard</span>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <div className='accordion w-100' id='accordionExample'>
                        <div className='accordion-item border-0 bg-transparent nav-item justify-content-center pt-2'>
                            <div
                                className='px-0 accordion-header bg-transparent'
                                id='launchpad_id'
                            >
                                <NavLink
                                    to='/launchpad'
                                    className='accordion-button dashboard-color text-sm-2-2 nav-link sidebar-links d-flex  sidebar-links-active collapsed'
                                    data-bs-toggle='collapse'
                                    data-bs-target='#collapseOne'
                                    aria-expanded='true'
                                    activeclassname='sidebar-links-active'
                                    aria-controls='collapseOne'
                                >
                                    <img
                                        className='me-2'
                                        src={theme ? launchpad : launchpad_dark}
                                        alt='launchpad-img'
                                        style={{
                                            width: '1.3em',
                                            height: '1.3em',
                                        }}
                                    />

                                    <span>Launchpad</span>
                                </NavLink>
                            </div>
                            <div
                                id='collapseOne'
                                className={`accordion-collapse collapse ${
                                    [
                                        'IDO',
                                        'create-crowdsale',
                                        'staking',
                                        undefined,
                                    ].includes(
                                        window.location.pathname.split('/')[2]
                                    )
                                        ? 'show'
                                        : 'collapse'
                                }`}
                                aria-labelledby='launchpad_id'
                                data-bs-parent='#accordionExample'
                            >
                                <div className='accordion-body'>
                                    <div className='d-flex justify-content-end '>
                                        <li
                                            className='nav-item  justify-content-center  w-100'
                                            style={{
                                                borderLeft: '2px solid #8a94a6',
                                                marginLeft: '27px',
                                            }}
                                        >
                                            <NavLink
                                                to='/launchpad/IDO'
                                                className='ms-2 mb-1 text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        IDO
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <Link
                                                to='#'
                                                aria-disabled={true}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                                className='ms-2  text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className='d-flex justify-center align-items-center'>
                                                    <div className='transition-class'>
                                                        Crowdsale
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: 9,
                                                            marginLeft: 5,
                                                            border: '2px solid #d4d9db',
                                                            borderRadius:
                                                                '20px',
                                                            paddingLeft: 6,
                                                            paddingRight: 6,
                                                            paddingTop: 4,
                                                            paddingBottom: 4,
                                                        }}
                                                    >
                                                        Coming&nbsp;soon
                                                    </div>
                                                </div>
                                            </Link>
                                            <NavLink
                                                to='/launchpad/staking'
                                                className=' ms-2  mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Staking
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <li className='nav-item justify-content-center pt-2'>
                            <NavLink
                                to='/farms'
                                className=' text-sm nav-link sidebar-links d-flex '
                                aria-current='page'
                            >
                                <div className='dashboard-color'>
                                    <img
                                        className='me-2'
                                        src={theme ? farm : farm_dark}
                                        alt='farm-img'
                                        style={{
                                            width: '1.3em',
                                            height: '1.3em',
                                        }}
                                    />

                                    <span className=''>Farms</span>
                                </div>
                            </NavLink>
                        </li>

                        <div className='accordion-item border-0 bg-transparent nav-item justify-content-center pt-2'>
                            <div
                                className='px-0 accordion-header bg-transparent'
                                id='dex_id'
                            >
                                <NavLink
                                    to='/dex'
                                    className='accordion-button collapsed dashboard-color text-sm-2-2 nav-link sidebar-links d-flex sidebar-links-active'
                                    data-bs-toggle='collapse'
                                    data-bs-target='#collapseTwo'
                                    aria-expanded='false'
                                    activeclassname='sidebar-links-active'
                                    aria-controls='collapseTwo'
                                >
                                    <img
                                        className='me-2'
                                        src={theme ? dex : dex_dark}
                                        alt='dex-img'
                                        style={{
                                            width: '1.3em',
                                            height: '1.3em',
                                        }}
                                    />

                                    <div className='d-flex align-items-center justify-center'>
                                        <div
                                            className='dashboard-color'
                                            style={{
                                                fontSize: '15px',
                                                color: '#4e5d78',
                                            }}
                                        >
                                            <span>Trade</span>
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 12,
                                                marginLeft: 5,
                                                border: '2px solid #d4d9db',
                                                borderRadius: '20px',
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                paddingTop: 4,
                                                paddingBottom: 4,
                                            }}
                                        >
                                            Testnet
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div
                                id='collapseTwo'
                                className={`accordion-collapse  bg-transparent ${
                                    [
                                        'IDO',
                                        'create-crowdsale',
                                        'staking',
                                        undefined,
                                    ].includes(
                                        window.location.pathname.split('/')[2]
                                    )
                                        ? 'collapse'
                                        : 'show'
                                }`}
                                aria-labelledby='dex_id'
                                data-bs-parent='#accordionExample'
                            >
                                <div className='accordion-body'>
                                    <div className='d-flex justify-content-end '>
                                        <li
                                            className='nav-item  justify-content-center  w-100'
                                            style={{
                                                borderLeft: '2px solid #8a94a6',
                                                marginLeft: '27px',
                                            }}
                                        >
                                            <NavLink
                                                to='/dex/swap'
                                                className='ms-2  text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Swap
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink
                                                to='/dex/trade'
                                                className=' ms-2  mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                activeclassname='sidebar-links-active'
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Tokens
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink
                                                to='/dex/liquidity'
                                                className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                activeclassname='sidebar-links-active'
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Liquidity
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink
                                                to='/dex/faucet'
                                                className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                activeclassname='sidebar-links-active'
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Faucet
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <Link
                                                to='#'
                                                onClick={() =>
                                                    window.open(
                                                        'https://docs.instaraise.io/'
                                                    )
                                                }
                                                className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                activeclassname='sidebar-links-active'
                                                aria-current='page'
                                                data-parent='#sidebar2'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Docs
                                                        <svg
                                                            className='ml-1'
                                                            stroke='currentColor'
                                                            fill='currentColor'
                                                            strokeWidth='0'
                                                            viewBox='0 0 24 24'
                                                            height='1em'
                                                            width='1em'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                        >
                                                            <path d='m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z'></path>
                                                            <path d='M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z'></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <li className='nav-item justify-content-center pt-2'>
                            <NavLink
                                to='/portfolio'
                                className=' text-sm nav-link sidebar-links d-flex '
                                aria-current='page'
                            >
                                <div>
                                    <div className='dashboard-color'>
                                        {' '}
                                        <img
                                            className='me-2'
                                            src={theme ? pool : pool_dark}
                                            alt='pool-img'
                                            style={{
                                                width: '1.3em',
                                                height: '1.3em',
                                            }}
                                        />
                                        <span className=''>Portfolio</span>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                    </div>
                </ul>
                <div className='nav-bottom ms-3 d-flex align-items-end pl-5'>
                    <Link
                        className='ms-3'
                        to='/'
                        target='_blank'
                        onClick={() =>
                            window.open(
                                'https://telegram.me/Instaraise',
                                '_blank'
                            )
                        }
                    >
                        <img
                            className={theme ? 'sidebar-filter-socials' : null}
                            height='28'
                            src={telegramLogoDashboard}
                            alt='social-img'
                        />
                    </Link>
                    {SOCIALS_DATA_DASHBOARD.map((elem, index) => (
                        <React.Fragment key={index}>
                            <Link
                                className='ms-3'
                                to='/'
                                target='_blank'
                                onClick={() =>
                                    window.open(
                                        elem.footer_social_link,
                                        '_blank'
                                    )
                                }
                            >
                                <img
                                    className={
                                        theme ? 'sidebar-filter-socials' : null
                                    }
                                    src={elem.footer_social_img}
                                    alt='social-img'
                                />
                            </Link>
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

export const CloseIcon = ({ onClick, theme }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill={theme ? '#4E5D78' : '#FFFFFF'}
            className='bi bi-x closeIcon mt-3 me-2'
            viewBox='0 0 16 16'
            role={'button'}
            onClick={() => onClick()}
        >
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
        </svg>
    );
};
