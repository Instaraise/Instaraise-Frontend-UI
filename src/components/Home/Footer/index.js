import React from 'react';
import { Link } from 'react-router-dom';

import instaLogo from '../../../assets/images/InstaLogo.svg';
import CompName from '../../../assets/images/Instaraise.svg';
import telegramLogoDashboard from '../../../assets/images/socials/Telegram_dashboard.svg';
import { FOOTER_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';
import { SOCIALS_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';
const Footer = () => {
    return (
        <footer className='footer-section'>
            <div className='container pt-4 px-4'>
                <div className='row'>
                    <div className=' col-lg-6 col-md-6 mb-4 mb-md-0 text-start'>
                        <div className='navbar-brand'>
                            <img
                                className='compLogo'
                                src={instaLogo}
                                alt='insta-logo'
                            />
                            <img
                                className='ml-2'
                                src={CompName}
                                alt='insta-img'
                            />
                        </div>
                        <p className='mt-4 w-75 footer-font'>
                            Welcome to Instaraise,
                            <br />
                            Your Web3 Investment Stack to Invest, Trade, Farm
                            and Manage all your tokens in one place.
                        </p>

                        <div className='my-2'>
                            <Link
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
                                    height='28'
                                    className='pr-2'
                                    src={telegramLogoDashboard}
                                    alt='insta-social-img'
                                />
                            </Link>
                            {SOCIALS_DATA.map((elem, index) => (
                                <Link
                                    key={index}
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
                                        className='pr-2'
                                        src={elem.footer_social_img}
                                        alt='insta-social-img'
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className=' col-lg-6 col-md-6 mb-4 mb-md-0 d-flex justify-content-start justify-content-lg-end justify-content-md-end'>
                        <div>
                            <h4 className='mb-3 font-weight-bold font-insta-regular footer-header-color'>
                                General
                            </h4>
                            <ul className='list-unstyled'>
                                {FOOTER_DATA.map((elem, index) => (
                                    <li key={index} className='mt-2 text-sm'>
                                        <Link
                                            to='#'
                                            target='_blank'
                                            onClick={() =>
                                                window.open(
                                                    elem.footer_external_link,
                                                    '_blank'
                                                )
                                            }
                                            className='text-decoration-none font-insta-regular footer-social-text text-white'
                                        >
                                            {elem.footer_links}
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
                                        </Link>
                                    </li>
                                ))}
                                <li className='mt-2 text-sm'>
                                    <Link
                                        to='/terms'
                                        className='text-decoration-none font-insta-regular footer-social-text text-white'
                                    >
                                        Terms of Services
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
                                    </Link>
                                </li>
                                <li className='mt-2 text-sm'>
                                    <Link
                                        to='/privacy'
                                        className='text-decoration-none font-insta-regular footer-social-text text-white'
                                    >
                                        Privacy Policy
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
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 py-2'>
                        <p className='footer-font text-center footer-copyright-section pt-4'>
                            ©COPYRIGHT - INSTARAISE - 2022
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
