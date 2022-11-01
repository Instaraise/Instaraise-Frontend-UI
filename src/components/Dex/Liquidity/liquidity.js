import React from 'react';
import { MdOutlineAddCircle } from 'react-icons/md';
import { RiSwapFill } from 'react-icons/ri';
import { RiShieldFlashFill, RiShieldFlashLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DEX_DATA_REFRESH_TIME } from '../../../config/config';
import { DEX_LIQUIDITY_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import {
    HANDLE_TOKEN_VALUE_POOLS,
    POOL_STATS,
    SELECT_POOL_PAIR,
    SET_CONVERTED_VALUE_EMPTY,
} from '../../../redux/actions/dex/action.liquidity';
import { ThemeContext } from '../../../routes/root';
import { midusdformatter } from '../../../utils/formatNumber';

const Liquidity = (props) => {
    const [allTokens, setAllTokens] = React.useState(
        props.selectedNetwork === 'TESTNET'
            ? DEX_LIQUIDITY_TOKEN_CONFIG
            : DEX_LIQUIDITY_TOKEN_CONFIG
    );
    const [tokenData, setTokenData] = React.useState([]);
    const [flag] = React.useState(false);
    const handleFavorite = (item) => {
        if (tokenData.includes(item.DEX_ADDRESS)) {
            const data = tokenData.filter(
                (token) => token !== item.DEX_ADDRESS
            );
            localStorage.setItem('favouritePoolTokens', JSON.stringify(data));
            setTokenData(data);
        } else {
            const data = [...tokenData, item.DEX_ADDRESS];
            localStorage.setItem('favouritePoolTokens', JSON.stringify(data));
            setTokenData([...tokenData, item.DEX_ADDRESS]);
        }
    };

    React.useEffect(() => {
        const data = localStorage.getItem('favouritePoolTokens');
        setTokenData(data ? JSON.parse(data) : []);
        props.fetchPoolStats();
    }, [allTokens]);
    //for fetching after every 1 min
    const refresh = () => {
        props.fetchPoolStats();
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
                return item.SECOND_TOKEN_NAME.toLowerCase().includes(
                    search.toLowerCase()
                );
            });
            setAllTokens(data);
        } else {
            setAllTokens(
                props.selectedNetwork === 'TESTNET'
                    ? DEX_LIQUIDITY_TOKEN_CONFIG
                    : DEX_LIQUIDITY_TOKEN_CONFIG
            );
        }
    };
    var scrollDexSmallScreen = (
        <>
            <div className='table-responsive text-start'>
                <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                    <TableHeader
                        setAllTokens={setAllTokens}
                        selectedNetwork={props.selectedNetwork}
                        allTokens={allTokens}
                    />
                    <tbody className='text-14 position-relative'>
                        <tr>
                            <td></td>
                        </tr>
                        {allTokens.map((item, index) => (
                            <LiquidityTrade
                                key={index}
                                item={item}
                                poolData={props.poolData}
                                props={props}
                                handleFavorite={handleFavorite}
                                tokenData={tokenData}
                                flag={flag}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    var scrollDexLargeScreen = (
        <>
            <div className='table-responsive text-start'>
                <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                    <TableHeader
                        setAllTokens={setAllTokens}
                        selectedNetwork={props.selectedNetwork}
                        allTokens={allTokens}
                    />
                </table>
                <div style={{ height: '58vh', overflowY: 'scroll' }}>
                    <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                        <tbody className='text-14 position-relative '>
                            <tr>
                                <td></td>
                            </tr>
                            {allTokens.map((item, index) => (
                                <LiquidityTrade
                                    key={index}
                                    item={item}
                                    poolData={props.poolData}
                                    props={props}
                                    handleFavorite={handleFavorite}
                                    tokenData={tokenData}
                                    flag={!flag}
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
                <div style={{ height: '82vh', overflowY: 'scroll' }}>
                    <div className='p-4 d-flex text-dark-to-light justify-content-between align-item-center'>
                        <h6 className='d-flex mt-1 flex-column justify-content-start p-0 text-dark-to-light fw-bold'>
                            Pools
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
                                placeholder='Search your Pair'
                                onChange={(e) => filterTokens(e.target.value)}
                                className='w-100  text-12 text-dark-to-light ms-2 text-start'
                            />
                        </div>
                    </div>
                    <div className='d-none d-lg-block'>
                        {scrollDexLargeScreen}
                    </div>
                    <div className=' d-lg-none'>{scrollDexSmallScreen}</div>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    fetchPoolStats: (payload) => dispatch(POOL_STATS(payload)),
    setLiquidityPoolPair: (payload) => dispatch(SELECT_POOL_PAIR(payload)),
    changeStakedValue: (payload) => dispatch(HANDLE_TOKEN_VALUE_POOLS(payload)),
    setStakedValue: (payload) => dispatch(SET_CONVERTED_VALUE_EMPTY(payload)),
});
const mapStateToProps = (state) => ({
    poolData: state.poolData,
    selectedNetwork: state.selectedNetwork,
});
export default connect(mapStateToProps, mapDispatchToProps)(Liquidity);
const LiquidityTrade = ({
    item,
    poolData,
    props,
    handleFavorite,
    tokenData,
    flag,
}) => {
    const [isFavourite, setIsFavourite] = React.useState(false);
    const fetchFavouriteTokens = () => {
        const data = localStorage.getItem('favouritePoolTokens');
        setIsFavourite(data ? data.includes(item.DEX_ADDRESS) : false);
    };
    React.useEffect(() => {
        fetchFavouriteTokens();
    }, [tokenData]);
    const navigate = useNavigate();
    const addLiquidity = (data, type) => {
        props.setLiquidityPoolPair(data);
        props.changeStakedValue('');
        props.setStakedValue();
        navigate(
            `/dex/liquidity/configure-liquidity?kt=${data.DEX_ADDRESS}&type=${type}`
        );
    };
    const Data = () => {
        if (!poolData.success) {
            return {
                liquidity: null,
                volume: null,
                fees: null,
                apr: null,
            };
        } else {
            try {
                const data = poolData.data[0][item.DEX_ADDRESS2];
                return {
                    liquidity: parseFloat(data.liquidity),
                    volume: parseFloat(data.volume),
                    fees: parseFloat(data.fees),
                    apr: parseFloat(data.apr),
                };
            } catch (err) {
                return {
                    liquidity: null,
                    volume: null,
                    fees: null,
                    apr: null,
                };
            }
        }
    };
    const swapTokens = (item) => {
        // token swap to -> from which token
        const url = `/dex/swap?to=${item.DEX_ADDRESS}_${item.DECIMALS}&from=${item.FIRST_TOKEN_SYMBOL}`;
        navigate(url);
    };
    return (
        <tr className=' name-col fw-500 hover-class '>
            <td
                colSpan={flag ? 1 : 5}
                className='col-sm-2 fixed-col name-col'
                scope='row'
            >
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
                    <div className='d-flex justify-content-center align-items-center p-2 image-background-color border-10'>
                        <img
                            src={item.FIRST_TOKEN_LOGO}
                            alt='token_logo'
                            width={30}
                            height={30}
                            style={{
                                zIndex: '1',
                                borderRadius: '100%',
                            }}
                        />
                        <img
                            src={item.SECOND_TOKEN_LOGO}
                            alt='token_logo'
                            style={{
                                marginLeft: '-10px',
                                borderRadius: '100%',
                            }}
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className='ms-2 text-dark-to-light'>
                        {item.FIRST_TOKEN_NAME}
                        <div className='text-mini text-dark-to-light'>
                            {item.SECOND_TOKEN_SYMBOL}
                        </div>
                    </div>
                </div>
            </td>
            <td
                colSpan={2}
                style={{
                    minWidth: '180px',
                }}
            >
                {flag ? (
                    <div
                        className='my-2 d-flex align-items-center  justify-content-center div-block text-dark-to-light'
                        style={{ marginLeft: '25%' }}
                    >
                        {Data().liquidity
                            ? `$${midusdformatter(Data().liquidity)}`
                            : '-'}
                    </div>
                ) : (
                    <div className='my-2 d-flex align-items-center  justify-content-center div-block text-dark-to-light'>
                        {Data().liquidity
                            ? `$${midusdformatter(Data().liquidity)}`
                            : '-'}
                    </div>
                )}
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                {flag ? (
                    <div
                        className='my-2 d-flex align-items-center  justify-content-center div-block text-dark-to-light'
                        style={{ marginLeft: '15%' }}
                    >
                        {Data().volume
                            ? `$${midusdformatter(Data().volume)}`
                            : '-'}
                    </div>
                ) : (
                    <div className='my-2 d-flex align-items-center  justify-content-center div-block text-dark-to-light'>
                        {Data().volume
                            ? `$${midusdformatter(Data().volume)}`
                            : '-'}
                    </div>
                )}
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                {flag ? (
                    <div
                        className=' my-2 d-flex align-items-center justify-content-center div-block text-dark-to-light'
                        style={{ marginRight: '10%' }}
                    >
                        {Data().fees ? `$${Data().fees}` : '-'}
                    </div>
                ) : (
                    <div className=' my-2 d-flex align-items-center justify-content-center div-block text-dark-to-light'>
                        {Data().fees ? `$${Data().fees}` : '-'}
                    </div>
                )}
            </td>
            <td
                colSpan={2}
                style={{
                    minWidth: '180px',
                }}
            >
                {flag ? (
                    <div
                        className='my-2 d-flex align-items-center justify-content-center div-block text-dark-to-light'
                        style={{ marginRight: '20%' }}
                    >
                        {Data().apr ? `${midusdformatter(Data().apr)}%` : '-'}
                    </div>
                ) : (
                    <div className='my-2 d-flex align-items-center justify-content-center div-block text-dark-to-light'>
                        {Data().apr ? `${midusdformatter(Data().apr)}%` : '-'}
                    </div>
                )}
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '120px',
                }}
            >
                <div className='my-2 d-flex align-items-center justify-content-center div-block'>
                    <div>
                        <div className='my-2 d-flex align-items-center justify-content-center'>
                            <button
                                onClick={() => addLiquidity(item, 'add')}
                                className='shadow-sm text-12 px-1 m-auto py-1 btn rounded btn-sm trade-button'
                            >
                                <MdOutlineAddCircle size={20} />
                            </button>
                        </div>
                    </div>
                    <div className='ms-3'>
                        <div className='my-2 d-flex align-items-center justify-content-center'>
                            <button
                                onClick={() => swapTokens(item)}
                                className='shadow-sm ms-2 text-12 px-1 m-auto py-1 btn rounded btn-sm trade-button'
                            >
                                <RiSwapFill size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};
const TableHeader = ({ setAllTokens, allTokens, selectedNetwork }) => {
    const [selected, setSelected] = React.useState(false);
    const { theme } = React.useContext(ThemeContext);
    const allFavouriteTokens = () => {
        const tokens = localStorage.getItem('favouritePoolTokens');
        if (tokens && JSON.parse(tokens).length > 0) {
            const data = JSON.parse(tokens).map((item) => {
                return allTokens.filter((data) => data.DEX_ADDRESS === item)[0];
            });
            setAllTokens(data);
            setSelected(true);
        }
    };
    return (
        <thead className='mx-3 font-12 fw-light'>
            <tr
                className='margin-header image-background-color border-10'
                style={{
                    color: '#b5b5c3',
                }}
            >
                <th
                    className='col-sm-2  image-background-color name-col-l'
                    colSpan={5}
                    style={{
                        minWidth: '80px',
                        position: 'sticky',
                        left: '0',
                        zIndex: '1',
                    }}
                >
                    <div className='fw-500 d-flex align-items-center justify-content-start  my-2'>
                        <div className='me-0 me-lg-3 me-md-3'>
                            {selected ? (
                                <RiShieldFlashFill
                                    color={theme ? '#4e5d78' : '#ffffff'}
                                    size={25}
                                    className='cursor-pointer'
                                    onClick={() => {
                                        setAllTokens(
                                            selectedNetwork === 'TESTNET'
                                                ? DEX_LIQUIDITY_TOKEN_CONFIG
                                                : DEX_LIQUIDITY_TOKEN_CONFIG
                                        );
                                        setSelected(!selected);
                                    }}
                                />
                            ) : (
                                <RiShieldFlashLine
                                    color={theme ? '#4e5d78' : '#ffffff'}
                                    size={25}
                                    className='cursor-pointer'
                                    onClick={() => allFavouriteTokens()}
                                />
                            )}
                        </div>
                        <div>&nbsp;Name</div>
                    </div>
                </th>
                <th
                    colSpan={2}
                    style={{
                        minWidth: '100px',
                    }}
                >
                    <div className=' fw-500 text-center my-2 '>Liquidity</div>
                </th>
                <th
                    style={{
                        minWidth: '120px',
                    }}
                >
                    <div className=' fw-500 my-2 text-center'>Volume</div>
                </th>
                <th
                    style={{
                        minWidth: '120px',
                    }}
                >
                    <div className=' fw-500 my-2 text-center'>Fees</div>
                </th>
                <th
                    colSpan={2}
                    style={{
                        minWidth: '180px',
                    }}
                >
                    <div className=' my-2  fw-500 text-center'>APR</div>
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
    );
};
