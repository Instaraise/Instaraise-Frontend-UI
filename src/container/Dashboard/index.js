import React from 'react';
import NumericLabel from 'react-pretty-numbers';
import { connect } from 'react-redux';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import Burned from '../../assets/images/burned.svg';
import Price from '../../assets/images/Icon.svg';
import MarketCap from '../../assets/images/market.svg';
import supply from '../../assets/images/supply.svg';
import tvl from '../../assets/images/TVL.svg';
import DashboardLayout from '../../components/dashboard/Layout';
import { DEX_DATA_REFRESH_TIME } from '../../config/config';
import { LAUNCHPAD_SERVICES_DATA } from '../../config/HomeConfig/ServicesConfig/config.services';
import { numberOfDays, priceGraph } from '../../redux/actions/graph.action';
import { tokenInfo } from '../../redux/actions/stats.action';
import { ThemeContext } from '../../routes/root';

const CustomTooltip = ({ active, payload, label }) => {
    let x = new Date(label).toDateString();
    let y = new Date(label).toLocaleTimeString();
    if (active && payload && payload.length) {
        return (
            <div className='custom-tooltip'>
                <p className='label'>{`${x}` + ` ` + `${y}`}</p>
                <p className='label'>
                    <span className='fw-bold'>Price:</span> $
                    {`${payload[0].value}`}
                </p>
            </div>
        );
    }

    return null;
};
const Dashboard = (props) => {
    const { tokenData, graphData, noofDays, changeDays } = props;
    const { theme } = React.useContext(ThemeContext);
    const refresh = () => {
        const data = {
            days: noofDays,
        };
        props.fetchPriceData(data);
        //fetching token stats after every 1 min
        props.fetchTokenInfo();
    };

    React.useEffect(() => {
        const interval = setInterval(function () {
            refresh();
        }, DEX_DATA_REFRESH_TIME);
        return () => {
            clearInterval(interval);
        };
    }, [noofDays]);
    React.useEffect(() => {
        const data = {
            days: noofDays,
        };
        props.fetchPriceData(data);
        // eslint-disable-next-line
    }, [noofDays]);

    React.useEffect(() => {
        props.fetchTokenInfo();
    }, []);
    return (
        <DashboardLayout flag={props.flag}>
            {/* <div className='d-flex justify-content-between flex-lg-row flex-column h-100 w-100 align-items-start'> */}
            <div className='row'>
                <div className='col-12 col-md-12 col-lg-9 w-100'>
                    <div className='card_i shadow-sm dashboard-stats-background'>
                        <div className='d-flex flex-column flex-lg-column justify-content-between'>
                            <div className='className="card   col-12 col-lg-12"'>
                                <div className='row alg'>
                                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                                        <div className='mr-2 mt-4'>
                                            <img
                                                src={Price}
                                                alt='insta-stas-img-logos'
                                                width='20'
                                                height='20'
                                            />
                                        </div>
                                        <div className='text-left mt-4'>
                                            <p className='font-weight-bold m-0 statsDesc'>
                                                <span className=''>
                                                    ${tokenData.price}
                                                </span>
                                            </p>
                                            <p className='statsNames'>Price</p>
                                        </div>
                                    </div>
                                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                                        <div className='mr-2 mt-4'>
                                            <img
                                                src={MarketCap}
                                                alt='insta-stas-img-logos'
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
                                            <p className='statsNames'>
                                                Market&nbsp;cap
                                            </p>
                                        </div>
                                    </div>
                                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                                        <div className='mr-2 mt-4'>
                                            <img
                                                src={supply}
                                                alt='insta-stas-img-logos'
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
                                            <p className='statsNames'>Supply</p>
                                        </div>
                                    </div>
                                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                                        <div className='mr-2 mt-4'>
                                            <img
                                                src={Burned}
                                                alt='insta-stas-img-logos'
                                                width='20'
                                                height='20'
                                            />
                                        </div>
                                        <div className='text-left mt-4'>
                                            <p className='font-weight-bold m-0 statsDesc'>
                                                <span className=''>
                                                    ${tokenData.burned}
                                                </span>
                                            </p>
                                            <p className='statsNames'>Burned</p>
                                        </div>
                                    </div>

                                    <div className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'>
                                        <div className='mr-2 mt-4'>
                                            <img
                                                src={tvl}
                                                alt='insta-stas-img-logos'
                                                width='20'
                                                height='20'
                                            />
                                        </div>
                                        <div className='text-left mt-4'>
                                            <p className='font-weight-bold m-0 statsDesc'>
                                                <span className=''>
                                                    $
                                                    <NumericLabel>
                                                        {tokenData.tvl}
                                                    </NumericLabel>
                                                </span>
                                            </p>
                                            <p className='statsNames'>TVL</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card_i shadow-sm  mt-3 graph-section-height'>
                        {/* <div className='card_i shadow-sm  mt-3'> */}
                        <div className='text-center d-flex flex-column  flex-lg-row flex-sm-row flex-md-row justify-content-between align-items-center mt-3 mb-4'>
                            <div className='d-flex order-2 order-lg-0 order-md-0 order-sm-0 my-2 my-lg-0 my-sm-0 my-md-0'>
                                <div className=' cursor-pointer'>
                                    <span className='px-1 text-toggle-selected'>
                                        Price
                                    </span>
                                </div>
                            </div>
                            <h6 className='m-0 text-insta-regular'>
                                $INSTA performance chart
                            </h6>
                            <div className='d-flex mt-2 mt-lg-0 mt-sm-0 mt-md-0'>
                                <div className='cursor-pointer'>
                                    <span
                                        className={`
                                                    px-1 border-right
                                                    ${
                                                        noofDays === 1
                                                            ? 'text-toggle-selected'
                                                            : 'text-toggle'
                                                    }
                                                    `}
                                        onClick={() => {
                                            changeDays(1);
                                        }}
                                    >
                                        24h
                                    </span>
                                </div>
                                <div className='cursor-pointer'>
                                    <span
                                        className={`
                                                px-1 border-right
                                                ${
                                                    noofDays === 7
                                                        ? 'text-toggle-selected'
                                                        : 'text-toggle'
                                                }
                                                `}
                                        onClick={() => {
                                            changeDays(7);
                                        }}
                                    >
                                        7d
                                    </span>
                                </div>
                                <div className='cursor-pointer'>
                                    <span
                                        className={`
                                                 px-1 border-right
                                                 ${
                                                     noofDays === 14
                                                         ? 'text-toggle-selected'
                                                         : 'text-toggle'
                                                 }
                                                 `}
                                        onClick={() => {
                                            changeDays(14);
                                        }}
                                    >
                                        14d
                                    </span>
                                </div>
                                <div className=' cursor-pointer'>
                                    <span
                                        className={
                                            noofDays === 30
                                                ? 'text-toggle-selected px-1'
                                                : 'text-toggle px-1'
                                        }
                                        onClick={() => {
                                            changeDays(30);
                                        }}
                                    >
                                        30d
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* <div
                            className='recharts-responsive-container'
                            width='976.65625'
                            height='631.75'
                            style={{ width: '100%', height: '80%' }}
                        > */}
                        <div style={{ width: '100%', height: '72%' }}>
                            <ResponsiveContainer>
                                <AreaChart
                                    width={50}
                                    height={50}
                                    data={graphData.pricedata}
                                >
                                    <CartesianGrid
                                        horizontal={true}
                                        vertical={false}
                                        strokeDasharray='6 4'
                                        stroke={theme ? '#BEB0C9' : '#717171'}
                                    />
                                    <XAxis
                                        dataKey='name'
                                        stroke={theme ? '#BEB0C9' : '#717171'}
                                        tickMargin={10}
                                        tickCount={15}
                                        style={{
                                            fontSize: '12px',
                                        }}
                                        tickFormatter={(value) => {
                                            const x = new Date(
                                                value
                                            ).getHours();
                                            const y = new Date(value).getDate();
                                            if (noofDays === 1) {
                                                return `${x}`;
                                            } else {
                                                return `${y}`;
                                            }
                                        }}
                                    />
                                    <YAxis
                                        stroke={theme ? '#BEB0C9' : '#717171'}
                                        tickCount={17}
                                        type='number'
                                        domain={['dataMin', 'dataMax - 0.5']}
                                        axisLine={false}
                                        tickFormatter={(value) => {
                                            return `$${value.toFixed(5)}`;
                                        }}
                                        width={60}
                                        style={{
                                            fontSize: '12px',
                                            margin: '10px',
                                            border: 'none',
                                        }}
                                    />
                                    <Tooltip
                                        wrapperStyle={{
                                            backgroundColor: '#fff',
                                            padding: '1rem 1rem 0rem 1rem',
                                            borderRadius: '8px',
                                            boxShadow:
                                                '0 .125rem .25rem rgba(0,0,0,.075)',
                                        }}
                                        content={<CustomTooltip />}
                                    />
                                    {theme ? (
                                        <defs>
                                            <linearGradient
                                                id='colorv'
                                                x1='0'
                                                y1='0'
                                                x2='0'
                                                y2='1'
                                            >
                                                <stop
                                                    offset='5%'
                                                    stopColor='#F3F0FF'
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset='95%'
                                                    stopColor=' #f1edff'
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                    ) : (
                                        <defs>
                                            <linearGradient
                                                id='colorv'
                                                x1='0'
                                                y1='0'
                                                x2='0'
                                                y2='1'
                                            >
                                                <stop
                                                    offset='5%'
                                                    stopColor='#150335'
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset='95%'
                                                    stopColor=' #150335'
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                    )}
                                    <Area
                                        type='monotone'
                                        dataKey='pv'
                                        stroke={theme ? '#5E0EE2' : '#A761D5'}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill='url(#colorv)'
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                {/* this is next section */}
                <div className='col-12 col-md-12 col-lg-3 my-3 my-md-3 my-lg-0'>
                    <div className='card_i shadow-sm h-100'>
                        <div className='row h-100 '>
                            <div className='col-md-12'>
                                <div className='token-information d-flex p-3 border-10'>
                                    <div>
                                        <h6 className='text-insta-regular lh-sm font-weight-bold'>
                                            Our Services
                                        </h6>
                                        <div className='statsNames font-insta-regular text-12 p-0 mb-3'>
                                            Participate in the Initial Dex
                                            Offering
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            {LAUNCHPAD_SERVICES_DATA.map((elem, index) => (
                                <>
                                    <div key={index} className='col-md-12'>
                                        <div className='token-information border-10'>
                                            <div className='d-flex pt-2'>
                                                <img
                                                    className='ml-md-3'
                                                    src={elem.image}
                                                    alt='Services-card'
                                                    width='40'
                                                    height='40'
                                                />
                                                <div className='ml-3'>
                                                    <h6 className='text-insta-regular lh-sm font-weight-bold'>
                                                        {elem.heading}
                                                    </h6>
                                                    <p className='statsNames text-12 font-insta-regular'>
                                                        {elem.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
const mapDispatchToProps = (dispatch) => ({
    fetchTokenInfo: (payload) => dispatch(tokenInfo(payload)),
    fetchPriceData: (payload) => dispatch(priceGraph(payload)),
    changeDays: (payload) => dispatch(numberOfDays(payload)),
});

const mapStateToProps = (state) => ({
    tokenData: state.tokenInfo,
    graphData: state.priceGraph,
    noofDays: state.selectedNoDays,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
