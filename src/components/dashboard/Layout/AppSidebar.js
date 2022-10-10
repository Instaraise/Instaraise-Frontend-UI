import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import dark_comp_name from '../../../assets/images/dark_comp_name.svg';
import darkmodelogo from '../../../assets/images/darkmodelogo.png';
import dashboard from '../../../assets/images/dashboard.svg';
import dex from '../../../assets/images/dex.svg';
import farm from '../../../assets/images/farm.svg';
import instaLogo from '../../../assets/images/InstaLogo.svg';
import CompName from '../../../assets/images/Instaraise.svg';
import launchpad from '../../../assets/images/launchpad.svg';
import pool from '../../../assets/images/pool.svg';
import { ThemeContext } from '../../../routes/root';
// import { SOCIALS_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';
const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    const { theme } = React.useContext(ThemeContext);
    return (
        <div className={`sidebar ${isSidebarOpen}`}>
            {theme ? (
                <NavLink className='navbar-brand py-3 mx-3' to='/'>
                    <img
                        className='compLogo'
                        src={darkmodelogo}
                        alt='insta-logo-img'
                    />
                    <img
                        className='ml-2'
                        src={dark_comp_name}
                        alt='insta-img'
                    />
                </NavLink>
            ) : (
                <NavLink className='navbar-brand py-3 mx-3' to='/'>
                    <img
                        className='compLogo'
                        src={instaLogo}
                        alt='insta-logo-img'
                    />
                    <img className='ml-2' src={CompName} alt='insta-img' />
                </NavLink>
            )}

            <CloseIcon onClick={closeSidebar} />
            <div className='sidebar-content shadow-sm'>
                <ul className='nav nav-pills flex-column p-4'>
                    <li className='nav-item justify-content-center py-2'>
                        <NavLink
                            to='/dashboard'
                            className=' text-sm nav-link sidebar-links d-flex '
                            activeClassName='sidebar-links-active'
                            aria-current='page'
                        >
                            <div>
                                <div className='dashboard-color'>
                                    {' '}
                                    <img
                                        className='me-2'
                                        src={dashboard}
                                        alt='dashboard-img'
                                    />
                                    <span className=''>Dashboard</span>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <div className='nav-item justify-content-center py-2'>
                        <div className='accordion' id='accordion'>
                            <div className='accordion-item border-0 bg-transparent'>
                                <div
                                    className='px-0 accordion-header bg-transparent'
                                    id='sidebar'
                                >
                                    <NavLink
                                        to='/launchpad'
                                        className='accordion-button dashboard-color text-sm-2-2 nav-link sidebar-links d-flex  sidebar-links-active'
                                        // type="button"
                                        data-bs-toggle='collapse'
                                        data-bs-target='#sidebar2'
                                        aria-expanded='false'
                                        activeClassName='sidebar-links-active'
                                        aria-controls='sidebar2'
                                    >
                                        <img
                                            className='me-2'
                                            src={launchpad}
                                            alt='launchpad-img'
                                        />
                                        <span>Launchpad</span>
                                    </NavLink>
                                </div>
                                <div
                                    id='sidebar2'
                                    className='accordion-collapse collapse show'
                                    aria-labelledby='sidebar'
                                    data-bs-parent='#accordion'
                                >
                                    <div className='accordion-body'>
                                        <div className='d-flex justify-content-end '>
                                            <li
                                                className='nav-item  justify-content-center  w-100 ms-4 '
                                                style={{
                                                    borderLeft:
                                                        // #8a94a6
                                                        '2px solid rgb(157, 133, 188)',
                                                }}
                                            >
                                                <NavLink
                                                    to='/launchpad/projects'
                                                    className='ms-2  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Projects
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <NavLink
                                                    to='/launchpad/staking'
                                                    className=' ms-2  mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Staking
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <NavLink
                                                    to='/launchpad/tiers'
                                                    className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Tiers
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <Link
                                                    to='#'
                                                    onClick={() =>
                                                        window.open(
                                                            'https://forms.gle/KoR4ZftbjJyhUwCc8'
                                                        )
                                                    }
                                                    className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                    data-parent='#sidebar2'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Apply
                                                        </div>
                                                    </div>
                                                </Link>
                                                <NavLink
                                                    to='/launchpad/faq'
                                                    className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            FAQ
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <li className='nav-item justify-content-center py-2'>
                        <NavLink
                            to='/farms'
                            className=' text-sm nav-link sidebar-links d-flex '
                            activeClassName='sidebar-links-active'
                            aria-current='page'
                        >
                            <div className='dashboard-color'>
                                {' '}
                                <img
                                    className='me-2'
                                    src={farm}
                                    alt='farm-img'
                                />
                                <span className=''>Farms</span>
                            </div>
                        </NavLink>
                    </li>
                    <div className='nav-item justify-content-center py-2'>
                        <div className='accordion' id='accordion'>
                            <div className='accordion-item border-0 bg-transparent'>
                                <div
                                    className='px-0 accordion-header bg-transparent'
                                    id='sidebar'
                                >
                                    <NavLink
                                        to='/launchpad'
                                        className='accordion-button dashboard-color text-sm-2-2 nav-link sidebar-links d-flex  sidebar-links-active'
                                        // type="button"
                                        data-bs-toggle='collapse'
                                        data-bs-target='#sidebar2'
                                        aria-expanded='false'
                                        activeClassName='sidebar-links-active'
                                        aria-controls='sidebar2'
                                    >
                                        <img
                                            className='me-2'
                                            src={dex}
                                            alt='launchpad-img'
                                        />
                                        <span>Dex</span>
                                    </NavLink>
                                </div>
                                <div
                                    id='sidebar2'
                                    className='accordion-collapse collapse'
                                    aria-labelledby='sidebar'
                                    data-bs-parent='#accordion'
                                >
                                    <div className='accordion-body'>
                                        <div className='d-flex justify-content-end '>
                                            <li
                                                className='nav-item  justify-content-center  w-100 ms-4 '
                                                style={{
                                                    borderLeft:
                                                        '2px solid #8a94a6',
                                                }}
                                            >
                                                <NavLink
                                                    to='/launchpad/projects'
                                                    className='ms-2  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Projects
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <NavLink
                                                    to='/launchpad/staking'
                                                    className=' ms-2  mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Staking
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <NavLink
                                                    to='/launchpad/tiers'
                                                    className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Tiers
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <Link
                                                    to='#'
                                                    onClick={() =>
                                                        window.open(
                                                            'https://forms.gle/KoR4ZftbjJyhUwCc8'
                                                        )
                                                    }
                                                    className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                    data-parent='#sidebar2'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            Apply
                                                        </div>
                                                    </div>
                                                </Link>
                                                <NavLink
                                                    to='/launchpad/faq'
                                                    className='ms-2 mt-1  text-sm-2 nav-link sidebar-links d-flex '
                                                    activeClassName='sidebar-links-active'
                                                    aria-current='page'
                                                >
                                                    <div className=''>
                                                        <div className='transition-class'>
                                                            FAQ
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <li className='nav-item justify-content-center py-2'>
                        <NavLink
                            to='/portfolio'
                            className=' text-sm nav-link sidebar-links d-flex '
                            activeClassName='sidebar-links-active'
                            aria-current='page'
                        >
                            <div>
                                <div className='dashboard-color'>
                                    {' '}
                                    <img
                                        className='me-2'
                                        src={pool}
                                        alt='pool-img'
                                    />
                                    <span className=''>Portfolio</span>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                </ul>
                {/* <div className='ms-3'>
                    {SOCIALS_DATA.map((elem, index) => (
                        <Link
                            key={index}
                            to='/'
                            target='_blank'
                            onClick={() =>
                                window.open(elem.footer_social_link, '_blank')
                            }
                        >
                            <img
                                className='pr-2'
                                src={elem.footer_social_img}
                                alt='insta-social-img'
                            />
                        </Link>
                    ))}
                </div> */}
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
