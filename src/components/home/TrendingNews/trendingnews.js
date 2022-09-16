import React from 'react';
import { Link } from 'react-router-dom';
import { TRENDNEWS_DATA } from '../../../config/HomeConfig/TrendingConfig/config.trending';
const TrendingNews = () => {
    return (
        <div className="container">
            <div class="d-flex justify-content-center">
                <div class="py-4 d-flex">
                    <h2 class="fs-1 text-aileron-bold text-insta-regular">
                        &nbsp;Trending
                    </h2>
                    <h2 class="fs-1 text-aileron-bold services-text">
                        &nbsp;News
                    </h2>
                </div>
            </div>
            <div className="">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            className="imageEdit"
                            src="https://blog.instaraise.io/wp-content/uploads/2022/06/3.jpg"
                            alt="descImage"
                        />
                    </div>
                    <div className="col-md-6 mt-5">
                        <h5 className="trending-font">
                            Understanding Decentralized Finance (DeFi) Evolution
                        </h5>
                        <p className="mb-4 trending-font-para lh-lg fs-6">
                            Decentralized Finance, DeFi is a revolutionary
                            application of cryptocurrency’s underlying
                            blockchain technology that has expanded the horizons
                            of global finance. Created as an alternative to the
                            traditional financial ecosystem, DeFi applications
                            were made possible by Ethereum – the first ever
                            programmable blockchain protocol with sma...
                        </p>
                        <Link
                            className="trending-font text-decoration-none"
                            to="/"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
                <div className="row py-4 hoverChange">
                    {TRENDNEWS_DATA.map((elem) => (
                        <div className="col-md-4 cards-display cardEdit">
                            <img
                                className="cardEditImg"
                                src={elem.image_url}
                                alt="descImage"
                            />
                            <h5 className="my-4 trending-font">
                                {elem.subtitle}
                            </h5>
                            <p className="mb-4 font-insta-regular text-justify lh-base trending-font-para">
                                {elem.description}
                            </p>
                            <div class="d-flex justify-content-between">
                                <h6 className="cardDate">27 June, 2022</h6>
                                <Link
                                    className="trending-font text-decoration-none"
                                    to="/"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingNews;
