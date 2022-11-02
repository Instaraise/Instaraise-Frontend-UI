import React from 'react';
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
import { ThemeContext } from '../../../routes/root';
const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    const { theme } = React.useContext(ThemeContext);
    return (
        <div className={`sidebar ${isSidebarOpen}`}>
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

            <CloseIcon onClick={closeSidebar} />
            <div className='sidebar-content shadow-sm'>
                <ul className='nav nav-pills flex-column p-4'>
                    <li className='nav-item justify-content-center pt-2'>
                        <NavLink
                            to='/dashboard'
                            className=' text-sm nav-link sidebar-links d-flex '
                            activeClassName='sidebar-links-active'
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
                    <div className='accordion' id='accordionExample'>
                        <div className='accordion-item border-0 bg-transparent nav-item justify-content-center pt-2'>
                            <div
                                className='px-0 accordion-header bg-transparent'
                                id='headingOne'
                            >
                                <NavLink
                                    to='/launchpad'
                                    className='accordion-button dashboard-color text-sm-2-2 nav-link sidebar-links d-flex  sidebar-links-active collapsed'
                                    // type="button"
                                    data-bs-toggle='collapse'
                                    data-bs-target='#collapseOne'
                                    aria-expanded='true'
                                    activeClassName='sidebar-links-active'
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
                                        'projects',
                                        'staking',
                                        'tiers',
                                        'faq',
                                    ].includes(
                                        window.location.pathname.split('/')[2]
                                    )
                                        ? 'show'
                                        : ''
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
                                            <a
                                                className='ms-2  text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Projects
                                                    </div>
                                                </div>
                                            </a>
                                            <a
                                                className=' ms-2  mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Staking
                                                    </div>
                                                </div>
                                            </a>
                                            <a
                                                className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Tiers
                                                    </div>
                                                </div>
                                            </a>
                                            <a
                                                className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        FAQ
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <li className='nav-item justify-content-center pt-2'>
                            {/* <NavLink
                                to='/farms'
                                className=' text-sm nav-link sidebar-links d-flex '
                                activeClassName='sidebar-links-active'
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
                            </NavLink> */}
                            <a
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
                            </a>
                        </li>

                        <div className='accordion-item border-0 bg-transparent nav-item justify-content-center pt-2'>
                            <div
                                className='px-0 accordion-header bg-transparent'
                                id='headingTwo'
                            >
                                <NavLink
                                    to='/launchpad'
                                    className='accordion-button collapsed dashboard-color text-sm-2-2 nav-link sidebar-links d-flex  sidebar-links-active'
                                    // type="button"
                                    data-bs-toggle='collapse'
                                    data-bs-target='#collapseTwo'
                                    aria-expanded='false'
                                    activeClassName='sidebar-links-active'
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

                                    <span>Dex</span>
                                </NavLink>
                            </div>
                            <div
                                id='collapseTwo'
                                className={`accordion-collapse  bg-transparent ${
                                    [
                                        'projects',
                                        'staking',
                                        'tiers',
                                        'faq',
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
                                                activeClassName='sidebar-links-active'
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
                                                activeClassName='sidebar-links-active'
                                                aria-current='page'
                                            >
                                                <div className=''>
                                                    <div className='transition-class'>
                                                        Liquidity
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
                                                activeClassName='sidebar-links-active'
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
            </div>
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
