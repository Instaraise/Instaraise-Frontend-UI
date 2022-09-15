import React from 'react';
import instaLogo from '../../../assets/images/InstaLogo.svg';
import CompName from '../../../assets/images/Instaraise.svg';
import instagramLogo from '../../../assets/images/socials/instagram.svg';
import linkedinLogo from '../../../assets/images/socials/linkedin.svg';
import twitterLogo from '../../../assets/images/socials/twitter.svg';
import { FOOTER_DATA } from '../../../config/HomeConfig/FooterConfig/config.footer';
const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container p-4">
                <div className="row">
                    <div className=" col-lg-6 col-md-6 mb-4 mb-md-0 text-start">
                        <a class="navbar-brand" href="#">
                            <img className="compLogo" src={instaLogo} />
                            <img className="ml-2" src={CompName} />
                        </a>
                        <p className="footer-social-text mt-4 font-insta-regular">
                            Instaraise is building DeFi Universe on Tezos. We
                            support projects to raise fund, build communities
                            and turn their ideas into products.
                        </p>
                        <h4 className="mt-4 font-weight-bold font-insta-regular footer-header-color">
                            Contact Us:
                        </h4>
                        <img className="" src={instagramLogo} />
                        <img className="ml-2" src={linkedinLogo} />
                        <img className="ml-2" src={twitterLogo} />
                    </div>
                    <div className=" col-lg-6 col-md-6 mb-4 mb-md-0 d-flex justify-content-start justify-content-lg-end justify-content-md-end">
                        <div>
                            <h4 className="font-weight-bold font-insta-regular footer-header-color">
                                General
                            </h4>
                            <ul class="list-unstyled">
                                {FOOTER_DATA.map((elem) => (
                                    <li class="mt-3 text-sm">
                                        <p class="font-insta-regular footer-social-text text-white">
                                            {elem.footer_links}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="footer-hr-line my-3"></div>
                        <p className="footer-social-text text-center font-insta-regular">
                            ©COPYRIGHT - INSTARAISE - 2022
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        // <footer className="py-5 container">
        //     <div class="row">
        //         <div class="col-md-4">
        //      <a class="navbar-brand" href="#">
        //          <img className="compLogo" src={instaLogo} />
        //          <img className="ml-2" src={CompName} />
        //      </a>
        // <p className="footer-social-text mt-4 font-insta-regular">
        //     Instaraise is building DeFi Universe on Tezos. We
        //     support projects to raise fund, build communities and
        //     turn their ideas into products.
        // </p>
        //         </div>
        //         <div class="col-md-4 offset-md-4">
        // <h4 className="font-weight-bold font-insta-regular footer-header-color">
        //     General
        // </h4>
        //             <div className="row">
        //                 {FOOTER_DATA.map((elem) => (
        //                     <div className="col-md-3 footer-social-text mt-4 font-insta-regular">
        //                         <p>{elem.footer_links}</p>
        //                     </div>
        //                 ))}
        //             </div>
        // <h4 className="mt-4 font-weight-bold font-insta-regular footer-header-color">
        //     Contact Us:
        // </h4>
        //             <div className="row my-3">
        //                 <div className="col-md-2 col-2">
        //                     <img src={instagramLogo} />
        //                 </div>
        //                 <div className="col-md-2 col-2">
        //                     <img src={linkedinLogo} />
        //                 </div>
        //                 <div className="col-md-2 col-2">
        //                     <img src={twitterLogo} />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div class="text-center footer-social-text">
        //         <hr class="mb-4" />
        // <p className=" font-insta-regular">
        //     ©COPYRIGHT - INSTARAISE - 2022
        // </p>
        //     </div>
        // </footer>

        // <footer className=" pt-5 pb-4">
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-md-4">
        //                 <a class="navbar-brand" href="#">
        //                     <img className="compLogo" src={instaLogo} />
        //                     <img className="ml-2" src={CompName} />
        //                 </a>
        //                 <p className="footer-social-text mt-4 font-insta-regular">
        //                     Instaraise is building DeFi Universe on Tezos. We
        //                     support projects to raise fund, build communities
        //                     and turn their ideas into products.
        //                 </p>
        //             </div>
        //             <div className="col-md-3"></div>
        //             <div className="col-md-5">
        //                 <h4 className="font-weight-bold font-insta-regular footer-header-color">
        //                     General
        //                 </h4>
        //                 <div className="row">
        //                     {FOOTER_DATA.map((elem) => (
        //                         <div className="col-12 col-md-3 footer-social-text mt-4 font-insta-regular">
        //                             <p>{elem.footer_links}</p>
        //                         </div>
        //                     ))}
        //                 </div>
        //                 <h4 className="font-weight-bold font-insta-regular footer-header-color">
        //                     Contact Us:
        //                 </h4>
        //                 <div className="row footer-img">
        //                     <div className="col-md-1 col-1">
        //                         <img src={instagramLogo} />
        //                     </div>
        //                     <div className="col-md-1 col-1">
        //                         <img src={linkedinLogo} />
        //                     </div>
        //                     <div className="col-md-1 col-1">
        //                         <img src={twitterLogo} />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="text-center footer-social-text">
        //             <hr class="mb-4" />
        //             <p className=" font-insta-regular">
        //                 ©COPYRIGHT - INSTARAISE - 2022
        //             </p>
        //         </div>
        //     </div>
        // </footer>
    );
};

export default Footer;
