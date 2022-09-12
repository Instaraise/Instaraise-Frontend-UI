import React from 'react';
import Header from '../Header/header';
import { DESC_DATA } from '../../../../config/HomeConfig/BodyConfig/config.body';
import instagramLogo from '../../../../assets/images/socials/instagram.svg';
import linkedinLogo from '../../../../assets/images/socials/linkedin.svg';
import twitterLogo from '../../../../assets/images/socials/twitter.svg';
import upRight from '../../../../assets/images/arrow-up-right.svg';
import Stats from '../Stats/stats';
import '../../../../scss/_body.css';
const Body = () => {
    var HomePageDesElem = (
        <>
            {DESC_DATA.map((elem) => (
                <>
                    <div className="">
                        <p className="mb-0 homepage-body-description-bodypara">
                            {elem.heading}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h1>{elem.subHeading}</h1>
                    </div>
                    <div className="vlb">
                        <p className="ml-2 mb-5 descPara">{elem.para}</p>
                    </div>
                </>
            ))}
            <button type="button" className=" btn btn-light btn-lg">
                <span className="">
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
                            <img src={instagramLogo} />
                            <br />
                            <img src={linkedinLogo} />
                            <br />
                            <img src={twitterLogo} />
                        </div>
                        <div className="vl"></div>
                    </div>
                    <div className="mt-auto col-md-7 mx-auto d-none d-lg-block homepage-body-description">
                        {HomePageDesElem}
                    </div>
                    <div class="col-md-12 mx-auto homepage-body-description d-lg-none cen text-center">
                        {DESC_DATA.map((elem) => (
                            <>
                                <div className="">
                                    <p className="mb-0 homepage-body-description-bodypara">
                                        {elem.heading}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h1>{elem.subHeading}</h1>
                                </div>

                                <p className="ml-2 mb-5 descPara">
                                    {elem.para}
                                </p>
                            </>
                        ))}
                        <button
                            type="button"
                            className=" btn btn-light btn-lg mb-5"
                        >
                            <span className="">
                                Launch app
                                <img className="ml-1" src={upRight} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Body;
