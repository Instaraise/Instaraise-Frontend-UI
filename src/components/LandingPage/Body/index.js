import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import upRight from '../../../assets/images/arrow-up-right.svg';
import { DESC_DATA } from '../../../config/HomeConfig/BodyConfig/config.body';
import { SOCIALS_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';

const Body = () => {
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
            <button type='button' className=' btn btn-light btn-lg'>
                <span className='font-insta-regular mx-3 fs-5'>
                    Launch app
                    <img className='ml-1' src={upRight} alt='upright-img' />
                </span>
            </button>
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
            <button type='button' className=' btn btn-light btn-lg mb-5'>
                <span className='font-insta-regular'>
                    Launch app
                    <img className='ml-1' src={upRight} alt='upright-img' />
                </span>
            </button>
        </>
    );
    return (
        <section className='homepage-body'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2 d-none d-lg-block'>
                        <div className='vl ml-1'></div>
                        <div className='homepage-body-socials'>
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
                                            className='my-2'
                                            src={elem.footer_social_img}
                                            alt='social-img'
                                        />
                                    </Link>
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='vl ml-1'></div>
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
