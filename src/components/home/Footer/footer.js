import React from 'react';
import { Link } from 'react-router-dom';
import instaLogo from '../../../assets/images/InstaLogo.svg';
import CompName from '../../../assets/images/Instaraise.svg';
// import instagramLogo from '../../../assets/images/socials/instagram.svg';
// import linkedinLogo from '../../../assets/images/socials/linkedin.svg';
// import twitterLogo from '../../../assets/images/socials/twitter.svg';
import { FOOTER_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';
import { SOCIALS_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';
const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container p-4">
                <div className="row">
                    <div className=" col-lg-6 col-md-6 mb-4 mb-md-0 text-start">
                        <a className="navbar-brand" href="#">
                            <img className="compLogo" src={instaLogo} />
                            <img className="ml-2" src={CompName} />
                        </a>
                        <p className="mt-4 footer-font">
                            Instaraise is building DeFi Universe on Tezos. We
                            support projects to raise fund, build communities
                            and turn their ideas into products.
                        </p>
                        <h4 className="mt-4 font-weight-bold font-insta-regular footer-header-color">
                            Contact Us:
                        </h4>
                        <div className="my-2">
                            {SOCIALS_DATA.map((elem, index) => (
                                <Link
                                    key={index}
                                    to="/"
                                    target="_blank"
                                    onClick={() =>
                                        window.open(
                                            elem.footer_social_link,
                                            '_blank'
                                        )
                                    }
                                >
                                    <img
                                        className="mx-2"
                                        src={elem.footer_social_img}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className=" col-lg-6 col-md-6 mb-4 mb-md-0 d-flex justify-content-start justify-content-lg-end justify-content-md-end">
                        <div>
                            <h4 className="mb-3 font-weight-bold font-insta-regular footer-header-color">
                                General
                            </h4>
                            <ul className="list-unstyled">
                                {FOOTER_DATA.map((elem, index) => (
                                    <li key={index} className="mt-2 text-sm">
                                        <Link
                                            to="/"
                                            className="text-decoration-none font-insta-regular footer-social-text text-white"
                                        >
                                            {elem.footer_links}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 py-2">
                        <p className="footer-font text-center footer-copyright-section py-2">
                            ©COPYRIGHT - INSTARAISE - 2022
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
