import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

import dark_comp_name from '../../../assets/images/dark_comp_name.svg';
import dark_mode_img from '../../../assets/images/dark_mode_img.svg';
import darkModeImg from '../../../assets/images/darkModeImg.svg';
import darkmodelogo from '../../../assets/images/darkmodelogo.png';
import instaLogo from '../../../assets/images/InstaLogo.svg';
import CompName from '../../../assets/images/Instaraise.svg';
import light_mode_img from '../../../assets/images/sun_img.svg';
import { HEADER_SOCIAL_IMAGE } from '../../../config/HomeConfig/HeaderConfig/config.header';
import { HEADER_SOCIAL_IMAGE2 } from '../../../config/HomeConfig/HeaderConfig/config.header';
import { HEADER_DATA } from '../../../config/HomeConfig/HeaderConfig/config.header';
import { ThemeContext } from '../../../routes/root';

const Header = ({ except }) => {
    const { theme, handleThemeChange } = React.useContext(ThemeContext);
    var show_dark_header_images = (
        <>
            <img className='compLogo' src={darkmodelogo} alt='insta-logo-img' />
            <img className='ml-2' src={dark_comp_name} alt='insta-img' />
        </>
    );
    var not_show_dark_header_images = (
        <>
            <img src={instaLogo} alt='insta-logo-img' />
            <img className='ml-2' src={CompName} alt='insta-img' />
        </>
    );
    return (
        <header className='homepage-navbar '>
            <nav className='navbar navbar-expand-lg navbar-light'>
                <div className='container my-4'>
                    <NavLink className='navbar-brand' to='/'>
                        {theme && except
                            ? show_dark_header_images
                            : not_show_dark_header_images}
                    </NavLink>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-menu-icon'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-hdd-stack-fill'
                                viewBox='0 0 16 16'
                            >
                                {' '}
                                <path d='M2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z'></path>{' '}
                            </svg>
                        </span>
                    </button>

                    <div
                        className='collapse navbar-collapse'
                        id='navbarSupportedContent'
                    >
                        <div className='homepage-navbar-menu mx-auto '>
                            <ul className='navbar-nav mt-2 mr-xl-3 ml-2'>
                                {HEADER_DATA.map((elem, index) => (
                                    <li key={index} className='nav-item px-2'>
                                        {elem.id !== 4 ? (
                                            <Link
                                                className='nav-link text-end'
                                                to={elem.LinkTo || '/'}
                                            >
                                                <span>{elem.headerNav}</span>{' '}
                                            </Link>
                                        ) : (
                                            <NavLink
                                                className='nav-link text-end'
                                                to={elem.LinkTo || '/'}
                                            >
                                                <span>{elem.headerNav}</span>{' '}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='homepage-navbar-social ml-auto text-end'>
                            {theme &&
                                (except ? (
                                    <img
                                        onClick={() => handleThemeChange()}
                                        src={dark_mode_img}
                                        alt='dark-mode-img'
                                    />
                                ) : (
                                    <img
                                        onClick={() => handleThemeChange()}
                                        src={darkModeImg}
                                        alt='dark-mode-img'
                                    />
                                ))}
                            {!theme && (
                                <img
                                    onClick={() => handleThemeChange()}
                                    src={light_mode_img}
                                    alt='light-mode-img'
                                />
                            )}
                            {theme && except
                                ? HEADER_SOCIAL_IMAGE2.map((elem, index) => (
                                      <Link
                                          key={index}
                                          to='/'
                                          target='_blank'
                                          onClick={() =>
                                              window.open(elem.linkTo, '_blank')
                                          }
                                      >
                                          <img
                                              src={elem.ShareImg}
                                              alt='share-icon'
                                          />
                                      </Link>
                                  ))
                                : HEADER_SOCIAL_IMAGE.map((elem, index) => (
                                      <Link
                                          key={index}
                                          to='/'
                                          target='_blank'
                                          onClick={() =>
                                              window.open(elem.linkTo, '_blank')
                                          }
                                      >
                                          <img
                                              src={elem.ShareImg}
                                              alt='share-icon'
                                          />
                                      </Link>
                                  ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
