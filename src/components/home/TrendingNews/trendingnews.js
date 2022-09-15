import React from 'react';
import { Link } from 'react-router-dom';
import { TRENDNEWS_DATA } from '../../../config/HomeConfig/TrendingConfig/config.trending';
const TrendingNews = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Trending News</h1>
            <div className="row">
                <div className="col-md-6">
                    <img
                        className="imageEdit"
                        src="https://blog.instaraise.io/wp-content/uploads/2022/06/3.jpg"
                        alt="descImage"
                    />
                </div>
                <div className="col-md-6 mt-5">
                    <h5>
                        Understanding Decentralized Finance (DeFi) Evolution
                    </h5>
                    <p className="mb-4">
                        DeFi, short for “Decentralized Finance” has been among
                        the hottest topics in the past couple of years. In this
                        post, we will discover the evolution of Decentralized
                        finance and also explore what is hidden in the future
                        for us.
                    </p>
                    <Link to="/">Read More</Link>
                </div>
            </div>
            <div className="row mt-5">
                {TRENDNEWS_DATA.map((elem) => (
                    <div className="col-md-4 my-4">
                        <img
                            className="cardEditImg"
                            src={elem.image_url}
                            alt="descImage"
                        />
                        <h5 className="my-4">{elem.subtitle}</h5>
                        <p className="mb-4 card-para">{elem.description}</p>
                        <div class="d-flex justify-content-between">
                            <h6>27 June, 2022</h6>
                            <Link to="/">Read More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingNews;
