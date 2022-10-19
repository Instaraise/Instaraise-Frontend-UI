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
import { midusdformatter } from '../../../utils/formatNumber';
const Liquidity = (props) => {
    const [allTokens, setAllTokens] = React.useState(
        DEX_LIQUIDITY_TOKEN_CONFIG
    );
    const [tokenData, setTokenData] = React.useState([]);
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
    return (
        <div className='pb-5'>
            <div className='card_i shadow-sm'>
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
                <div className='table-responsive text-start'>
                    <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                        <TableHeader
                            setAllTokens={setAllTokens}
                            selectedNetwork={props.selectedNetwork}
                            allTokens={allTokens}
                        />
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
    fetchPoolStats: (payload) => dispatch(POOL_STATS(payload)),
    setLiquidityPoolPair: (payload) => dispatch(SELECT_POOL_PAIR(payload)),
    changeStakedValue: (payload) => dispatch(HANDLE_TOKEN_VALUE_POOLS(payload)),
    setStakedValue: (payload) => dispatch(SET_CONVERTED_VALUE_EMPTY(payload)),
});
const mapStateToProps = (state) => ({
    poolData: state.poolData,
});
export default connect(mapStateToProps, mapDispatchToProps)(Liquidity);
const LiquidityTrade = ({
    item,
    poolData,
    props,
    handleFavorite,
    tokenData,
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
                const data = poolData.data[0][item.DEX_ADDRESS];
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
    return (
        <tr className=' name-col fw-500 hover-class '>
            <td colSpan={5} className='col-sm-2 fixed-col name-col' scope='row'>
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
                <div className='my-2 d-flex align-items-center  justify-content-center div-block text-dark-to-light '>
                    {Data().liquidity ? midusdformatter(Data().liquidity) : '-'}
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='my-2 d-flex align-items-center  justify-content-center div-block text-dark-to-light '>
                    <div>{'-'}</div>
                </div>
            </td>
            <td
                colSpan={1}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className=' my-2 d-flex align-items-center justify-content-center div-block text-dark-to-light '>
                    {'-'}
                </div>
            </td>
            <td
                colSpan={2}
                style={{
                    minWidth: '180px',
                }}
            >
                <div className='my-2 d-flex align-items-center justify-content-center div-block text-dark-to-light '>
                    {'-'}
                </div>
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
                                // onClick={() => swapTokens(item)}
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
const TableHeader = () => {
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
                                    <path fill='none' d='M0 0h24v24H0z'></path>
                                    <path d='M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM5 4.604v9.185a4 4 0 0 0 1.781 3.328L12 20.597l5.219-3.48A4 4 0 0 0 19 13.79V4.604L12 3.05 5 4.604zM13 10h3l-5 7v-5H8l5-7v5z'></path>
                                </g>
                            </svg>
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
