import React from 'react';
import { MdSwapCalls } from 'react-icons/md';
import { RiShieldFlashFill, RiShieldFlashLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Graph from './Graph';
import { DEX_DATA_REFRESH_TIME } from '../../../config/config';
import { DEX_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import {
    CONVERT_TOKEN_VALUE_DEX_EMPTY_STATE,
    HANDLE_TOKEN_VALUES_DEX,
    TOKEN_STATS,
} from '../../../redux/actions/dex/action.dex';
import { DEX_INITIAL_DATA } from '../../../redux/reducers/dex/dex.reducer';
import { ThemeContext } from '../../../routes/root';
import { midusdformatter } from '../../../utils/formatNumber';
const TokenTables = (props) => {
    const [allTokens, setAllTokens] = React.useState(
        props.selectedNetwork === 'TESTNET'
            ? DEX_TOKEN_CONFIG
            : DEX_TOKEN_CONFIG
    );
    const { theme } = React.useContext(ThemeContext);
    const [flag] = React.useState(false);
    const [tokenData, setTokenData] = React.useState([]);
    const [selected, setSelected] = React.useState(false);
    const handleFavorite = (item) => {
        if (tokenData.includes(item.TOKEN_SYMBOL)) {
            const data = tokenData.filter(
                (token) => token !== item.TOKEN_SYMBOL
            );
            localStorage.setItem('favouriteTokens', JSON.stringify(data));
            setTokenData(data);
        } else {
            const data = [...tokenData, item.TOKEN_SYMBOL];
            localStorage.setItem('favouriteTokens', JSON.stringify(data));
            setTokenData([...tokenData, item.TOKEN_SYMBOL]);
        }
    };
    React.useEffect(() => {
        const data = localStorage.getItem('favouriteTokens');
        setTokenData(data ? JSON.parse(data) : []);
        props.fetchTokenStats();
    }, [allTokens]);

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
    const allFavouriteTokens = () => {
        const tokens = localStorage.getItem('favouriteTokens');
        if (JSON.parse(tokens).length > 0) {
            const data = JSON.parse(tokens).map((item) => {
                return allTokens.filter(
                    (data) => data.TOKEN_SYMBOL === item
                )[0];
            });
            setAllTokens(data);
            setSelected(true);
        }
    };
    var scrollTokensMobileView = (
        <>
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
                                        {selected ? (
                                            <RiShieldFlashFill
                                                color={
                                                    theme
                                                        ? '#4e5d78'
                                                        : '#ffffff'
                                                }
                                                size={25}
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    setAllTokens(
                                                        props.selectedNetwork ===
                                                            'TESTNET'
                                                            ? DEX_TOKEN_CONFIG
                                                            : DEX_TOKEN_CONFIG
                                                    );
                                                    setSelected(!selected);
                                                }}
                                            />
                                        ) : (
                                            <RiShieldFlashLine
                                                color={
                                                    theme
                                                        ? '#4e5d78'
                                                        : '#ffffff'
                                                }
                                                size={25}
                                                className='cursor-pointer'
                                                onClick={() =>
                                                    allFavouriteTokens()
                                                }
                                            />
                                        )}
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
                                <div className='fw-500 my-2'>Last 7 days</div>
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
                    <tbody className='text-14 position-relative'>
                        <tr>
                            <td></td>
                        </tr>
                        {allTokens.map((item, index) => (
                            <TokenTrade
                                key={index}
                                item={item}
                                tokenStats={props.tokenStats}
                                handleFavorite={handleFavorite}
                                tokenData={tokenData}
                                changeMarketValue={props.changeMarketValue}
                                flag={flag}
                                convertMarketValueEmptyState={
                                    props.convertMarketValueEmptyState
                                }
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
    var scrollTokenLargeView = (
        <>
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
                                        {selected ? (
                                            <RiShieldFlashFill
                                                color={
                                                    theme
                                                        ? '#4e5d78'
                                                        : '#ffffff'
                                                }
                                                size={25}
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    setAllTokens(
                                                        props.selectedNetwork ===
                                                            'TESTNET'
                                                            ? DEX_TOKEN_CONFIG
                                                            : DEX_TOKEN_CONFIG
                                                    );
                                                    setSelected(!selected);
                                                }}
                                            />
                                        ) : (
                                            <RiShieldFlashLine
                                                color={
                                                    theme
                                                        ? '#4e5d78'
                                                        : '#ffffff'
                                                }
                                                size={25}
                                                className='cursor-pointer'
                                                onClick={() =>
                                                    allFavouriteTokens()
                                                }
                                            />
                                        )}
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
                                <div className='fw-500 my-2'>Last 7 days</div>
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
                </table>
                <div
                    className='scroller-style'
                    style={{ height: '58vh', overflowY: 'scroll' }}
                >
                    <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                        <tbody className='text-14 position-relative'>
                            <tr>
                                <td></td>
                            </tr>
                            {allTokens.map((item, index) => (
                                <TokenTrade
                                    key={index}
                                    item={item}
                                    tokenStats={props.tokenStats}
                                    handleFavorite={handleFavorite}
                                    tokenData={tokenData}
                                    flag={!flag}
                                    changeMarketValue={props.changeMarketValue}
                                    convertMarketValueEmptyState={
                                        props.convertMarketValueEmptyState
                                    }
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
    return (
        <div className='pb-5'>
            <div className='card_i shadow-sm'>
                <div style={{ height: '82vh', overflowY: 'hidden' }}>
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
                    <div className='d-none d-lg-block'>
                        {scrollTokenLargeView}
                    </div>
                    <div className=' d-lg-none'>{scrollTokensMobileView}</div>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    fetchTokenStats: (payload) => dispatch(TOKEN_STATS(payload)),
    changeMarketValue: (payload) => dispatch(HANDLE_TOKEN_VALUES_DEX(payload)),
    convertMarketValueEmptyState: (payload) =>
        dispatch(CONVERT_TOKEN_VALUE_DEX_EMPTY_STATE(payload)),
});
const mapStateToProps = (state) => ({
    tokenStats: state.tokenStats,
    selectedNetwork: state.selectedNetwork,
});
export default connect(mapStateToProps, mapDispatchToProps)(TokenTables);
const TokenTrade = ({
    item,
    index,
    flag,
    tokenStats,
    handleFavorite,
    tokenData,
    changeMarketValue,
    convertMarketValueEmptyState,
}) => {
    const [isFavourite, setIsFavourite] = React.useState(false);
    const fetchFavouriteTokens = () => {
        const data = localStorage.getItem('favouriteTokens');
        setIsFavourite(data ? data.includes(item.TOKEN_SYMBOL) : false);
    };
    React.useEffect(() => {
        fetchFavouriteTokens();
    }, [tokenData]);
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
                    volume: data.volume * data.price,
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
    const url =
        item.TOKEN_NAME === 'insta'
            ? `/dex/swap?to=${DEX_TOKEN_CONFIG[1].DEX_ADDRESS}_${item.DECIMALS}&from=INSTA`
            : `/dex/swap?to=INSTA&from=${item.TOKEN_SYMBOL}`;
    return (
        <tr className=' name-col fw-500 hover-class '>
            <td colSpan={1} className='col-sm-2 fixed-col name-col' scope='row'>
                <div className='d-flex w-100 align-items-center justify-content-start div-block'>
                    <div className='me-2 me-lg-4 text-dark-to-light cursor-pointer'>
                        {isFavourite ? (
                            <RiShieldFlashFill
                                size={25}
                                className='cursor-pointer'
                                onClick={() => handleFavorite(item)}
                            />
                        ) : (
                            <RiShieldFlashLine
                                size={25}
                                className='cursor-pointer'
                                onClick={() => handleFavorite(item)}
                            />
                        )}
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
                {flag ? (
                    <div
                        className='text-center text-dark-to-light justify-content-center d-flex align-items-center div-block'
                        style={{ marginRight: '7%' }}
                    >
                        {Data().price ? `$${Data().price.toFixed(4)}` : '-'}
                    </div>
                ) : (
                    <div className='text-center text-dark-to-light justify-content-center d-flex align-items-center div-block'>
                        {Data().price ? `$${Data().price.toFixed(4)}` : '-'}
                    </div>
                )}
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='d-flex align-items-center div-block text-dark-to-light'>
                    {Data().change ? `${midusdformatter(Data().change)}%` : '-'}
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='d-flex align-items-center div-block text-dark-to-light'>
                    {Data().volume ? `$${midusdformatter(Data().volume)}` : '-'}
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
                        ? `$${midusdformatter(Data().liquidity)}`
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
                            onClick={() => {
                                changeMarketValue(null);
                                convertMarketValueEmptyState(DEX_INITIAL_DATA);
                            }}
                            to={url}
                            className='shadow-sm text-12 px-2 py-1 btn rounded btn-sm trade-button'
                        >
                            <MdSwapCalls
                                style={{ height: '1rem', width: '1rem' }}
                                className='mr-2'
                            />
                            Trade
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};
