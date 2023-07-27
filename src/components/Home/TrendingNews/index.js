import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Rightarrow from '../../../assets/images/rightarrow.svg';
import { FETCH_ALL_TRENDING_NEWS } from '../../../redux/actions/news.action';

const TrendingNews = (props) => {
    React.useEffect(() => {
        props.fetchAllTrendingNews();
    }, []);
    return (
        <div className='container py-5'>
            <div className='d-flex pt-3 pb-5 justify-content-center'>
                <h2 className='fs-1 text-aileron-bold text-insta-regular'>
                    &nbsp;Trending
                </h2>
                <h2 className='fs-1 text-aileron-bold services-text'>
                    &nbsp;News
                </h2>
            </div>

            <div className='row py-lg-4 d-flex justify-content-center align-items-center'>
                <div className='col-md-6'>
                    {props.allTrendingNews.length > 0 ? (
                        <img
                            role='button'
                            className='imageEdit d-block'
                            src={props.allTrendingNews[0].image_url}
                            alt='descImage'
                        />
                    ) : (
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='spinner-border' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className='col-md-6 py-4 py-md-0 anchor-tag-hover'>
                    {props.allTrendingNews.length > 0 ? (
                        <h5
                            dangerouslySetInnerHTML={{
                                __html: props.allTrendingNews[0].title,
                            }}
                            className='trending-font'
                        />
                    ) : (
                        <h5 className='trending-font'>
                            A Dex designed to boost and re-shape Tezos Defi
                            &#8211; InstaDEX FAQs
                        </h5>
                    )}
                    {props.allTrendingNews.length > 0 ? (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.allTrendingNews[0].content,
                            }}
                            className='my-3 trending-header-para text-justify font-insta-regular line-clamp'
                        />
                    ) : (
                        <p className='my-3 trending-header-para text-justify font-insta-regular'>
                            Instaraise, the first of its kind decentralized
                            fundraising and incubation protocol on Tezos
                            protocol, has been preparing the ground for a
                            full-fledged DeFi offering on its path to introduce
                            Instaraise v2.0. Some of the prominent products and
                            features included in the upgrade includes the
                            InstaDEX decentralized exchange platform and a
                            cross-chain bridge connecting Tezos ecosystem […
                        </p>
                    )}

                    {props.allTrendingNews.length > 0 && (
                        <Link
                            to={props.allTrendingNews[0].link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='trending-font text-decoration-none'
                        >
                            Read More
                            <img src={Rightarrow} alt='chevron' />
                        </Link>
                    )}
                </div>
            </div>
            <div className='row py-md-4 hoverChange anchor-tag-hover'>
                {props.allTrendingNews.map((elem, index) => {
                    return index !== 0 ? (
                        <div
                            key={index}
                            className='col-md-4 p-3'
                            role={'link'}
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={() => window.open(elem.link)}
                        >
                            <img
                                className='cardEditImg img-fluid'
                                src={elem.image_url}
                                alt='descImage'
                            />

                            <h5
                                dangerouslySetInnerHTML={{
                                    __html: elem.title,
                                }}
                                className='cards-display my-4 trending-font'
                            />

                            <p
                                dangerouslySetInnerHTML={{
                                    __html: elem.content,
                                }}
                                className='mb-4 lh-lg font-insta-regular text-justify lh-base trending-font-para trending-para-dark'
                            />
                            <div className='d-flex pb-3 justify-content-between'>
                                {elem.categories
                                    .slice(0, 3)
                                    .map((ele, index) => {
                                        return (
                                            <div
                                                className='category-btn text-center my-auto text-12 font-insta-regular ml-lg-2 ml-md-2 ml-0 px-lg-3 px-2'
                                                key={index}
                                            >
                                                {ele}
                                            </div>
                                        );
                                    })}
                            </div>

                            <div className='d-flex justify-content-between'>
                                <h6 className='cardDate font-insta-regular trending-para-dark'>
                                    {new Date(elem.date).toLocaleDateString()}
                                </h6>
                                <Link
                                    href={elem.link}
                                    onClick={() => {
                                        window.open(elem.link);
                                    }}
                                    className='trending-font text-decoration-none'
                                    to='/'
                                >
                                    Read More
                                    <img src={Rightarrow} alt='chevron' />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        ''
                    );
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    allTrendingNews: state.allTrendingNews,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllTrendingNews: (payload) =>
        dispatch(FETCH_ALL_TRENDING_NEWS(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrendingNews);
