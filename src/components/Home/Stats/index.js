import React from 'react';
import NumericLabel from 'react-pretty-numbers';
import { connect } from 'react-redux';

import Burned from '../../../assets/images/burned.svg';
import Price from '../../../assets/images/Icon.svg';
import MarketCap from '../../../assets/images/market.svg';
import TokenImg from '../../../assets/images/price.svg';
import supply from '../../../assets/images/supply.svg';
import tvl from '../../../assets/images/TVL.svg';
import { tokenInfo } from '../../../redux/actions/stats.action';
const Stats = (props) => {
    const { tokenData } = props;
    React.useMemo(() => {
        props.fetchTokenInfo();
    }, []);

    return (
        <section className='statsContainer shadow-sm'>
            <div className='container'>
                <div className='row alg'>
                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                        <div className='mr-2 mt-4'>
                            <img
                                src={TokenImg}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>$INSTA</span>
                            </p>
                            <p className='statsNames'>Token ticker</p>
                        </div>
                    </div>
                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                        <div className='mr-2 mt-4'>
                            <img
                                src={Price}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>${tokenData.price}</span>
                            </p>
                            <p className='statsNames'>Price</p>
                        </div>
                    </div>
                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                        <div className='mr-2 mt-4'>
                            <img
                                src={MarketCap}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>
                                    $
                                    <NumericLabel>
                                        {tokenData.marketCap}
                                    </NumericLabel>
                                </span>
                            </p>
                            <p className='statsNames'>Market cap</p>
                        </div>
                    </div>
                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                        <div className='mr-2 mt-4'>
                            <img
                                src={supply}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>
                                    <NumericLabel>
                                        {tokenData.supply}
                                    </NumericLabel>
                                </span>
                            </p>
                            <p className='statsNames'>Circulating supply</p>
                        </div>
                    </div>
                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                        <div className='mr-2 mt-4'>
                            <img
                                src={Burned}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>${tokenData.burned}</span>
                            </p>
                            <p className='statsNames'>Burned</p>
                        </div>
                    </div>
                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                        <div className='mr-2 mt-4'>
                            <img
                                src={tvl}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>
                                    $
                                    <NumericLabel>{tokenData.tvl}</NumericLabel>
                                </span>
                            </p>
                            <p className='statsNames'>TVL</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchTokenInfo: (payload) => dispatch(tokenInfo(payload)),
});

const mapStateToProps = (state) => ({
    tokenData: state.tokenInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
