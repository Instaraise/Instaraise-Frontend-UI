import React from 'react';
import Header from '../Header/header';
import { DESC_DATA } from '../../../../config/HomeConfig/BodyConfig/config.body';
import instagramLogo from '../../../../assets/images/socials/instagram.svg';
import linkedinLogo from '../../../../assets/images/socials/linkedin.svg';
import twitterLogo from '../../../../assets/images/socials/twitter.svg';
import upRight from '../../../../assets/images/arrow-up-right.svg';
import { SOCIALS_DATA } from '../../../../config/HomeConfig/FooterConfig/config.footer';
import { Link } from 'react-router-dom';
import Stats from '../Stats/stats';
const Body = () => {
    var HomePageDesElem = (
        <>
            {DESC_DATA.map((elem, index) => (
                <React.Fragment key={index}>
                    <div className="">
                        <p className="mb-0 homepage-body-description-bodypara font-insta-regular">
                            {elem.heading}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h1 className="text-aileron-bold">{elem.subHeading}</h1>
                    </div>
                    <div className="vlb">
                        <p className="ml-2 mb-5 lh-base descPara font-insta-regular">
                            {elem.para}
                        </p>
                    </div>
                </React.Fragment>
            ))}
            <button type="button" className=" btn btn-light btn-lg">
                <span className="font-insta-regular">
                    Launch app
                    <img className="ml-1" src={upRight} />
                </span>
            </button>
        </>
    );
    var HomePageDesElemMobile = (
        <>
            {DESC_DATA.map((elem, index) => (
                <React.Fragment key={index}>
                    <div className="">
                        <p className="mb-0 homepage-body-description-bodypara font-insta-regular">
                            {elem.heading}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h1>{elem.subHeading}</h1>
                    </div>

                    <p className="ml-2 mb-5 lh-base descPara font-insta-regular">
                        {elem.para}
                    </p>
                </React.Fragment>
            ))}
            <button type="button" className=" btn btn-light btn-lg mb-5">
                <span className="font-insta-regular">
                    Launch app
                    <img className="ml-1" src={upRight} />
                </span>
            </button>
        </>
    );
    return (
        <section className="homepage-body">
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-2 d-none d-lg-block">
                        <div className="vl"></div>
                        <div className="homepage-body-socials">
                            {SOCIALS_DATA.map((elem, index) => (
                                <React.Fragment key={index}>
                                    <Link
                                        to="/"
                                        target="_blank"
                                        onClick={() =>
                                            window.open(
                                                elem.footer_social_link,
                                                '_blank'
                                            )
                                        }
                                    >
                                        <img src={elem.footer_social_img} />
                                    </Link>
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="vl"></div>
                    </div>
                    <div className=" mt-auto col-md-7 mx-auto d-none d-lg-block homepage-body-description">
                        {HomePageDesElem}
                    </div>
                    <div className="col-md-12 mx-auto homepage-body-description d-lg-none cen text-center">
                        {HomePageDesElemMobile}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Body;
