import React from 'react';
import { Link } from 'react-router-dom';
import { TRENDNEWS_DATA } from '../../../config/HomeConfig/TrendingConfig/config.trending';
const TrendingNews = () => {
    return (
        <div className="container my-5">
            <div className="d-flex pt-3 pb-5 justify-content-center">
                <h2 className="fs-1 text-aileron-bold text-insta-regular">
                    &nbsp;Trending
                </h2>
                <h2 className="fs-1 text-aileron-bold services-text">
                    &nbsp;News
                </h2>
            </div>

            <div className="row py-lg-4">
                <div className="col-md-6 d-none d-lg-block">
                    <img
                        role="button"
                        className="imageEdit d-block"
                        src={TRENDNEWS_DATA[0].image_url}
                        alt="descImage"
                    />
                </div>
                <div className="col-md-6 py-1 d-none d-lg-block">
                    <h5 className="trending-font">
                        {TRENDNEWS_DATA[0].subtitle}
                    </h5>
                    <p className="mb-4 trending-header-para text-justify font-insta-regular">
                        Decentralized Finance, DeFi is a revolutionary
                        application of cryptocurrency’s underlying blockchain
                        technology that has expanded the horizons of global
                        finance. Created as an alternative to the traditional
                        financial ecosystem, DeFi applications were made
                        possible by Ethereum – the first ever programmable
                        blockchain protocol with sma...
                    </p>
                    <Link className="trending-font text-decoration-none" to="/">
                        Read More
                        <img src={TRENDNEWS_DATA[0].arrowImg} />
                    </Link>
                </div>
            </div>
            <div className="row py-md-4 hoverChange">
                {TRENDNEWS_DATA.map((elem, index) => (
                    <div key={index} className="col-md-4 p-3">
                        <img
                            role="button"
                            className="cardEditImg img-fluid"
                            src={elem.image_url}
                            alt="descImage"
                        />
                        <h5 className="cards-display my-4 trending-font">
                            {elem.subtitle}
                        </h5>
                        <p className="mb-4 lh-lg font-insta-regular text-justify lh-base trending-font-para">
                            {elem.description}
                        </p>
                        <div className="d-flex justify-content-between">
                            <h6 className="cardDate font-insta-regular">
                                27 June, 2022
                            </h6>
                            <Link
                                className="trending-font text-decoration-none"
                                to="/"
                            >
                                Read More
                                <img src={elem.arrowImg} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingNews;
