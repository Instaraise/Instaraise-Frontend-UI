import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Header from '../Header';
import upRight from '../../../assets/images/arrow-up-right.svg';
import upRight_dark from '../../../assets/images/arrow-up-right_light.svg';
import telegramLogoDashboard from '../../../assets/images/socials/Telegram_dashboard.svg';
import { DESC_DATA } from '../../../config/HomeConfig/BodyConfig/config.body';
import { SOCIALS_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';
import { ThemeContext } from '../../../routes/root';
const Body = () => {
    const { theme } = React.useContext(ThemeContext);
    var HomePageDesElem = (
        <>
            {DESC_DATA.map((elem, index) => (
                <React.Fragment key={index}>
                    <div className=''>
                        <p className='mb-0 homepage-body-description-bodypara font-insta-regular'>
                            {elem.heading}
                        </p>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-aileron-bold'>{elem.subHeading}</h1>
                    </div>
                    <div className='vlb'>
                        <p className='ml-2 mb-5 lh-base descPara font-insta-regular'>
                            {elem.para}
                        </p>
                    </div>
                </React.Fragment>
            ))}
            <Link
                to={'/dashboard'}
                type='button'
                className=' btn btn-color-mode btn-lg'
            >
                <span className='font-insta-regular'>
                    Launch app
                    <img
                        className='ml-1'
                        src={theme ? upRight : upRight_dark}
                        alt='upright-img'
                    />
                </span>
            </Link>
            <NavLink
                to='/'
                target='_blank'
                onClick={() =>
                    window.open(DESC_DATA[0].BUY_INSTA_LINK, '_blank')
                }
                style={{
                    color: '#ffff',
                    paddingLeft: '15px',
                }}
            >
                Buy $INSTA
            </NavLink>
        </>
    );
    var HomePageDesElemMobile = (
        <>
            {DESC_DATA.map((elem, index) => (
                <React.Fragment key={index}>
                    <div className=''>
                        <p className='mb-0 homepage-body-description-bodypara font-insta-regular'>
                            {elem.heading}
                        </p>
                    </div>
                    <div className='mb-4'>
                        <h1>{elem.subHeading}</h1>
                    </div>

                    <p className='ml-2 mb-5 lh-base descPara font-insta-regular'>
                        {elem.para}
                    </p>
                </React.Fragment>
            ))}
            <Link
                to='/dashboard'
                type='button'
                className='btn btn-color-mode btn-lg'
            >
                <span className='font-insta-regular'>
                    Launch app
                    <img
                        className='ml-1'
                        src={theme ? upRight : upRight_dark}
                        alt='upright-img'
                    />
                </span>
            </Link>
            <div className='py-3'>
                <NavLink
                    to='/'
                    target='_blank'
                    onClick={() =>
                        window.open(DESC_DATA[0].BUY_INSTA_LINK, '_blank')
                    }
                    style={{
                        color: '#ffff',
                        paddingLeft: '15px',
                    }}
                >
                    Buy $INSTA
                </NavLink>
            </div>
        </>
    );
    return (
        <section className='homepage-body'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2 d-none d-lg-block'>
                        <div className='vl'></div>
                        <div className='homepage-body-socials'>
                            <Link
                                target='_blank'
                                onClick={() =>
                                    window.open(
                                        'https://telegram.me/Instaraise',
                                        '_blank'
                                    )
                                }
                            >
                                <img
                                    src={telegramLogoDashboard}
                                    alt='telegram-icon'
                                    style={{ marginLeft: '-10px' }}
                                />
                            </Link>
                            <div>
                                {SOCIALS_DATA.map((elem, index) => (
                                    <React.Fragment key={index}>
                                        <Link
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
                                                src={elem.footer_social_img}
                                                alt='social-img'
                                            />
                                        </Link>
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className='vl'></div>
                    </div>
                    <div className=' mt-auto col-md-7 mx-auto d-none d-lg-block homepage-body-description'>
                        {HomePageDesElem}
                    </div>
                    <div className='col-md-12 mx-auto homepage-body-description d-lg-none cen text-center'>
                        {HomePageDesElemMobile}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Body;
