import React from 'react';
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

import { DEX_DATA_REFRESH_TIME } from '../../../config/config';
import { TOKEN_STATS } from '../../../redux/actions/dex/action.dex';
import { numberOfDays } from '../../../redux/actions/graph.action';
import { ThemeContext } from '../../../routes/root';
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
const AnalyticsGraph = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const Data = () => {
        if (props.tokenStats.success) {
            try {
                const data = props.tokenStats.data.filter(
                    (pool) =>
                        pool.token_name.toLowerCase() ===
                        props.selectedToken.from.TOKEN_SYMBOL.toLowerCase()
                )[0];
                return {
                    token_name: data.token_name,
                    price: parseFloat(data.price),
                    change: parseFloat(data.change),
                    volume: data.volume * data.price,
                    liquidity: parseFloat(data.liquidity),
                    graph_data:
                        props.noofDays === 1
                            ? data.graph_data.prices.daily
                            : props.noofDays === 7
                            ? data.last_week_change
                            : data.graph_data.prices.monthly,
                };
            } catch (error) {
                return {
                    token_name: null,
                    price: null,
                    change: null,
                    volume: null,
                    liquidity: null,
                    graph_data: [],
                };
            }
        } else {
            return {
                token_name: null,
                price: null,
                change: null,
                volume: null,
                liquidity: null,
                graph_data: [],
            };
        }
    };
    const data_2 = Object.entries(Data().graph_data).map((data) => {
        return {
            name: new Date(parseInt(data[0])),
            pv: data[1],
        };
    });
    //for fetching after every 1 min
    const refresh = () => {
        props.fetchTokenStats();
    };
    React.useEffect(() => {
        refresh();
        const interval = setInterval(function () {
            refresh();
        }, DEX_DATA_REFRESH_TIME);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className='h-100 w-100'>
            <div className='text-center d-flex flex-column flex-lg-row flex-sm-row flex-md-row justify-content-between align-items-center my-3 p-md-3 p-lg-0'>
                <div className='d-flex order-2 order-lg-0 order-md-0 order-sm-0 my-2 my-lg-0 my-sm-0 my-md-0'>
                    <div className=' cursor-pointer'>
                        <span className='px-1 text-toggle-selected'>Price</span>
                    </div>
                </div>
                <h6 className='m-0 text-insta-regular text-14'>
                    {`$${Data().token_name} performance chart`}
                </h6>
                <div className='d-flex mt-2 mt-lg-0 mt-sm-0 mt-md-0'>
                    <div className='cursor-pointer'>
                        <span
                            className={`
                    px-1 border-right
                    ${
                        props.noofDays === 1
                            ? 'text-toggle-selected'
                            : 'text-toggle'
                    }
                    `}
                            onClick={() => {
                                props.changeDays(1);
                            }}
                        >
                            24h
                        </span>
                    </div>
                    <div className='cursor-pointer'>
                        <span
                            className={`
                px-1 border-right
                ${props.noofDays === 7 ? 'text-toggle-selected' : 'text-toggle'}
                `}
                            onClick={() => {
                                props.changeDays(7);
                            }}
                        >
                            7d
                        </span>
                    </div>
                    {/* <div className='cursor-pointer'>
                        <span
                            className={`
                 px-1 border-right
                 ${
                     props.noofDays === 14
                         ? 'text-toggle-selected'
                         : 'text-toggle'
                 }
                 `}
                            onClick={() => {
                                props.changeDays(14);
                            }}
                        >
                            14d
                        </span>
                    </div> */}
                    <div className=' cursor-pointer'>
                        <span
                            className={
                                props.noofDays === 30
                                    ? 'text-toggle-selected px-1'
                                    : 'text-toggle px-1'
                            }
                            onClick={() => {
                                props.changeDays(30);
                            }}
                        >
                            30d
                        </span>
                    </div>
                </div>
            </div>
            <div className='d-flex pb-lg-3 pb-xl-3 p-3 p-lg-0 p-xl-0'>
                <div className='pr-2 '>{Data().price}</div>
                <div
                    className={
                        Data().change >= 0
                            ? 'greenColorChange'
                            : 'redColorChange'
                    }
                >
                    {Data().change}%
                </div>
            </div>
            <div
                className='p-3 p-lg-0 p-xl-0'
                style={{
                    width: '100%',
                    height: '65%',
                }}
            >
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={data_2}>
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
                                const x = new Date(value).getHours();
                                const y = new Date(value).getDate();
                                if (props.noofDays === 1) {
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
                                return `$${value.PrecisionMaker(5)}`;
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
                                boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
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
    );
};
const mapDispatchToProps = (dispatch) => ({
    changeDays: (payload) => dispatch(numberOfDays(payload)),
    fetchTokenStats: (payload) => dispatch(TOKEN_STATS(payload)),
});
const mapStateToProps = (state) => ({
    graphData: state.priceGraph,
    noofDays: state.selectedNoDays,
    selectedNetwork: state.selectedNetwork,
    tokenStats: state.tokenStats,
    selectedToken: state.selectedToken,
});
export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsGraph);
