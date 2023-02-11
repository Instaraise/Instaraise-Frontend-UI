import React from 'react';
import NumericLabel from 'react-pretty-numbers';
import { connect } from 'react-redux';

import Burned from '../../../assets/images/burned.svg';
import BurnedDark from '../../../assets/images/burned_dark.svg';
import Price from '../../../assets/images/Icon.svg';
import MarketCap from '../../../assets/images/market.svg';
import MarketCap_dark from '../../../assets/images/market_dark.svg';
import TokenImg from '../../../assets/images/price.svg';
import Price_dark_Img from '../../../assets/images/Price_dark_img.svg';
import supply from '../../../assets/images/supply.svg';
import supplyDark from '../../../assets/images/supply_dark.svg';
import tokenImg_dark from '../../../assets/images/token_img_dark.svg';
import tvl from '../../../assets/images/TVL.svg';
import tvl_dark from '../../../assets/images/TVL_dark.svg';
import { tokenInfo } from '../../../redux/actions/stats.action';
import { ThemeContext } from '../../../routes/root';
const Stats = (props) => {
    const { tokenData } = props;
    const { theme } = React.useContext(ThemeContext);
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
                                src={theme ? TokenImg : tokenImg_dark}
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
                                src={theme ? Price : Price_dark_Img}
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
                                src={theme ? MarketCap : MarketCap_dark}
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
                                src={theme ? supply : supplyDark}
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
                                src={theme ? Burned : BurnedDark}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>
                                    {tokenData.burned} INSTA
                                </span>
                            </p>
                            <p className='statsNames'>Burned</p>
                        </div>
                    </div>
                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                        <div className='mr-2 mt-4'>
                            <img
                                src={theme ? tvl : tvl_dark}
                                alt='insta-stas-img-logos'
                                className='img-fluid'
                                width='20'
                                height='20'
                            />
                        </div>
                        <div className='text-left mt-4'>
                            <p className='font-weight-bold m-0 statsDesc'>
                                <span className=''>
                                    $<NumericLabel>237000</NumericLabel>
                                </span>
                            </p>
                            <p className='statsNames'>Liquidity processed</p>
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
