import React from 'react';
import Header from '../Header/header';
import { DESC_DATA } from '../../../../config/HomeConfig/BodyConfig/config.body';
import instagramLogo from '../../../../assets/images/socials/instagram.svg';
import linkedinLogo from '../../../../assets/images/socials/linkedin.svg';
import twitterLogo from '../../../../assets/images/socials/twitter.svg';
import upRight from '../../../../assets/images/arrow-up-right.svg';
import '../../../../scss/_body.css';
const Body = () => {
    return (
        <section className="BodySection">
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <div className="vl"></div>
                        <div className="logosEdit">
                            <img src={instagramLogo} />
                            <br />
                            <img src={linkedinLogo} />
                            <br />
                            <img src={twitterLogo} />
                        </div>
                        <div className="vl"></div>
                    </div>
                    <div className="col-7 mx-auto bodyContent">
                        {DESC_DATA.map((elem) => (
                            <>
                                <div className="mt-5">
                                    <p className="mb-0 bodyHeaderPara">
                                        {elem.heading}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h1>{elem.subHeading}</h1>
                                </div>
                                <div className="vlb">
                                    <p className="ml-2">{elem.para}</p>
                                </div>
                            </>
                        ))}
                        <button
                            type="button"
                            className=" btn btn-light btn-lg mt-4"
                        >
                            <span>
                                Launch App
                                <img src={upRight} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Body;
