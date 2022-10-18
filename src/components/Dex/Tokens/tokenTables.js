import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Graph from './Graph';
import { DEX_DATA_REFRESH_TIME } from '../../../config/config';
import { DEX_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import { TOKEN_STATS } from '../../../redux/actions/dex/action.dex';
import { midusdformatter } from '../../../utils/formatNumber';
const TokenTables = (props) => {
    const [allTokens, setAllTokens] = React.useState(DEX_TOKEN_CONFIG);
    React.useEffect(() => {
        props.fetchTokenStats();
    }, []);

    //for fetching after every 1 min
    const refresh = () => {
        props.fetchTokenStats();
    };
    React.useEffect(() => {
        const interval = setInterval(function () {
            refresh();
        }, DEX_DATA_REFRESH_TIME);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const filterTokens = (search) => {
        if (search) {
            const data = allTokens.filter((item) => {
                return item.TOKEN_SYMBOL.toLowerCase().includes(
                    search.toLowerCase()
                );
            });
            setAllTokens(data);
        } else {
            setAllTokens(
                props.selectedNetwork === 'TESTNET'
                    ? DEX_TOKEN_CONFIG
                    : DEX_TOKEN_CONFIG
            );
        }
    };
    return (
        <div className='pb-5'>
            <div className='card_i shadow-sm'>
                <div className='p-4 d-flex text-dark-to-light justify-content-between align-item-center'>
                    <h6 className='d-flex mt-1 flex-column justify-content-start p-0 text-dark-to-light fw-bold'>
                        Tokens
                    </h6>
                    <div className='py-2 d-flex align-items-center px-2 border-10 search-background-change'>
                        <svg
                            stroke='currentColor'
                            fill='currentColor'
                            strokeWidth='0'
                            viewBox='0 0 24 24'
                            height='1em'
                            width='1em'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'></path>
                        </svg>
                        <input
                            placeholder='Search your token'
                            onChange={(e) => filterTokens(e.target.value)}
                            className='w-100  text-12 text-dark-to-light ms-2 text-start'
                        />
                    </div>
                </div>
                <div className='table-responsive text-start'>
                    <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                        <thead className='mx-3 font-12 fw-light'>
                            <tr
                                className='margin-header image-background-color border-10'
                                style={{
                                    color: '#b5b5c3',
                                }}
                                colSpan={2}
                            >
                                <th
                                    className=' image-background-color name-col-l'
                                    style={{
                                        minWidth: '80px',
                                        position: 'sticky',
                                        left: '0px',
                                        zIndex: '1',
                                    }}
                                >
                                    <div className='fw-500 d-flex align-items-center justify-content-start  my-2'>
                                        <div className='me-0 me-lg-3 me-md-3'>
                                            <svg
                                                stroke='currentColor'
                                                fill='#4e5d78'
                                                strokeWidth='0'
                                                viewBox='0 0 24 24'
                                                className='cursor-pointer'
                                                height='25'
                                                width='25'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g>
                                                    <path
                                                        fill='none'
                                                        d='M0 0h24v24H0z'
                                                    ></path>
                                                    <path d='M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM5 4.604v9.185a4 4 0 0 0 1.781 3.328L12 20.597l5.219-3.48A4 4 0 0 0 19 13.79V4.604L12 3.05 5 4.604zM13 10h3l-5 7v-5H8l5-7v5z'></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div>Name</div>
                                    </div>
                                </th>
                                <th
                                    style={{
                                        minWidth: '100px',
                                    }}
                                >
                                    <div className='fw-500  text-center my-2 '>
                                        <div className='fw-500  text-center my-2 '>
                                            Price
                                        </div>
                                    </div>
                                </th>
                                <th
                                    style={{
                                        minWidth: '120px',
                                    }}
                                >
                                    <div className='fw-500 my-2'>
                                        <div className='fw-500 my-2'>
                                            24h Change
                                        </div>
                                    </div>
                                </th>
                                <th
                                    style={{
                                        minWidth: '120px',
                                    }}
                                >
                                    <div className='fw-500 my-2'>
                                        <div className='fw-500 my-2'>
                                            24h Volume
                                        </div>
                                    </div>
                                </th>
                                <th
                                    style={{
                                        minWidth: '120px',
                                    }}
                                >
                                    <div className='fw-500 my-2'>Liquidity</div>
                                </th>
                                <th
                                    style={{
                                        minWidth: '120px',
                                    }}
                                >
                                    <div className='fw-500 my-2'>
                                        Last 7 days
                                    </div>
                                </th>
                                <th
                                    className='col-sm-2 name-col-r'
                                    colSpan={0.5}
                                    style={{
                                        minWidth: '100px',
                                    }}
                                >
                                    <div className='px-3 my-2'></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-14 position-relative '>
                            <tr>
                                <td></td>
                            </tr>
                            {allTokens.map((item, index) => (
                                <TokenTrade
                                    key={index}
                                    item={item}
                                    tokenStats={props.tokenStats}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    fetchTokenStats: (payload) => dispatch(TOKEN_STATS(payload)),
});
const mapStateToProps = (state) => ({
    tokenStats: state.tokenStats,
});
export default connect(mapStateToProps, mapDispatchToProps)(TokenTables);
const TokenTrade = ({ item, index, tokenStats }) => {
    const Data = () => {
        if (tokenStats.success) {
            try {
                const data = tokenStats.data.filter(
                    (pool) =>
                        pool.token_name.toLowerCase() ===
                        item.TOKEN_NAME.toLowerCase()
                )[0];

                return {
                    token_name: data.token_name,
                    price: parseFloat(data.price),
                    change: parseFloat(data.change),
                    volume: data.volume,
                    liquidity: parseFloat(data.liquidity),
                    graph_data: data.last_week_change,
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
    return (
        <tr className=' name-col fw-500 hover-class '>
            <td colSpan={1} className='col-sm-2 fixed-col name-col' scope='row'>
                <div className='d-flex w-100 align-items-center justify-content-start div-block'>
                    <div className='me-2 me-lg-4 text-dark-to-light cursor-pointer'>
                        <svg
                            stroke='currentColor'
                            fill='currentColor'
                            strokeWidth='0'
                            viewBox='0 0 24 24'
                            height='25'
                            width='25'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <g>
                                <path fill='none' d='M0 0h24v24H0z'></path>
                                <path d='M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM5 4.604v9.185a4 4 0 0 0 1.781 3.328L12 20.597l5.219-3.48A4 4 0 0 0 19 13.79V4.604L12 3.05 5 4.604zM13 10h3l-5 7v-5H8l5-7v5z'></path>
                            </g>
                        </svg>
                    </div>

                    <div
                        key={index}
                        className='p-2 image-background-color border-10'
                    >
                        <img
                            src={item.TOKEN_LOGO}
                            alt='token_logo'
                            style={{
                                borderRadius: '100%',
                            }}
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className='ms-2 text-dark-to-light'>
                        {item.TOKEN_SYMBOL}
                        <div className='text-mini text-dark-to-light'>
                            {item.TOKEN_NAME}
                        </div>
                    </div>
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='text-center text-dark-to-light justify-content-center d-flex align-items-center div-block ml-3'>
                    {midusdformatter(Data().price) || '-'}
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='d-flex align-items-center div-block text-dark-to-light'>
                    {Data().change || '-'}
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                    overflowX: 'scroll',
                }}
            >
                <div className='d-flex align-items-center div-block text-dark-to-light'>
                    {Data().volume ? midusdformatter(Data().volume) : '-'}
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='d-flex align-items-center div-block text-dark-to-light'>
                    {Data().liquidity
                        ? midusdformatter(Data().liquidity.toFixed(5))
                        : '-'}
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='d-flex align-items-center div-block'>
                    <Graph data={Data().graph_data} />
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '120px',
                }}
            >
                <div className='d-flex align-items-center justify-content-center div-block text-dark-to-light'>
                    <div>
                        <Link
                            // onClick={() => {
                            //     changeMarketValue(null);
                            //     convertMarketValueEmptyState(DEX_INITIAL_DATA);
                            // }}
                            to={'#'}
                            className='shadow-sm text-12 px-4 py-1 btn rounded btn-sm trade-button'
                        >
                            Trade
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};
