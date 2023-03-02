// eslint-disable-next-line
import React, { useRef, useReducer } from 'react';
import { Fade } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import BigNumber from 'bignumber.js';
import {
    BiChevronDown,
    BiChevronUp,
    BiLoaderAlt,
    BiRefresh,
} from 'react-icons/bi';
import { FaTools } from 'react-icons/fa';
import AnalyticsGraph from './AnalyticsGraph';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from 'react-icons/ai';

import { useDebouncedCallback } from 'use-debounce';

import DexModal from '../../Modals/DexModals/DexModal';
import MainModal from '../../Modals/index';
import VariableWidthToolTip from '../../Tooltip';
import VariableToolTip from '../../Tooltip2';
import { DEX_DATA_REFRESH_TIME } from '../../../config/config';
import { DEX_FEE } from '../../../config/config';
import { DEX_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import {
    CONVERT_TOKENS,
    CONVERT_TOKEN_VALUE_DEX,
    CONVERT_TOKEN_VALUE_DEX_EMPTY_STATE,
    GET_PRICE_IMPACT,
    HANDLE_TOKEN_VALUES_DEX,
    SELECTED_TOKEN_DEX,
} from '../../../redux/actions/dex/action.dex';
import { GET_TOKEN_BALANCE } from '../../../redux/actions/dex/action.liquidity';
import { tokenInfo } from '../../../redux/actions/stats.action';
import { switchAddress } from '../../../redux/actions/wallet/action.wallet';
import { DEX_INITIAL_STATE } from '../../../redux/reducers/dex/dex.reducer';
import { DEX_INITIAL_DATA } from '../../../redux/reducers/dex/dex.reducer';
import { ThemeContext } from '../../../routes/root';
import {
    checkValidTokenAddress,
    getTokenData,
} from '../../../utils/getTokenData';

const Swap_Dex = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const notify = (errorMessage) => toast(errorMessage);
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    function reducer(state, action) {
        switch (action.type) {
            case 'currency':
                return { ...state, currencyType: action.value };
            case 'slippage':
                return { ...state, slippage: action.value };
            case 'operationid':
                return { ...state, operationId: action.value };
            case 'loading':
                return { ...state, loading: action.value };
            case 'swaploader':
                return { ...state, swapLoader: action.value };
            case 'stakestate':
                return { ...state, stakeState: action.value };
            case 'modalstate':
                return { ...state, modalState: action.value };

            case 'transfer':
                return { ...state, transfer: action.value };
            case 'openstats':
                return { ...state, openStats: action.value };
            case 'modaltype':
                return { ...state, modalType: action.value };
            default:
                return state;
        }
    }
    const [swaps, dispatch] = useReducer(reducer, {
        currencyType: 'Coin',
        slippage: 1,
        operationId: '',
        loading: false,
        swapLoader: false,
        stakeState: 'market',
        modalState: false,
        transfer: 'to',
        openStats: false,
        modalType: null,
    });
    const {
        loading,
        currencyType,
        slippage,
        stakeState,
        swapLoader,
        modalState,
        transfer,
        openStats,
        modalType,
        operationId,
    } = swaps;
    const search = window.location.search;
    const limit =
        currencyType === 'Coin'
            ? Number(props.handle_pay_values_market) >
              Number(props.tokenBalance)
            : Number(props.convert_pay_values_market.data.token2_price) >
              Number(props.tokenBalance);
    const ref = useRef();
    const { selectedToken } = props;
    const isFromSelected =
        selectedToken.to.TOKEN_SYMBOL &&
        selectedToken.to.TOKEN_ADDRESS &&
        selectedToken.to.TOKEN_LOGO
            ? true
            : false;
    const handleClose = () => {
        dispatch({ type: 'modalstate', value: false });
    };
    const handleSlippage = (e) => {
        dispatch({ type: 'slippage', value: e.target.value });
    };
    const minimumReceived = new BigNumber(
        props.convert_pay_values_market.data.convertedValue
    )
        .multipliedBy(1 - new BigNumber(slippage).dividedBy(100))
        .multipliedBy(1 - new BigNumber(DEX_FEE).dividedBy(100))
        .toString();
    const changeValues = async () => {
        if (!isFromSelected) {
            return;
        }
        if (!isFromSelected) {
            return;
        }
        dispatch({
            type: 'loading',
            value: true,
        });
        navigate(
            `?to=${selectedToken.from.DEX_ADDRESS}_${selectedToken.from.DECIMALS}&from=${selectedToken.to.TOKEN_SYMBOL}`
        );
        props.setSelectedTokens({
            to: selectedToken.from,
            from: selectedToken.to,
        });
        const data = {
            status: currencyType === 'Coin' ? false : true,
            token1: props.selectedToken.to.TOKEN_NAME,
            token2: props.selectedToken.from.TOKEN_NAME,
            number: Number(props.handle_pay_values_market),
            DEX_TO_ADDRESS: props.selectedToken.from.DEX_ADDRESS,
            DEX_FROM_ADDRESS: props.selectedToken.to.DEX_ADDRESS,
            selectedNetwork: props.selectedNetwork,
            DECIMAL: props.selectedToken.from.DECIMALS,
            tokenType: props.selectedToken.from.TOKEN_TYPE,
            tokenId: props.selectedToken.from.TOKEN_ID,
        };
        if (!props.handle_pay_values_market) {
            dispatch({
                type: 'loading',
                value: false,
            });
            return;
        }

        props.getTokenBalance({
            network: props.selectedNetwork,
            tokenId: props.selectedToken.from.TOKEN_ID,
            tokenType: props.selectedToken.from.TOKEN_TYPE,

            DECIMAL: props.selectedToken.from.DECIMALS,
        });
        const response = await props.convertMarketValue(data);
        if (response.payload.success) {
            dispatch({
                type: 'loading',
                value: false,
            });
        } else {
            dispatch({
                type: 'loading',
                value: false,
            });
        }
    };
    const debounced = useDebouncedCallback(
        async (value, data) => {
            if (Number(props.handle_pay_values_market) !== 0) {
                if (value) {
                    const response = await props.convertMarketValue(data);
                    const limit =
                        currencyType === 'Coin'
                            ? Number(props.handle_pay_values_market) >
                              Number(props.tokenBalance)
                            : Number(
                                  props.convert_pay_values_market.data
                                      .token2_price
                              ) > Number(props.tokenBalance);
                    if (response.payload.success && !limit) {
                        props.getPriceImpact({
                            DEX_TO_ADDRESS: props.selectedToken.to.DEX_ADDRESS,
                            DEX_FROM_ADDRESS:
                                props.selectedToken.from.DEX_ADDRESS,
                            tokenAmount: value,
                            tokenReceived: response.payload.data.convertedValue,
                        });
                        dispatch({
                            type: 'loading',
                            value: false,
                        });
                    } else {
                        dispatch({
                            type: 'loading',
                            value: false,
                        });
                    }
                } else {
                    props.convertMarketValueEmptyState(DEX_INITIAL_DATA);
                    dispatch({
                        type: 'loading',
                        value: false,
                    });
                }
            } else {
                props.convertMarketValueEmptyState(DEX_INITIAL_DATA);
                dispatch({
                    type: 'loading',
                    value: false,
                });
            }
        },
        // delay in ms
        1000
    );
    const handleChange = async (value) => {
        dispatch({
            type: 'loading',
            value: true,
        });
        props.changeMarketValue(value);

        const data = {
            status: currencyType === 'Coin' ? false : true,
            token1: props.selectedToken.from.TOKEN_NAME,
            token2: props.selectedToken.to.TOKEN_NAME,
            number: Number(value),
            DEX_TO_ADDRESS: props.selectedToken.to.DEX_ADDRESS,
            DEX_FROM_ADDRESS: props.selectedToken.from.DEX_ADDRESS,
            selectedNetwork: props.selectedNetwork,
            DECIMAL: props.selectedToken.from.DECIMALS,
            tokenType: props.selectedToken.from.TOKEN_TYPE,
            tokenId: props.selectedToken.from.TOKEN_ID,
        };

        debounced(value, data);
    };

    const swapTokens = async () => {
        dispatch({ type: 'swaploader', value: true });
        if (limit) {
            notify('Insuffcient balance');
            dispatch({ type: 'swaploader', value: false });
            return;
        }
        if (!props.handle_pay_values_market) {
            notify('Please enter a valid number');
            dispatch({ type: 'swaploader', value: false });
            return;
        }
        dispatch({
            type: 'modaltype',
            value: 'transfer',
        });
        if (!loading) {
            const response = await props.convertTokens({
                source: props.selectedToken.from.TOKEN_NAME,
                destination: props.selectedToken.to.TOKEN_NAME,
                sourceTokenId: props.selectedToken.from.TOKEN_ID,
                destinationTokenId: props.selectedToken.to.TOKEN_ID,
                sourceDecimals: props.selectedToken.from.DECIMALS,
                destinationDecimals: props.selectedToken.to.DECIMALS,
                selectedNetwork: props.selectedNetwork,
                amountConvention: currencyType,
                dexSourceAddress: props.selectedToken.from.DEX_ADDRESS,
                dexDestinationAddress: props.selectedToken.to.DEX_ADDRESS,
                amount:
                    currencyType === 'Coin'
                        ? props.handle_pay_values_market
                        : props.convert_pay_values_market.data.token1_price,
                sourceTokenType: props.selectedToken.from.TOKEN_TYPE,
                destinationTokenType: props.selectedToken.to.TOKEN_TYPE,
                sourceTokenAddress: props.selectedToken.from.TOKEN_ADDRESS,
                destinationTokenAddress: props.selectedToken.to.TOKEN_ADDRESS,
                slippage: slippage,
            });
            if (response.payload.status) {
                dispatch({
                    type: 'openstats',
                    value: false,
                });
                dispatch({
                    type: 'modaltype',
                    value: 'success',
                });
                dispatch({
                    type: 'operationid',
                    value: response.payload.operationId,
                });
                dispatch({ type: 'swaploader', value: false });
                props.changeMarketValue(null);
                props.convertMarketValueEmptyState(DEX_INITIAL_DATA);
                navigate(location.pathname + location.search);
                props.getTokenBalance({
                    network: props.selectedNetwork,
                    tokenId: props.selectedToken.from.TOKEN_ID,
                    tokenType: props.selectedToken.from.TOKEN_TYPE,
                    DECIMAL: props.selectedToken.from.DECIMALS,
                });
            } else {
                dispatch({
                    type: 'openstats',
                    value: false,
                });
                dispatch({
                    type: 'modaltype',
                    value: 'error',
                });
                dispatch({ type: 'swaploader', value: false });
                props.changeMarketValue(null);
                props.convertMarketValueEmptyState(DEX_INITIAL_DATA);
                props.getTokenBalance({
                    network: props.selectedNetwork,
                    tokenId: props.selectedToken.from.TOKEN_ID,
                    tokenType: props.selectedToken.from.TOKEN_TYPE,
                    DECIMAL: props.selectedToken.from.DECIMALS,
                });
            }
        }
    };
    //this is for mouse click down after settings is open
    React.useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                isSettingsOpen &&
                ref.current &&
                !e.target.classList.contains('settings-icon') &&
                !ref.current.contains(e.target)
            ) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [isSettingsOpen]);
    React.useEffect(() => {
        if (search) {
            refresh(search);
        } else {
            props.setSelectedTokens(DEX_INITIAL_STATE);
            navigate(
                `/dex/swap?to=INSTA_9&from=${DEX_TOKEN_CONFIG[1].TOKEN_SYMBOL}`
            );
        }
    }, [search, props.wallet]);
    React.useEffect(() => {
        const interval = setInterval(function () {
            if (search) {
                refresh(search);
            } else {
                props.setSelectedTokens(DEX_INITIAL_STATE);
            }
        }, DEX_DATA_REFRESH_TIME);
        return () => {
            clearInterval(interval);
        };
    }, [props.wallet, search, props.handle_pay_values_market]);
    const refresh = async (search) => {
        props.fetchTokenInfo();
        try {
            if (search) {
                const separatedSearchTerms = search.split('=');
                const to = search.includes('to=')
                    ? separatedSearchTerms[separatedSearchTerms.length - 2]
                          .split('&')[0]
                          .split('_')[0]
                    : null;
                const from =
                    separatedSearchTerms[separatedSearchTerms.length - 1];
                const response = checkValidTokenAddress(
                    to,
                    from,
                    search
                    // props.selectedNetwork
                );

                if (response.status) {
                    notify(response.error);
                    navigate(
                        `/dex/swap?to=INSTA_9&from=${DEX_TOKEN_CONFIG[1].TOKEN_SYMBOL}`
                    );
                } else {
                    const data = getTokenData(to, from);
                    props.getTokenBalance({
                        network: props.selectedNetwork,
                        tokenId: data.from.TOKEN_ID,
                        tokenType: data.from.TOKEN_TYPE,
                        DECIMAL: data.from.DECIMALS,
                    });
                    props.setSelectedTokens(data);
                }
            }
        } catch (error) {
            props.setSelectedTokens(DEX_INITIAL_STATE);
        }
        dispatch({
            type: 'loading',
            value: true,
        });
        if (props.handle_pay_values_market && props.wallet) {
            const data = {
                status: currencyType === 'Coin' ? false : true,
                token1: props.selectedToken.from.TOKEN_NAME,
                token2: props.selectedToken.to.TOKEN_NAME,
                number: Number(props.handle_pay_values_market),
                DEX_TO_ADDRESS: props.selectedToken.to.DEX_ADDRESS,
                DEX_FROM_ADDRESS: props.selectedToken.from.DEX_ADDRESS,
                selectedNetwork: props.selectedNetwork,
                DECIMAL: props.selectedToken.from.DECIMALS,
                tokenType: props.selectedToken.from.TOKEN_TYPE,
                tokenId: props.selectedToken.from.TOKEN_ID,
            };
            const response = await props.convertMarketValue(data);
            props.getPriceImpact({
                DEX_TO_ADDRESS: props.selectedToken.to.DEX_ADDRESS,
                DEX_FROM_ADDRESS: props.selectedToken.from.DEX_ADDRESS,
                tokenAmount: props.handle_pay_values_market,
                tokenReceived: response.payload.data.convertedValue,
            });
        }

        dispatch({
            type: 'loading',
            value: false,
        });
    };
    return (
        <>
            <MainModal
                setModalType={(value) =>
                    dispatch({
                        type: 'modaltype',
                        value: value,
                    })
                }
                modalType={modalType}
                operationId={operationId}
                type='error'
            />
            <DexModal
                isOpen={modalState}
                handleClose={handleClose}
                currencyType={currencyType}
                transfer={transfer}
            />
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme={!theme ? 'dark' : 'light'}
                progressStyle={{
                    backgroundColor: '#5a1eab',
                }}
                pauseOnHover
            />
            <div className='container text-dark-to-light'>
                <div className='d-none d-lg-block'>
                    <div className='row px-0 mt-5 d-flex justify-content-center'>
                        {!props.showAnalytics ? (
                            <div
                                style={{
                                    marginTop: '60px',
                                    marginBottom: '30px',
                                }}
                                className='col-sm p-0 col-lg-4  mt-lg-0  d-flex justify-content-center  align-items-center mx-0 mx-lg-2'
                            >
                                <div className='dex p-2 token-information position-relative w-100 shadow-sm'>
                                    <Fade
                                        appear={true}
                                        ref={ref}
                                        in={isSettingsOpen}
                                    >
                                        <div
                                            className='p-3 token-information border-l settings-icon'
                                            onClick={() => {
                                                setIsSettingsOpen(true);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '50px',
                                                border: '1px solid #e6e6e6',
                                                width: '280px',
                                                right: '18px',
                                                zIndex: '10',
                                                borderRadius: '20px',
                                            }}
                                        >
                                            <p className='text-sm fw-600 m-0 my-2 settings-icon'>
                                                Transaction settings
                                            </p>
                                            <p className='text-12 m-0 d-flex settings-icon'>
                                                Slippage tolerance
                                                <div className=' ml-2 '>
                                                    <VariableWidthToolTip text='Your transaction will revert if the price changes unfavorably by more than this percentage' />
                                                </div>
                                            </p>
                                            <div className='d-flex justify-content-end align-items-center mb-1 mt-2'>
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'slippage',
                                                                value: 1,
                                                            });
                                                        }}
                                                        className={`
                                                             badge-button-selected
                                                     py-1 fw-600 settings-icon text-12 me-2  my-1 shadow-none btn btn-sm`}
                                                    >
                                                        Auto
                                                    </button>
                                                </div>

                                                <input
                                                    onChange={handleSlippage}
                                                    value={slippage}
                                                    style={{
                                                        width: '80%',
                                                    }}
                                                    className='settings-icon py-1 fw-600 text-12 me-2 badge-button my-1 shadow-none text-end border-10 '
                                                    placeholder='Enter...'
                                                />

                                                <p className='settings-icon py-1 fw-600 text-12 me-2 my-1 shadow-none text-end border-10'>
                                                    %
                                                </p>
                                            </div>{' '}
                                            <div className='settings-icon d-flex justify-content-end align-items-center my-1'>
                                                {[1, 2, 3].map(
                                                    (item, index) => (
                                                        <div key={index}>
                                                            <button
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: 'slippage',
                                                                        value: item,
                                                                    });
                                                                }}
                                                                className={`${
                                                                    item ===
                                                                    slippage
                                                                        ? 'badge-button-selected'
                                                                        : 'badge-button'
                                                                } fw-600  settings-icon text-mini me-2  shadow-none border-10 btn btn-sm`}
                                                            >
                                                                {item}%
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>{' '}
                                            <p className='settings-icon text-sm fw-600 m-0 my-2'>
                                                Interface settings
                                            </p>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <p className='settings-icon text-12 m-0 d-flex align-items-center'>
                                                    Analytics &nbsp;
                                                    <VariableWidthToolTip text='Coming soon' />
                                                </p>

                                                <div className='d-flex align-items-center justify-content-start'>
                                                    <div className='text-12 fw-bold'>
                                                        <svg
                                                            viewBox='0 0 23 22'
                                                            color={
                                                                !theme
                                                                    ? '#fff'
                                                                    : '#4e5d78'
                                                            }
                                                            width='20px'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='sc-bdvvtL EyabU'
                                                        >
                                                            <path
                                                                d='M21.5 1l-20 20'
                                                                strokeWidth='2'
                                                                stroke={
                                                                    !theme
                                                                        ? '#fff'
                                                                        : '#4e5d78'
                                                                }
                                                                strokeLinecap='round'
                                                            ></path>
                                                            <path
                                                                fillRule='evenodd'
                                                                clipRule='evenodd'
                                                                fill={
                                                                    !theme
                                                                        ? '#fff'
                                                                        : '#4e5d78'
                                                                }
                                                                d='M7.033 19H19.5a1 1 0 100-2H9.033l-2 2zm3-3H18.5a1 1 0 001-1V6.533l-2 2V14h-2v-3.467l-2 2V14h-1.467l-2 2zm.936-8H10.5a1 1 0 00-1 1v.469L10.969 8zm-2 2L5.5 13.469V11a1 1 0 011-1h2.469zM4.5 14.469l-2 2V6a1 1 0 012 0v8.469z'
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <label className='switch mx-1 my-1'>
                                                        <input
                                                            type='checkbox'
                                                            checked={
                                                                props.showAnalytics
                                                            }
                                                            style={{
                                                                cursor: 'not-allowed',
                                                            }}
                                                            onChange={(e) => {
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    props.setShowAnalytics(
                                                                        true
                                                                    );
                                                                } else {
                                                                    props.setShowAnalytics(
                                                                        false
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <span className='slider round settings-icon'></span>
                                                    </label>
                                                    <div className='text-12 fw-bold settings-icon'>
                                                        <svg
                                                            viewBox='0 0 24 24'
                                                            width='24px'
                                                            fill={
                                                                !theme
                                                                    ? '#fff'
                                                                    : '#4e5d78'
                                                            }
                                                            color='textSubtle'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='sc-bdvvtL EyabU'
                                                        >
                                                            <path d='M5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7V18C3 19.1046 3.89543 20 5 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V7Z'></path>
                                                            <path
                                                                fillRule='evenodd'
                                                                clipRule='evenodd'
                                                                fill={
                                                                    !theme
                                                                        ? '#fff'
                                                                        : '#4e5d78'
                                                                }
                                                                d='M19 17H7C6.44772 17 6 16.5523 6 16V12C6 11.4477 6.44772 11 7 11H10V10C10 9.44772 10.4477 9 11 9H14V7C14 6.44772 14.4477 6 15 6H19C19.5523 6 20 6.44772 20 7V16C20 16.5523 19.5523 17 19 17ZM16 8H18V15H16V8ZM12 15H14V11H12V15ZM10 13H8V15H10V13Z'
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>
                                    <div className='d-flex align-items-center justify-content-between px-2'>
                                        <div className='d-flex justify-content-start py-2 '>
                                            <div className='p-1 cursor-pointer text-14'>
                                                <span className='text-toggle-selected-2 text-16 me-2 fw-bold'>
                                                    Market
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setIsSettingsOpen(
                                                    !isSettingsOpen
                                                );
                                            }}
                                            ref={ref}
                                            className='settings-icon'
                                        >
                                            <FaTools
                                                size={20}
                                                className='settings-icon text-dark-to-light cursor-pointer material-icons'
                                            />
                                        </div>
                                    </div>
                                    <div className='divider px-0'></div>
                                    {stakeState === 'market' && (
                                        <form
                                            id='#market'
                                            className='w-100'
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                swapTokens();
                                            }}
                                        >
                                            <div className='px-3 mt-3 d-flex justify-content-between align-items-center'>
                                                <div>
                                                    <div className='text-sm mb-2 fw-500'>
                                                        You Pay
                                                    </div>
                                                    <div
                                                        className='d-flex cursor-pointer cursor-pointer align-items-center'
                                                        style={{
                                                            width: '120px',
                                                        }}
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'transfer',
                                                                value: 'from',
                                                            });
                                                            dispatch({
                                                                type: 'modalstate',
                                                                value: !modalState,
                                                            });
                                                        }}
                                                    >
                                                        <div>
                                                            <img
                                                                src={
                                                                    selectedToken
                                                                        .from
                                                                        .TOKEN_LOGO
                                                                }
                                                                style={{
                                                                    borderRadius:
                                                                        '100%',
                                                                }}
                                                                width={35}
                                                                height={35}
                                                            />
                                                        </div>
                                                        <div className='ms-2'>
                                                            {
                                                                selectedToken
                                                                    .from
                                                                    .TOKEN_SYMBOL
                                                            }
                                                            <span>
                                                                <BiChevronDown />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-80'>
                                                    <div className='position-relative'>
                                                        {limit ? (
                                                            <div
                                                                style={{
                                                                    color: 'red',
                                                                }}
                                                                className='text-12 text-end mb-1'
                                                            >
                                                                Max Balance :{' '}
                                                                {
                                                                    props.tokenBalance
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div className='text-12 text-end mb-1'>
                                                                Balance :{' '}
                                                                {
                                                                    props.tokenBalance
                                                                }
                                                            </div>
                                                        )}
                                                        {loading ? (
                                                            <label
                                                                htmlFor='market_from'
                                                                className='text-10 fw-600 position-absolute pe-3'
                                                                style={{
                                                                    right: '0px',
                                                                    bottom: '8px',
                                                                }}
                                                            >
                                                                <Skeleton
                                                                    variant='rectangular'
                                                                    style={{
                                                                        borderRadius:
                                                                            '20px',
                                                                        backgroundColor:
                                                                            !theme
                                                                                ? '#15202B'
                                                                                : 'none',
                                                                    }}
                                                                    width={100}
                                                                    height={11}
                                                                />
                                                            </label>
                                                        ) : (
                                                            <label
                                                                htmlFor='market_from'
                                                                className='text-12 fw-600 position-absolute pe-3'
                                                                style={{
                                                                    right: '0px',

                                                                    bottom: '0px',
                                                                }}
                                                            >
                                                                {limit ? (
                                                                    <span
                                                                        className='fw-bold'
                                                                        style={{
                                                                            color: 'red',
                                                                        }}
                                                                    >
                                                                        Insufficient{' '}
                                                                        {
                                                                            selectedToken
                                                                                .from
                                                                                .TOKEN_NAME
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <>
                                                                        {currencyType ===
                                                                            'Coin' && (
                                                                            <span
                                                                                style={{
                                                                                    fontSize: 12,
                                                                                }}
                                                                            >
                                                                                ~$
                                                                            </span>
                                                                        )}
                                                                        <span>
                                                                            {props
                                                                                .convert_pay_values_market
                                                                                .data
                                                                                .token1_price
                                                                                ? props.convert_pay_values_market.data.token1_price.PrecisionMaker(
                                                                                      4
                                                                                  )
                                                                                : props
                                                                                      .convert_pay_values_market
                                                                                      .data
                                                                                      .token1_price}
                                                                        </span>
                                                                        &nbsp;
                                                                        {currencyType ===
                                                                            'USD' &&
                                                                            `${selectedToken.from.TOKEN_SYMBOL}`}
                                                                    </>
                                                                )}
                                                            </label>
                                                        )}
                                                        <input
                                                            id='market_from'
                                                            placeholder={`${
                                                                currencyType ===
                                                                'USD'
                                                                    ? '~$0.00'
                                                                    : '0'
                                                            }`}
                                                            style={{
                                                                color: !theme
                                                                    ? '#fff'
                                                                    : '#4e5d78',
                                                                border:
                                                                    limit &&
                                                                    '1px solid red',
                                                                cursor: props.wallet
                                                                    ? 'auto'
                                                                    : 'not-allowed',
                                                            }}
                                                            type='number'
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            disabled={
                                                                !props.wallet
                                                            }
                                                            value={`${props.handle_pay_values_market}`}
                                                            className='token-information text-14 text-end input-bar pb-4 pt-2 px-3 border-20'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className='inner bg-f9 px-2 mb-1 mt-4'
                                                style={{
                                                    border: '0.2px solid #9e9e9e3d',
                                                }}
                                            >
                                                <div
                                                    className='spinner  cursor-pointer mx-auto rounded-circle d-flex align-items-center justify-content-center'
                                                    style={{
                                                        width: '32px',
                                                        marginTop: '-15px',
                                                    }}
                                                    onClick={() =>
                                                        changeValues()
                                                    }
                                                >
                                                    <BiRefresh
                                                        size={32}
                                                        color={'#fff'}
                                                        className='rotate'
                                                    />
                                                </div>
                                                <div className='px-2 my-3 pb-2 d-flex justify-content-between align-items-center'>
                                                    <div className=''>
                                                        <div className='text-sm mb-2 fw-500'>
                                                            You Receive
                                                        </div>
                                                        <div
                                                            className='d-flex cursor-pointer align-items-center'
                                                            style={{
                                                                width: isFromSelected
                                                                    ? '120px'
                                                                    : '100%',
                                                            }}
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: 'transfer',
                                                                    value: 'to',
                                                                });
                                                                dispatch({
                                                                    type: 'modalstate',
                                                                    value: !modalState,
                                                                });
                                                            }}
                                                        >
                                                            {' '}
                                                            <div>
                                                                {isFromSelected && (
                                                                    <img
                                                                        src={
                                                                            selectedToken
                                                                                .to
                                                                                .TOKEN_LOGO
                                                                        }
                                                                        style={{
                                                                            borderRadius:
                                                                                '100%',
                                                                        }}
                                                                        width={
                                                                            35
                                                                        }
                                                                        height={
                                                                            35
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <div
                                                                className={`${
                                                                    isFromSelected
                                                                        ? 'ms-2'
                                                                        : 'my-2'
                                                                }`}
                                                            >
                                                                {isFromSelected ? (
                                                                    `${selectedToken.to.TOKEN_SYMBOL}`
                                                                ) : (
                                                                    <span className='text-16 fw-bold'>
                                                                        Select
                                                                        your
                                                                        token
                                                                    </span>
                                                                )}
                                                                <BiChevronDown />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {isFromSelected && (
                                                        <div className='w-80'>
                                                            <div className='mt-2 position-relative'>
                                                                {loading ? (
                                                                    <label
                                                                        htmlFor='market_from'
                                                                        className='text-10 fw-600 position-absolute pe-3'
                                                                        style={{
                                                                            right: '0px',
                                                                            bottom: '0px',
                                                                        }}
                                                                    >
                                                                        <Skeleton
                                                                            variant='rectangular'
                                                                            style={{
                                                                                borderRadius:
                                                                                    '20px',
                                                                                backgroundColor:
                                                                                    !theme
                                                                                        ? '#15202B'
                                                                                        : 'none',
                                                                            }}
                                                                            width={
                                                                                60
                                                                            }
                                                                            height={
                                                                                11
                                                                            }
                                                                        />
                                                                    </label>
                                                                ) : (
                                                                    <label
                                                                        htmlFor='market_from'
                                                                        className='text-12 fw-600 position-absolute pe-3'
                                                                        style={{
                                                                            right: '0px',
                                                                            bottom: '0px',
                                                                        }}
                                                                    >
                                                                        {currencyType ===
                                                                            'Coin' && (
                                                                            <span
                                                                                style={{
                                                                                    fontSize: 12,
                                                                                }}
                                                                            >
                                                                                ~$
                                                                            </span>
                                                                        )}
                                                                        <span>
                                                                            {props
                                                                                .convert_pay_values_market
                                                                                .data
                                                                                .token2_price
                                                                                ? props.convert_pay_values_market.data.token2_price.PrecisionMaker(
                                                                                      4
                                                                                  )
                                                                                : props
                                                                                      .convert_pay_values_market
                                                                                      .data
                                                                                      .token2_price}
                                                                        </span>
                                                                        &nbsp;
                                                                        {currencyType ===
                                                                            'USD' &&
                                                                            `${selectedToken.to.TOKEN_SYMBOL}`}
                                                                    </label>
                                                                )}
                                                                <div className='token-information text-sm  text-end input-bar pb-4 pt-2 px-3 border-20'>
                                                                    {loading ? (
                                                                        <div className='d-flex justify-content-end'>
                                                                            <Skeleton
                                                                                variant='rectangular'
                                                                                style={{
                                                                                    borderRadius:
                                                                                        '20px',
                                                                                    backgroundColor:
                                                                                        !theme
                                                                                            ? '#15202B'
                                                                                            : 'none',
                                                                                }}
                                                                                width={
                                                                                    100
                                                                                }
                                                                                height={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <input
                                                                            id='market_from'
                                                                            placeholder={`${
                                                                                currencyType ===
                                                                                'USD'
                                                                                    ? '~$0.00'
                                                                                    : '0'
                                                                            }`}
                                                                            style={{
                                                                                color: !theme
                                                                                    ? '#fff'
                                                                                    : '#4e5d78',
                                                                            }}
                                                                            className='text-end w-100 text-14'
                                                                            type='number'
                                                                            disabled={
                                                                                true
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleChange(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            value={
                                                                                currencyType ===
                                                                                    'USD' ||
                                                                                !props.handle_pay_values_market
                                                                                    ? props
                                                                                          .convert_pay_values_market
                                                                                          .data
                                                                                          .convertedValue
                                                                                    : new BigNumber(
                                                                                          props.convert_pay_values_market.data.convertedValue
                                                                                      )
                                                                                          .multipliedBy(
                                                                                              1 -
                                                                                                  new BigNumber(
                                                                                                      DEX_FEE
                                                                                                  ).dividedBy(
                                                                                                      100
                                                                                                  )
                                                                                          )
                                                                                          .toNumber()
                                                                                          .PrecisionMaker(
                                                                                              (8).toString()
                                                                                          )
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {props.convert_pay_values_market
                                                    .data.rate ? (
                                                    <div className='w-100'>
                                                        <div
                                                            className='d-flex align-items-center justify-content-between cursor-pointer w-100   border-10 shadow-none mb-2 btn-sm  text-start'
                                                            style={{
                                                                paddingTop:
                                                                    '5px',
                                                                paddingBottom:
                                                                    '5px',
                                                            }}
                                                        >
                                                            <div className='d-flex align-items-center'>
                                                                {' '}
                                                                1{' '}
                                                                {
                                                                    selectedToken
                                                                        .from
                                                                        .TOKEN_SYMBOL
                                                                }{' '}
                                                                = &nbsp;
                                                                {loading ? (
                                                                    <Skeleton
                                                                        variant='rectangular'
                                                                        style={{
                                                                            borderRadius:
                                                                                '20px',
                                                                            backgroundColor:
                                                                                !theme
                                                                                    ? '#15202B'
                                                                                    : 'none',
                                                                        }}
                                                                        width={
                                                                            60
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                    />
                                                                ) : (
                                                                    props.convert_pay_values_market.data.rate.PrecisionMaker(
                                                                        4
                                                                    )
                                                                )}
                                                                &nbsp;
                                                                {
                                                                    selectedToken
                                                                        .to
                                                                        .TOKEN_SYMBOL
                                                                }
                                                            </div>
                                                            <div>
                                                                {openStats ? (
                                                                    <BiChevronUp
                                                                        size={
                                                                            25
                                                                        }
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                {
                                                                                    type: 'openstats',
                                                                                    value: !openStats,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <BiChevronDown
                                                                        size={
                                                                            25
                                                                        }
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                {
                                                                                    type: 'openstats',
                                                                                    value: !openStats,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {openStats && (
                                                    <Fade in={openStats}>
                                                        <div className='text-12 my-2 rounded-lg py-1 border-20  px-2 d-flex align-items-center justify-content-between'>
                                                            <div>
                                                                <div className='d-flex'>
                                                                    <div>
                                                                        Minimum
                                                                        received{' '}
                                                                    </div>
                                                                    <div className='ms-2'>
                                                                        <VariableToolTip text='The minimum amount you are guaranteed to receive. if the price slips any further, your transaction will revert' />
                                                                    </div>
                                                                </div>
                                                                <div className='mt-2 d-flex align-items-center justify-content-start'>
                                                                    <div>
                                                                        Price
                                                                        impact
                                                                    </div>{' '}
                                                                    <div className='ms-2'>
                                                                        <VariableToolTip text='The difference between the market price and estimated price due to trade size' />
                                                                    </div>
                                                                </div>
                                                                <div className='mt-2 d-flex align-items-center justify-content-start'>
                                                                    <div>
                                                                        Fee
                                                                    </div>{' '}
                                                                    <div className='ms-2'>
                                                                        <VariableToolTip text='A portion of each trade (0.05%) goes to liquidity providers as a protocol incentive' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {loading ? (
                                                                    <Skeleton
                                                                        variant='rectangular'
                                                                        style={{
                                                                            borderRadius:
                                                                                '20px',
                                                                            backgroundColor:
                                                                                !theme
                                                                                    ? '#15202B'
                                                                                    : 'none',
                                                                        }}
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            11
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <div className='text-end'>
                                                                        {
                                                                            minimumReceived
                                                                        }
                                                                    </div>
                                                                )}
                                                                {loading ? (
                                                                    <div className='d-flex justify-content-end'>
                                                                        <Skeleton
                                                                            variant='rectangular'
                                                                            className='text-end mt-2'
                                                                            style={{
                                                                                borderRadius:
                                                                                    '20px',
                                                                                backgroundColor:
                                                                                    !theme
                                                                                        ? '#15202B'
                                                                                        : 'none',
                                                                            }}
                                                                            width={
                                                                                50
                                                                            }
                                                                            height={
                                                                                9
                                                                            }
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className='text-end mt-2'>
                                                                        {
                                                                            props.priceimpact
                                                                        }
                                                                        %
                                                                    </div>
                                                                )}
                                                                <div className='text-end mt-2'>
                                                                    {loading ? (
                                                                        <Skeleton
                                                                            variant='rectangular'
                                                                            style={{
                                                                                borderRadius:
                                                                                    '20px',
                                                                                backgroundColor:
                                                                                    !theme
                                                                                        ? '#15202B'
                                                                                        : 'none',
                                                                            }}
                                                                            width={
                                                                                100
                                                                            }
                                                                            height={
                                                                                11
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <div>
                                                                            {(
                                                                                (parseInt(
                                                                                    props.handle_pay_values_market
                                                                                ) *
                                                                                    DEX_FEE) /
                                                                                100
                                                                            ).PrecisionMaker(
                                                                                5
                                                                            )}
                                                                            &nbsp;
                                                                            {
                                                                                selectedToken
                                                                                    .to
                                                                                    .TOKEN_SYMBOL
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Fade>
                                                )}
                                                <div className='w-100'>
                                                    {props.wallet &&
                                                        !swapLoader && (
                                                            <button
                                                                type='submit'
                                                                className='btn w-100  border-10 mb-2 shadow-none btn-sm button-primary btn-faucet '
                                                                style={{
                                                                    paddingTop:
                                                                        '12px',
                                                                    paddingBottom:
                                                                        '12px',
                                                                }}
                                                            >
                                                                {props.handle_pay_values_market
                                                                    ? 'Swap'
                                                                    : 'Enter amount'}
                                                            </button>
                                                        )}
                                                    {swapLoader &&
                                                        props.wallet && (
                                                            <button
                                                                type='button'
                                                                className='btn w-100   border-10 mb-2 shadow-none  btn-sm button-primary btn-faucet '
                                                                style={{
                                                                    paddingTop:
                                                                        '12px',
                                                                    paddingBottom:
                                                                        '12px',
                                                                }}
                                                            >
                                                                <div className='rotate-2'>
                                                                    <BiLoaderAlt
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </div>
                                                            </button>
                                                        )}
                                                    {!props.wallet && (
                                                        <button
                                                            type='button'
                                                            onClick={() => {
                                                                props.switchAddress(
                                                                    {
                                                                        NETWORK:
                                                                            props.selectedNetwork,
                                                                    }
                                                                );
                                                            }}
                                                            className='btn w-100  border-10 mb-2 shadow-none  btn-sm button-primary btn-faucet '
                                                            style={{
                                                                paddingTop:
                                                                    '12px',
                                                                paddingBottom:
                                                                    '12px',
                                                            }}
                                                        >
                                                            Connect wallet
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='col-sm col-md-7 col-lg-5 p-0 mt-lg-0  d-flex justify-content-center  align-items-center  mx-md-4 mx-lg-4'>
                                    <AnalyticsGraph />
                                </div>
                                <div className='col-sm col-md-4 col-lg-4 p-0  mt-lg-0  d-flex justify-content-center  align-items-center mx-lg-4'>
                                    <div className='dex p-2 token-information position-relative w-100 mb-5 shadow-sm'>
                                        <Fade
                                            appear={true}
                                            ref={ref}
                                            in={isSettingsOpen}
                                        >
                                            <div
                                                className='p-3 token-information border-l settings-icon'
                                                onClick={() => {
                                                    setIsSettingsOpen(true);
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50px',
                                                    border: '1px solid #e6e6e6',
                                                    width: '280px',
                                                    right: '18px',
                                                    zIndex: '10',
                                                    borderRadius: '20px',
                                                }}
                                            >
                                                <p className='text-sm fw-600 m-0 my-2 settings-icon'>
                                                    Transaction settings
                                                </p>
                                                <p className='text-12 m-0 d-flex settings-icon'>
                                                    Slippage tolerance
                                                    <div className=' ml-2 '>
                                                        <VariableWidthToolTip text='Your transaction will revert if the price changes unfavorably by more than this percentage' />
                                                    </div>
                                                </p>
                                                <div className='d-flex justify-content-end align-items-center mb-1 mt-2'>
                                                    <div>
                                                        <button
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: 'slippage',
                                                                    value: 1,
                                                                });
                                                            }}
                                                            className={`
                                                             badge-button-selected
                                                     py-1 fw-600 settings-icon text-12 me-2  my-1 shadow-none btn btn-sm`}
                                                        >
                                                            Auto
                                                        </button>
                                                    </div>

                                                    <input
                                                        onChange={
                                                            handleSlippage
                                                        }
                                                        value={slippage}
                                                        style={{
                                                            width: '80%',
                                                        }}
                                                        className='settings-icon py-1 fw-600 text-12 me-2 badge-button my-1 shadow-none text-end border-10 '
                                                        placeholder='Enter...'
                                                    />

                                                    <p className='settings-icon py-1 fw-600 text-12 me-2 my-1 shadow-none text-end border-10'>
                                                        %
                                                    </p>
                                                </div>{' '}
                                                <div className='settings-icon d-flex justify-content-end align-items-center my-1'>
                                                    {[1, 2, 3].map(
                                                        (item, index) => (
                                                            <div key={index}>
                                                                <button
                                                                    onClick={() => {
                                                                        dispatch(
                                                                            {
                                                                                type: 'slippage',
                                                                                value: item,
                                                                            }
                                                                        );
                                                                    }}
                                                                    className={`${
                                                                        item ===
                                                                        slippage
                                                                            ? 'badge-button-selected'
                                                                            : 'badge-button'
                                                                    } fw-600  settings-icon text-mini me-2  shadow-none border-10 btn btn-sm`}
                                                                >
                                                                    {item}%
                                                                </button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>{' '}
                                                <p className='settings-icon text-sm fw-600 m-0 my-2'>
                                                    Interface settings
                                                </p>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <p className='settings-icon text-12 m-0 d-flex align-items-center'>
                                                        Analytics &nbsp;
                                                    </p>

                                                    <div className='d-flex align-items-center justify-content-start'>
                                                        <div className='text-12 fw-bold'>
                                                            <svg
                                                                viewBox='0 0 23 22'
                                                                color={
                                                                    !theme
                                                                        ? '#fff'
                                                                        : '#4e5d78'
                                                                }
                                                                width='20px'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                className='sc-bdvvtL EyabU'
                                                            >
                                                                <path
                                                                    d='M21.5 1l-20 20'
                                                                    strokeWidth='2'
                                                                    stroke={
                                                                        !theme
                                                                            ? '#fff'
                                                                            : '#4e5d78'
                                                                    }
                                                                    strokeLinecap='round'
                                                                ></path>
                                                                <path
                                                                    fillRule='evenodd'
                                                                    clipRule='evenodd'
                                                                    fill={
                                                                        !theme
                                                                            ? '#fff'
                                                                            : '#4e5d78'
                                                                    }
                                                                    d='M7.033 19H19.5a1 1 0 100-2H9.033l-2 2zm3-3H18.5a1 1 0 001-1V6.533l-2 2V14h-2v-3.467l-2 2V14h-1.467l-2 2zm.936-8H10.5a1 1 0 00-1 1v.469L10.969 8zm-2 2L5.5 13.469V11a1 1 0 011-1h2.469zM4.5 14.469l-2 2V6a1 1 0 012 0v8.469z'
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                        <label className='switch mx-1 my-1'>
                                                            <input
                                                                type='checkbox'
                                                                checked={
                                                                    props.showAnalytics
                                                                }
                                                                style={{
                                                                    cursor: 'not-allowed',
                                                                }}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        props.setShowAnalytics(
                                                                            true
                                                                        );
                                                                    } else {
                                                                        props.setShowAnalytics(
                                                                            false
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <span className='slider round settings-icon'></span>
                                                        </label>
                                                        <div className='text-12 fw-bold settings-icon'>
                                                            <svg
                                                                viewBox='0 0 24 24'
                                                                width='24px'
                                                                fill={
                                                                    !theme
                                                                        ? '#fff'
                                                                        : '#4e5d78'
                                                                }
                                                                color='textSubtle'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                className='sc-bdvvtL EyabU'
                                                            >
                                                                <path d='M5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7V18C3 19.1046 3.89543 20 5 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V7Z'></path>
                                                                <path
                                                                    fillRule='evenodd'
                                                                    clipRule='evenodd'
                                                                    fill={
                                                                        !theme
                                                                            ? '#fff'
                                                                            : '#4e5d78'
                                                                    }
                                                                    d='M19 17H7C6.44772 17 6 16.5523 6 16V12C6 11.4477 6.44772 11 7 11H10V10C10 9.44772 10.4477 9 11 9H14V7C14 6.44772 14.4477 6 15 6H19C19.5523 6 20 6.44772 20 7V16C20 16.5523 19.5523 17 19 17ZM16 8H18V15H16V8ZM12 15H14V11H12V15ZM10 13H8V15H10V13Z'
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fade>
                                        <div className='d-flex align-items-center justify-content-between px-2'>
                                            <div className='d-flex justify-content-start py-2 '>
                                                <div className='p-1 cursor-pointer text-14'>
                                                    <span className='text-toggle-selected-2 text-16 me-2 fw-bold'>
                                                        Market
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setIsSettingsOpen(
                                                        !isSettingsOpen
                                                    );
                                                }}
                                                ref={ref}
                                                className='settings-icon'
                                            >
                                                <FaTools
                                                    size={20}
                                                    className='settings-icon text-dark-to-light cursor-pointer material-icons'
                                                />
                                            </div>
                                        </div>
                                        <div className='divider px-0'></div>
                                        {stakeState === 'market' && (
                                            <form
                                                id='#market'
                                                className='w-100'
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    swapTokens();
                                                }}
                                            >
                                                <div className='px-3 mt-3 d-flex justify-content-between align-items-center'>
                                                    <div>
                                                        <div className='text-sm mb-2 fw-500'>
                                                            You Pay
                                                        </div>
                                                        <div
                                                            className='d-flex cursor-pointer cursor-pointer align-items-center'
                                                            style={{
                                                                width: '120px',
                                                            }}
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: 'transfer',
                                                                    value: 'from',
                                                                });
                                                                dispatch({
                                                                    type: 'modalstate',
                                                                    value: !modalState,
                                                                });
                                                            }}
                                                        >
                                                            <div>
                                                                <img
                                                                    src={
                                                                        selectedToken
                                                                            .from
                                                                            .TOKEN_LOGO
                                                                    }
                                                                    style={{
                                                                        borderRadius:
                                                                            '100%',
                                                                    }}
                                                                    width={35}
                                                                    height={35}
                                                                />
                                                            </div>
                                                            <div className='ms-2'>
                                                                {
                                                                    selectedToken
                                                                        .from
                                                                        .TOKEN_SYMBOL
                                                                }
                                                                <span>
                                                                    <BiChevronDown />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='w-80'>
                                                        <div className='position-relative'>
                                                            {limit ? (
                                                                <div
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                    className='text-12 text-end mb-1'
                                                                >
                                                                    Max Balance
                                                                    :{' '}
                                                                    {
                                                                        props.tokenBalance
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div className='text-12 text-end mb-1'>
                                                                    Balance :{' '}
                                                                    {
                                                                        props.tokenBalance
                                                                    }
                                                                </div>
                                                            )}
                                                            {loading ? (
                                                                <label
                                                                    htmlFor='market_from'
                                                                    className='text-10 fw-600 position-absolute pe-3'
                                                                    style={{
                                                                        right: '0px',
                                                                        bottom: '8px',
                                                                    }}
                                                                >
                                                                    <Skeleton
                                                                        variant='rectangular'
                                                                        style={{
                                                                            borderRadius:
                                                                                '20px',
                                                                            backgroundColor:
                                                                                !theme
                                                                                    ? '#15202B'
                                                                                    : 'none',
                                                                        }}
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            11
                                                                        }
                                                                    />
                                                                </label>
                                                            ) : (
                                                                <label
                                                                    htmlFor='market_from'
                                                                    className='text-12 fw-600 position-absolute pe-3'
                                                                    style={{
                                                                        right: '0px',

                                                                        bottom: '0px',
                                                                    }}
                                                                >
                                                                    {limit ? (
                                                                        <span
                                                                            className='fw-bold'
                                                                            style={{
                                                                                color: 'red',
                                                                            }}
                                                                        >
                                                                            Insufficient{' '}
                                                                            {
                                                                                selectedToken
                                                                                    .from
                                                                                    .TOKEN_NAME
                                                                            }
                                                                        </span>
                                                                    ) : (
                                                                        <>
                                                                            {currencyType ===
                                                                                'Coin' && (
                                                                                <span
                                                                                    style={{
                                                                                        fontSize: 12,
                                                                                    }}
                                                                                >
                                                                                    ~$
                                                                                </span>
                                                                            )}
                                                                            <span>
                                                                                {props
                                                                                    .convert_pay_values_market
                                                                                    .data
                                                                                    .token1_price
                                                                                    ? props.convert_pay_values_market.data.token1_price.PrecisionMaker(
                                                                                          4
                                                                                      )
                                                                                    : props
                                                                                          .convert_pay_values_market
                                                                                          .data
                                                                                          .token1_price}
                                                                            </span>
                                                                            &nbsp;
                                                                            {currencyType ===
                                                                                'USD' &&
                                                                                `${selectedToken.from.TOKEN_SYMBOL}`}
                                                                        </>
                                                                    )}
                                                                </label>
                                                            )}
                                                            <input
                                                                id='market_from'
                                                                placeholder={`${
                                                                    currencyType ===
                                                                    'USD'
                                                                        ? '~$0.00'
                                                                        : '0'
                                                                }`}
                                                                style={{
                                                                    color: !theme
                                                                        ? '#fff'
                                                                        : '#4e5d78',
                                                                    border:
                                                                        limit &&
                                                                        '1px solid red',
                                                                    cursor: props.wallet
                                                                        ? 'auto'
                                                                        : 'not-allowed',
                                                                }}
                                                                type='number'
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                disabled={
                                                                    !props.wallet
                                                                }
                                                                value={`${props.handle_pay_values_market}`}
                                                                className='token-information text-14 text-end input-bar pb-4 pt-2 px-3 border-20'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className='inner bg-f9 px-2 mb-1 mt-4'
                                                    style={{
                                                        border: '0.2px solid #9e9e9e3d',
                                                    }}
                                                >
                                                    <div
                                                        className='spinner  cursor-pointer mx-auto rounded-circle d-flex align-items-center justify-content-center'
                                                        style={{
                                                            width: '32px',
                                                            marginTop: '-15px',
                                                        }}
                                                        onClick={() =>
                                                            changeValues()
                                                        }
                                                    >
                                                        <BiRefresh
                                                            size={32}
                                                            color={'#fff'}
                                                            className='rotate'
                                                        />
                                                    </div>
                                                    <div className='px-2 my-3 pb-2 d-flex justify-content-between align-items-center'>
                                                        <div className=''>
                                                            <div className='text-sm mb-2 fw-500'>
                                                                You Receive
                                                            </div>
                                                            <div
                                                                className='d-flex cursor-pointer align-items-center'
                                                                style={{
                                                                    width: isFromSelected
                                                                        ? '120px'
                                                                        : '100%',
                                                                }}
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: 'transfer',
                                                                        value: 'to',
                                                                    });
                                                                    dispatch({
                                                                        type: 'modalstate',
                                                                        value: !modalState,
                                                                    });
                                                                }}
                                                            >
                                                                {' '}
                                                                <div>
                                                                    {isFromSelected && (
                                                                        <img
                                                                            src={
                                                                                selectedToken
                                                                                    .to
                                                                                    .TOKEN_LOGO
                                                                            }
                                                                            style={{
                                                                                borderRadius:
                                                                                    '100%',
                                                                            }}
                                                                            width={
                                                                                35
                                                                            }
                                                                            height={
                                                                                35
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div
                                                                    className={`${
                                                                        isFromSelected
                                                                            ? 'ms-2'
                                                                            : 'my-2'
                                                                    }`}
                                                                >
                                                                    {isFromSelected ? (
                                                                        `${selectedToken.to.TOKEN_SYMBOL}`
                                                                    ) : (
                                                                        <span className='text-16 fw-bold'>
                                                                            Select
                                                                            your
                                                                            token
                                                                        </span>
                                                                    )}
                                                                    <BiChevronDown />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {isFromSelected && (
                                                            <div className='w-80'>
                                                                <div className='mt-2 position-relative'>
                                                                    {loading ? (
                                                                        <label
                                                                            htmlFor='market_from'
                                                                            className='text-10 fw-600 position-absolute pe-3'
                                                                            style={{
                                                                                right: '0px',
                                                                                bottom: '0px',
                                                                            }}
                                                                        >
                                                                            <Skeleton
                                                                                variant='rectangular'
                                                                                style={{
                                                                                    borderRadius:
                                                                                        '20px',
                                                                                    backgroundColor:
                                                                                        !theme
                                                                                            ? '#15202B'
                                                                                            : 'none',
                                                                                }}
                                                                                width={
                                                                                    60
                                                                                }
                                                                                height={
                                                                                    11
                                                                                }
                                                                            />
                                                                        </label>
                                                                    ) : (
                                                                        <label
                                                                            htmlFor='market_from'
                                                                            className='text-12 fw-600 position-absolute pe-3'
                                                                            style={{
                                                                                right: '0px',
                                                                                bottom: '0px',
                                                                            }}
                                                                        >
                                                                            {currencyType ===
                                                                                'Coin' && (
                                                                                <span
                                                                                    style={{
                                                                                        fontSize: 12,
                                                                                    }}
                                                                                >
                                                                                    ~$
                                                                                </span>
                                                                            )}
                                                                            <span>
                                                                                {props
                                                                                    .convert_pay_values_market
                                                                                    .data
                                                                                    .token2_price
                                                                                    ? props.convert_pay_values_market.data.token2_price.PrecisionMaker(
                                                                                          4
                                                                                      )
                                                                                    : props
                                                                                          .convert_pay_values_market
                                                                                          .data
                                                                                          .token2_price}
                                                                            </span>
                                                                            &nbsp;
                                                                            {currencyType ===
                                                                                'USD' &&
                                                                                `${selectedToken.to.TOKEN_SYMBOL}`}
                                                                        </label>
                                                                    )}
                                                                    <div className='token-information text-sm  text-end input-bar pb-4 pt-2 px-3 border-20'>
                                                                        {loading ? (
                                                                            <div className='d-flex justify-content-end'>
                                                                                <Skeleton
                                                                                    variant='rectangular'
                                                                                    style={{
                                                                                        borderRadius:
                                                                                            '20px',
                                                                                        backgroundColor:
                                                                                            !theme
                                                                                                ? '#15202B'
                                                                                                : 'none',
                                                                                    }}
                                                                                    width={
                                                                                        100
                                                                                    }
                                                                                    height={
                                                                                        16
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <input
                                                                                id='market_from'
                                                                                placeholder={`${
                                                                                    currencyType ===
                                                                                    'USD'
                                                                                        ? '~$0.00'
                                                                                        : '0'
                                                                                }`}
                                                                                style={{
                                                                                    color: !theme
                                                                                        ? '#fff'
                                                                                        : '#4e5d78',
                                                                                }}
                                                                                className='text-end w-100 text-14'
                                                                                type='number'
                                                                                disabled={
                                                                                    true
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleChange(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    currencyType ===
                                                                                        'USD' ||
                                                                                    !props.handle_pay_values_market
                                                                                        ? props
                                                                                              .convert_pay_values_market
                                                                                              .data
                                                                                              .convertedValue
                                                                                        : new BigNumber(
                                                                                              props.convert_pay_values_market.data.convertedValue
                                                                                          )
                                                                                              .multipliedBy(
                                                                                                  1 -
                                                                                                      new BigNumber(
                                                                                                          DEX_FEE
                                                                                                      ).dividedBy(
                                                                                                          100
                                                                                                      )
                                                                                              )
                                                                                              .toNumber()
                                                                                              .PrecisionMaker(
                                                                                                  (8).toString()
                                                                                              )
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {props
                                                        .convert_pay_values_market
                                                        .data.rate ? (
                                                        <div className='w-100'>
                                                            <div
                                                                className='d-flex align-items-center justify-content-between cursor-pointer w-100   border-10 shadow-none mb-2 btn-sm  text-start'
                                                                style={{
                                                                    paddingTop:
                                                                        '5px',
                                                                    paddingBottom:
                                                                        '5px',
                                                                }}
                                                            >
                                                                <div className='d-flex align-items-center'>
                                                                    {' '}
                                                                    1{' '}
                                                                    {
                                                                        selectedToken
                                                                            .from
                                                                            .TOKEN_SYMBOL
                                                                    }{' '}
                                                                    = &nbsp;
                                                                    {loading ? (
                                                                        <Skeleton
                                                                            variant='rectangular'
                                                                            style={{
                                                                                borderRadius:
                                                                                    '20px',
                                                                                backgroundColor:
                                                                                    !theme
                                                                                        ? '#15202B'
                                                                                        : 'none',
                                                                            }}
                                                                            width={
                                                                                60
                                                                            }
                                                                            height={
                                                                                16
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        props.convert_pay_values_market.data.rate.PrecisionMaker(
                                                                            4
                                                                        )
                                                                    )}
                                                                    &nbsp;
                                                                    {
                                                                        selectedToken
                                                                            .to
                                                                            .TOKEN_SYMBOL
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {openStats ? (
                                                                        <BiChevronUp
                                                                            size={
                                                                                25
                                                                            }
                                                                            onClick={() => {
                                                                                dispatch(
                                                                                    {
                                                                                        type: 'openstats',
                                                                                        value: !openStats,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <BiChevronDown
                                                                            size={
                                                                                25
                                                                            }
                                                                            onClick={() => {
                                                                                dispatch(
                                                                                    {
                                                                                        type: 'openstats',
                                                                                        value: !openStats,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                    {openStats && (
                                                        <Fade in={openStats}>
                                                            <div className='text-12 my-2 rounded-lg py-1 border-20  px-2 d-flex align-items-center justify-content-between'>
                                                                <div>
                                                                    <div className='d-flex'>
                                                                        <div>
                                                                            Minimum
                                                                            received{' '}
                                                                        </div>
                                                                        <div className='ms-2'>
                                                                            <VariableToolTip text='The minimum amount you are guaranteed to receive. if the price slips any further, your transaction will revert' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-2 d-flex align-items-center justify-content-start'>
                                                                        <div>
                                                                            Price
                                                                            impact
                                                                        </div>{' '}
                                                                        <div className='ms-2'>
                                                                            <VariableToolTip text='The difference between the market price and estimated price due to trade size' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-2 d-flex align-items-center justify-content-start'>
                                                                        <div>
                                                                            Fee
                                                                        </div>{' '}
                                                                        <div className='ms-2'>
                                                                            <VariableToolTip text='A portion of each trade (0.05%) goes to liquidity providers as a protocol incentive' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {loading ? (
                                                                        <Skeleton
                                                                            variant='rectangular'
                                                                            style={{
                                                                                borderRadius:
                                                                                    '20px',
                                                                                backgroundColor:
                                                                                    !theme
                                                                                        ? '#15202B'
                                                                                        : 'none',
                                                                            }}
                                                                            width={
                                                                                100
                                                                            }
                                                                            height={
                                                                                11
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <div className='text-end'>
                                                                            {
                                                                                minimumReceived
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    {loading ? (
                                                                        <div className='d-flex justify-content-end'>
                                                                            <Skeleton
                                                                                variant='rectangular'
                                                                                className='text-end mt-2'
                                                                                style={{
                                                                                    borderRadius:
                                                                                        '20px',
                                                                                    backgroundColor:
                                                                                        !theme
                                                                                            ? '#15202B'
                                                                                            : 'none',
                                                                                }}
                                                                                width={
                                                                                    50
                                                                                }
                                                                                height={
                                                                                    9
                                                                                }
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <div className='text-end mt-2'>
                                                                            {
                                                                                props.priceimpact
                                                                            }
                                                                            %
                                                                        </div>
                                                                    )}
                                                                    <div className='text-end mt-2'>
                                                                        {loading ? (
                                                                            <Skeleton
                                                                                variant='rectangular'
                                                                                style={{
                                                                                    borderRadius:
                                                                                        '20px',
                                                                                    backgroundColor:
                                                                                        !theme
                                                                                            ? '#15202B'
                                                                                            : 'none',
                                                                                }}
                                                                                width={
                                                                                    100
                                                                                }
                                                                                height={
                                                                                    11
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <div>
                                                                                {(
                                                                                    (parseInt(
                                                                                        props.handle_pay_values_market
                                                                                    ) *
                                                                                        DEX_FEE) /
                                                                                    100
                                                                                ).PrecisionMaker(
                                                                                    5
                                                                                )}
                                                                                &nbsp;
                                                                                {
                                                                                    selectedToken
                                                                                        .to
                                                                                        .TOKEN_SYMBOL
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Fade>
                                                    )}
                                                    <div className='w-100'>
                                                        {props.wallet &&
                                                            !swapLoader && (
                                                                <button
                                                                    type='submit'
                                                                    className='btn w-100  border-10 mb-2 shadow-none btn-sm button-primary btn-faucet'
                                                                    style={{
                                                                        paddingTop:
                                                                            '12px',
                                                                        paddingBottom:
                                                                            '12px',
                                                                    }}
                                                                >
                                                                    {props.handle_pay_values_market
                                                                        ? 'Swap'
                                                                        : 'Enter amount'}
                                                                </button>
                                                            )}
                                                        {swapLoader &&
                                                            props.wallet && (
                                                                <button
                                                                    type='button'
                                                                    className='btn w-100   border-10 mb-2 shadow-none  btn-sm button-primary btn-faucet'
                                                                    style={{
                                                                        paddingTop:
                                                                            '12px',
                                                                        paddingBottom:
                                                                            '12px',
                                                                    }}
                                                                >
                                                                    <div className='rotate-2'>
                                                                        <BiLoaderAlt
                                                                            size={
                                                                                20
                                                                            }
                                                                        />
                                                                    </div>
                                                                </button>
                                                            )}
                                                        {!props.wallet && (
                                                            <button
                                                                type='button'
                                                                onClick={() => {
                                                                    props.switchAddress(
                                                                        {
                                                                            NETWORK:
                                                                                props.selectedNetwork,
                                                                        }
                                                                    );
                                                                }}
                                                                className='btn w-100  border-10 mb-2 shadow-none  btn-sm button-primary btn-faucet '
                                                                style={{
                                                                    paddingTop:
                                                                        '12px',
                                                                    paddingBottom:
                                                                        '12px',
                                                                }}
                                                            >
                                                                Connect wallet
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className='d-lg-none'>
                    <div
                        style={{
                            marginTop: '60px',
                            marginBottom: '30px',
                        }}
                    >
                        <div className='dex p-2 token-information position-relative w-100 shadow-sm'>
                            <Fade appear={true} ref={ref} in={isSettingsOpen}>
                                <div
                                    className='p-3 token-information border-l settings-icon'
                                    onClick={() => {
                                        setIsSettingsOpen(true);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '50px',
                                        border: '1px solid #e6e6e6',
                                        width: '280px',
                                        right: '18px',
                                        zIndex: '10',
                                        borderRadius: '20px',
                                    }}
                                >
                                    <p className='text-sm fw-600 m-0 my-2 settings-icon'>
                                        Transaction settings
                                    </p>
                                    <p className='text-12 m-0 d-flex settings-icon'>
                                        Slippage tolerance
                                        <div className=' ml-2 '>
                                            <VariableWidthToolTip text='Your transaction will revert if the price changes unfavorably by more than this percentage' />
                                        </div>
                                    </p>
                                    <div className='d-flex justify-content-end align-items-center mb-1 mt-2'>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    dispatch({
                                                        type: 'slippage',
                                                        value: 1,
                                                    });
                                                }}
                                                className={`
                                                             badge-button-selected
                                                     py-1 fw-600 settings-icon text-12 me-2  my-1 shadow-none btn btn-sm`}
                                            >
                                                Auto
                                            </button>
                                        </div>

                                        <input
                                            onChange={handleSlippage}
                                            value={slippage}
                                            style={{
                                                width: '80%',
                                            }}
                                            className='settings-icon py-1 fw-600 text-12 me-2 badge-button my-1 shadow-none text-end border-10 '
                                            placeholder='Enter...'
                                        />

                                        <p className='settings-icon py-1 fw-600 text-12 me-2 my-1 shadow-none text-end border-10'>
                                            %
                                        </p>
                                    </div>{' '}
                                    <div className='settings-icon d-flex justify-content-end align-items-center my-1'>
                                        {[1, 2, 3].map((item, index) => (
                                            <div key={index}>
                                                <button
                                                    onClick={() => {
                                                        dispatch({
                                                            type: 'slippage',
                                                            value: item,
                                                        });
                                                    }}
                                                    className={`${
                                                        item === slippage
                                                            ? 'badge-button-selected'
                                                            : 'badge-button'
                                                    } fw-600  settings-icon text-mini me-2  shadow-none border-10 btn btn-sm`}
                                                >
                                                    {item}%
                                                </button>
                                            </div>
                                        ))}
                                    </div>{' '}
                                    <p className='settings-icon text-sm fw-600 m-0 my-2'>
                                        Interface settings
                                    </p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='settings-icon text-12 m-0 d-flex align-items-center'>
                                            Analytics &nbsp;
                                            <VariableWidthToolTip text='Coming soon' />
                                        </p>

                                        <div className='d-flex align-items-center justify-content-start'>
                                            <div className='text-12 fw-bold'>
                                                <svg
                                                    viewBox='0 0 23 22'
                                                    color={
                                                        !theme
                                                            ? '#fff'
                                                            : '#4e5d78'
                                                    }
                                                    width='20px'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='sc-bdvvtL EyabU'
                                                >
                                                    <path
                                                        d='M21.5 1l-20 20'
                                                        strokeWidth='2'
                                                        stroke={
                                                            !theme
                                                                ? '#fff'
                                                                : '#4e5d78'
                                                        }
                                                        strokeLinecap='round'
                                                    ></path>
                                                    <path
                                                        fillRule='evenodd'
                                                        clipRule='evenodd'
                                                        fill={
                                                            !theme
                                                                ? '#fff'
                                                                : '#4e5d78'
                                                        }
                                                        d='M7.033 19H19.5a1 1 0 100-2H9.033l-2 2zm3-3H18.5a1 1 0 001-1V6.533l-2 2V14h-2v-3.467l-2 2V14h-1.467l-2 2zm.936-8H10.5a1 1 0 00-1 1v.469L10.969 8zm-2 2L5.5 13.469V11a1 1 0 011-1h2.469zM4.5 14.469l-2 2V6a1 1 0 012 0v8.469z'
                                                    ></path>
                                                </svg>
                                            </div>
                                            <label className='switch mx-1 my-1'>
                                                <input
                                                    type='checkbox'
                                                    checked={
                                                        props.showAnalytics
                                                    }
                                                    style={{
                                                        cursor: 'not-allowed',
                                                    }}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            props.setShowAnalytics(
                                                                true
                                                            );
                                                        } else {
                                                            props.setShowAnalytics(
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <span className='slider round settings-icon'></span>
                                            </label>
                                            <div className='text-12 fw-bold settings-icon'>
                                                <svg
                                                    viewBox='0 0 24 24'
                                                    width='24px'
                                                    fill={
                                                        !theme
                                                            ? '#fff'
                                                            : '#4e5d78'
                                                    }
                                                    color='textSubtle'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='sc-bdvvtL EyabU'
                                                >
                                                    <path d='M5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7V18C3 19.1046 3.89543 20 5 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V7Z'></path>
                                                    <path
                                                        fillRule='evenodd'
                                                        clipRule='evenodd'
                                                        fill={
                                                            !theme
                                                                ? '#fff'
                                                                : '#4e5d78'
                                                        }
                                                        d='M19 17H7C6.44772 17 6 16.5523 6 16V12C6 11.4477 6.44772 11 7 11H10V10C10 9.44772 10.4477 9 11 9H14V7C14 6.44772 14.4477 6 15 6H19C19.5523 6 20 6.44772 20 7V16C20 16.5523 19.5523 17 19 17ZM16 8H18V15H16V8ZM12 15H14V11H12V15ZM10 13H8V15H10V13Z'
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                            <div className='d-flex align-items-center justify-content-between px-2'>
                                <div className='d-flex justify-content-start py-2 '>
                                    <div className='p-1 cursor-pointer text-14'>
                                        <span className='text-toggle-selected-2 text-16 me-2 fw-bold'>
                                            Market
                                        </span>
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setIsSettingsOpen(!isSettingsOpen);
                                    }}
                                    ref={ref}
                                    className='settings-icon'
                                >
                                    <FaTools
                                        size={20}
                                        className='settings-icon text-dark-to-light cursor-pointer material-icons'
                                    />
                                </div>
                            </div>
                            <div className='divider px-0'></div>
                            {stakeState === 'market' && (
                                <form
                                    id='#market'
                                    className='w-100'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        swapTokens();
                                    }}
                                >
                                    <div className='px-3 mt-3 d-flex justify-content-between align-items-center'>
                                        <div>
                                            <div className='text-sm mb-2 fw-500'>
                                                You Pay
                                            </div>
                                            <div
                                                className='d-flex cursor-pointer cursor-pointer align-items-center'
                                                style={{
                                                    width: '120px',
                                                }}
                                                onClick={() => {
                                                    dispatch({
                                                        type: 'transfer',
                                                        value: 'from',
                                                    });
                                                    dispatch({
                                                        type: 'modalstate',
                                                        value: !modalState,
                                                    });
                                                }}
                                            >
                                                <div>
                                                    <img
                                                        src={
                                                            selectedToken.from
                                                                .TOKEN_LOGO
                                                        }
                                                        style={{
                                                            borderRadius:
                                                                '100%',
                                                        }}
                                                        width={35}
                                                        height={35}
                                                    />
                                                </div>
                                                <div className='ms-2'>
                                                    {
                                                        selectedToken.from
                                                            .TOKEN_SYMBOL
                                                    }
                                                    <span>
                                                        <BiChevronDown />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-80'>
                                            <div className='position-relative'>
                                                {limit ? (
                                                    <div
                                                        style={{
                                                            color: 'red',
                                                        }}
                                                        className='text-12 text-end mb-1'
                                                    >
                                                        Max Balance :{' '}
                                                        {props.tokenBalance}
                                                    </div>
                                                ) : (
                                                    <div className='text-12 text-end mb-1'>
                                                        Balance :{' '}
                                                        {props.tokenBalance}
                                                    </div>
                                                )}
                                                {loading ? (
                                                    <label
                                                        htmlFor='market_from'
                                                        className='text-10 fw-600 position-absolute pe-3'
                                                        style={{
                                                            right: '0px',
                                                            bottom: '8px',
                                                        }}
                                                    >
                                                        <Skeleton
                                                            variant='rectangular'
                                                            style={{
                                                                borderRadius:
                                                                    '20px',
                                                                backgroundColor:
                                                                    !theme
                                                                        ? '#15202B'
                                                                        : 'none',
                                                            }}
                                                            width={100}
                                                            height={11}
                                                        />
                                                    </label>
                                                ) : (
                                                    <label
                                                        htmlFor='market_from'
                                                        className='text-12 fw-600 position-absolute pe-3'
                                                        style={{
                                                            right: '0px',

                                                            bottom: '0px',
                                                        }}
                                                    >
                                                        {limit ? (
                                                            <span
                                                                className='fw-bold'
                                                                style={{
                                                                    color: 'red',
                                                                }}
                                                            >
                                                                Insufficient{' '}
                                                                {
                                                                    selectedToken
                                                                        .from
                                                                        .TOKEN_NAME
                                                                }
                                                            </span>
                                                        ) : (
                                                            <>
                                                                {currencyType ===
                                                                    'Coin' && (
                                                                    <span
                                                                        style={{
                                                                            fontSize: 12,
                                                                        }}
                                                                    >
                                                                        ~$
                                                                    </span>
                                                                )}
                                                                <span>
                                                                    {props
                                                                        .convert_pay_values_market
                                                                        .data
                                                                        .token1_price
                                                                        ? props.convert_pay_values_market.data.token1_price.PrecisionMaker(
                                                                              4
                                                                          )
                                                                        : props
                                                                              .convert_pay_values_market
                                                                              .data
                                                                              .token1_price}
                                                                </span>
                                                                &nbsp;
                                                                {currencyType ===
                                                                    'USD' &&
                                                                    `${selectedToken.from.TOKEN_SYMBOL}`}
                                                            </>
                                                        )}
                                                    </label>
                                                )}
                                                <input
                                                    id='market_from'
                                                    placeholder={`${
                                                        currencyType === 'USD'
                                                            ? '~$0.00'
                                                            : '0'
                                                    }`}
                                                    style={{
                                                        color: !theme
                                                            ? '#fff'
                                                            : '#4e5d78',
                                                        border:
                                                            limit &&
                                                            '1px solid red',
                                                        cursor: props.wallet
                                                            ? 'auto'
                                                            : 'not-allowed',
                                                    }}
                                                    type='number'
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!props.wallet}
                                                    value={`${props.handle_pay_values_market}`}
                                                    className='token-information text-14 text-end input-bar pb-4 pt-2 px-3 border-20'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='inner bg-f9 px-2 mb-1 mt-4'
                                        style={{
                                            border: '0.2px solid #9e9e9e3d',
                                        }}
                                    >
                                        <div
                                            className='spinner  cursor-pointer mx-auto rounded-circle d-flex align-items-center justify-content-center'
                                            style={{
                                                width: '32px',
                                                marginTop: '-15px',
                                            }}
                                            onClick={() => changeValues()}
                                        >
                                            <BiRefresh
                                                size={32}
                                                color={'#fff'}
                                                className='rotate'
                                            />
                                        </div>
                                        <div className='px-2 my-3 pb-2 d-flex justify-content-between align-items-center'>
                                            <div className=''>
                                                <div className='text-sm mb-2 fw-500'>
                                                    You Receive
                                                </div>
                                                <div
                                                    className='d-flex cursor-pointer align-items-center'
                                                    style={{
                                                        width: isFromSelected
                                                            ? '120px'
                                                            : '100%',
                                                    }}
                                                    onClick={() => {
                                                        dispatch({
                                                            type: 'transfer',
                                                            value: 'to',
                                                        });
                                                        dispatch({
                                                            type: 'modalstate',
                                                            value: !modalState,
                                                        });
                                                    }}
                                                >
                                                    {' '}
                                                    <div>
                                                        {isFromSelected && (
                                                            <img
                                                                src={
                                                                    selectedToken
                                                                        .to
                                                                        .TOKEN_LOGO
                                                                }
                                                                style={{
                                                                    borderRadius:
                                                                        '100%',
                                                                }}
                                                                width={35}
                                                                height={35}
                                                            />
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`${
                                                            isFromSelected
                                                                ? 'ms-2'
                                                                : 'my-2'
                                                        }`}
                                                    >
                                                        {isFromSelected ? (
                                                            `${selectedToken.to.TOKEN_SYMBOL}`
                                                        ) : (
                                                            <span className='text-16 fw-bold'>
                                                                Select your
                                                                token
                                                            </span>
                                                        )}
                                                        <BiChevronDown />
                                                    </div>
                                                </div>
                                            </div>
                                            {isFromSelected && (
                                                <div className='w-80'>
                                                    <div className='mt-2 position-relative'>
                                                        {loading ? (
                                                            <label
                                                                htmlFor='market_from'
                                                                className='text-10 fw-600 position-absolute pe-3'
                                                                style={{
                                                                    right: '0px',
                                                                    bottom: '0px',
                                                                }}
                                                            >
                                                                <Skeleton
                                                                    variant='rectangular'
                                                                    style={{
                                                                        borderRadius:
                                                                            '20px',
                                                                        backgroundColor:
                                                                            !theme
                                                                                ? '#15202B'
                                                                                : 'none',
                                                                    }}
                                                                    width={60}
                                                                    height={11}
                                                                />
                                                            </label>
                                                        ) : (
                                                            <label
                                                                htmlFor='market_from'
                                                                className='text-12 fw-600 position-absolute pe-3'
                                                                style={{
                                                                    right: '0px',
                                                                    bottom: '0px',
                                                                }}
                                                            >
                                                                {currencyType ===
                                                                    'Coin' && (
                                                                    <span
                                                                        style={{
                                                                            fontSize: 12,
                                                                        }}
                                                                    >
                                                                        ~$
                                                                    </span>
                                                                )}
                                                                <span>
                                                                    {props
                                                                        .convert_pay_values_market
                                                                        .data
                                                                        .token2_price
                                                                        ? props.convert_pay_values_market.data.token2_price.PrecisionMaker(
                                                                              4
                                                                          )
                                                                        : props
                                                                              .convert_pay_values_market
                                                                              .data
                                                                              .token2_price}
                                                                </span>
                                                                &nbsp;
                                                                {currencyType ===
                                                                    'USD' &&
                                                                    `${selectedToken.to.TOKEN_SYMBOL}`}
                                                            </label>
                                                        )}
                                                        <div className='token-information text-sm  text-end input-bar pb-4 pt-2 px-3 border-20'>
                                                            {loading ? (
                                                                <div className='d-flex justify-content-end'>
                                                                    <Skeleton
                                                                        variant='rectangular'
                                                                        style={{
                                                                            borderRadius:
                                                                                '20px',
                                                                            backgroundColor:
                                                                                !theme
                                                                                    ? '#15202B'
                                                                                    : 'none',
                                                                        }}
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <input
                                                                    id='market_from'
                                                                    placeholder={`${
                                                                        currencyType ===
                                                                        'USD'
                                                                            ? '~$0.00'
                                                                            : '0'
                                                                    }`}
                                                                    style={{
                                                                        color: !theme
                                                                            ? '#fff'
                                                                            : '#4e5d78',
                                                                    }}
                                                                    className='text-end w-100 text-14'
                                                                    type='number'
                                                                    disabled={
                                                                        true
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleChange(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    value={
                                                                        currencyType ===
                                                                            'USD' ||
                                                                        !props.handle_pay_values_market
                                                                            ? props
                                                                                  .convert_pay_values_market
                                                                                  .data
                                                                                  .convertedValue
                                                                            : new BigNumber(
                                                                                  props.convert_pay_values_market.data.convertedValue
                                                                              )
                                                                                  .multipliedBy(
                                                                                      1 -
                                                                                          new BigNumber(
                                                                                              DEX_FEE
                                                                                          ).dividedBy(
                                                                                              100
                                                                                          )
                                                                                  )
                                                                                  .toNumber()
                                                                                  .PrecisionMaker(
                                                                                      (8).toString()
                                                                                  )
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {props.convert_pay_values_market.data
                                            .rate ? (
                                            <div className='w-100'>
                                                <div
                                                    className='d-flex align-items-center justify-content-between cursor-pointer w-100   border-10 shadow-none mb-2 btn-sm  text-start'
                                                    style={{
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                    }}
                                                >
                                                    <div className='d-flex align-items-center'>
                                                        {' '}
                                                        1{' '}
                                                        {
                                                            selectedToken.from
                                                                .TOKEN_SYMBOL
                                                        }{' '}
                                                        = &nbsp;
                                                        {loading ? (
                                                            <Skeleton
                                                                variant='rectangular'
                                                                style={{
                                                                    borderRadius:
                                                                        '20px',
                                                                    backgroundColor:
                                                                        !theme
                                                                            ? '#15202B'
                                                                            : 'none',
                                                                }}
                                                                width={60}
                                                                height={16}
                                                            />
                                                        ) : (
                                                            props.convert_pay_values_market.data.rate.PrecisionMaker(
                                                                4
                                                            )
                                                        )}
                                                        &nbsp;
                                                        {
                                                            selectedToken.to
                                                                .TOKEN_SYMBOL
                                                        }
                                                    </div>
                                                    <div>
                                                        {openStats ? (
                                                            <BiChevronUp
                                                                size={25}
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: 'openstats',
                                                                        value: !openStats,
                                                                    });
                                                                }}
                                                            />
                                                        ) : (
                                                            <BiChevronDown
                                                                size={25}
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: 'openstats',
                                                                        value: !openStats,
                                                                    });
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                        {openStats && (
                                            <Fade in={openStats}>
                                                <div className='text-12 my-2 rounded-lg py-1 border-20  px-2 d-flex align-items-center justify-content-between'>
                                                    <div>
                                                        <div className='d-flex'>
                                                            <div>
                                                                Minimum received{' '}
                                                            </div>
                                                            <div className='ms-2'>
                                                                <VariableToolTip text='The minimum amount you are guaranteed to receive. if the price slips any further, your transaction will revert' />
                                                            </div>
                                                        </div>
                                                        <div className='mt-2 d-flex align-items-center justify-content-start'>
                                                            <div>
                                                                Price impact
                                                            </div>{' '}
                                                            <div className='ms-2'>
                                                                <VariableToolTip text='The difference between the market price and estimated price due to trade size' />
                                                            </div>
                                                        </div>
                                                        <div className='mt-2 d-flex align-items-center justify-content-start'>
                                                            <div>Fee</div>{' '}
                                                            <div className='ms-2'>
                                                                <VariableToolTip text='A portion of each trade (0.05%) goes to liquidity providers as a protocol incentive' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {loading ? (
                                                            <Skeleton
                                                                variant='rectangular'
                                                                style={{
                                                                    borderRadius:
                                                                        '20px',
                                                                    backgroundColor:
                                                                        !theme
                                                                            ? '#15202B'
                                                                            : 'none',
                                                                }}
                                                                width={100}
                                                                height={11}
                                                            />
                                                        ) : (
                                                            <div className='text-end'>
                                                                {
                                                                    minimumReceived
                                                                }
                                                            </div>
                                                        )}
                                                        {loading ? (
                                                            <div className='d-flex justify-content-end'>
                                                                <Skeleton
                                                                    variant='rectangular'
                                                                    className='text-end mt-2'
                                                                    style={{
                                                                        borderRadius:
                                                                            '20px',
                                                                        backgroundColor:
                                                                            !theme
                                                                                ? '#15202B'
                                                                                : 'none',
                                                                    }}
                                                                    width={50}
                                                                    height={9}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className='text-end mt-2'>
                                                                {
                                                                    props.priceimpact
                                                                }
                                                                %
                                                            </div>
                                                        )}
                                                        <div className='text-end mt-2'>
                                                            {loading ? (
                                                                <Skeleton
                                                                    variant='rectangular'
                                                                    style={{
                                                                        borderRadius:
                                                                            '20px',
                                                                        backgroundColor:
                                                                            !theme
                                                                                ? '#15202B'
                                                                                : 'none',
                                                                    }}
                                                                    width={100}
                                                                    height={11}
                                                                />
                                                            ) : (
                                                                <div>
                                                                    {(
                                                                        (parseInt(
                                                                            props.handle_pay_values_market
                                                                        ) *
                                                                            DEX_FEE) /
                                                                        100
                                                                    ).PrecisionMaker(
                                                                        5
                                                                    )}
                                                                    &nbsp;
                                                                    {
                                                                        selectedToken
                                                                            .to
                                                                            .TOKEN_SYMBOL
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fade>
                                        )}
                                        <div className='w-100'>
                                            {props.wallet && !swapLoader && (
                                                <button
                                                    type='submit'
                                                    className='btn w-100  border-10 mb-2 shadow-none btn-sm button-primary btn-faucet '
                                                    style={{
                                                        paddingTop: '12px',
                                                        paddingBottom: '12px',
                                                    }}
                                                >
                                                    {props.handle_pay_values_market
                                                        ? 'Swap'
                                                        : 'Enter amount'}
                                                </button>
                                            )}
                                            {swapLoader && props.wallet && (
                                                <button
                                                    type='button'
                                                    className='btn w-100   border-10 mb-2 shadow-none  btn-sm button-primary btn-faucet '
                                                    style={{
                                                        paddingTop: '12px',
                                                        paddingBottom: '12px',
                                                    }}
                                                >
                                                    <div className='rotate-2'>
                                                        <BiLoaderAlt
                                                            size={20}
                                                        />
                                                    </div>
                                                </button>
                                            )}
                                            {!props.wallet && (
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        props.switchAddress({
                                                            NETWORK:
                                                                props.selectedNetwork,
                                                        });
                                                    }}
                                                    className='btn w-100  border-10 mb-2 shadow-none  btn-sm button-primary btn-faucet '
                                                    style={{
                                                        paddingTop: '12px',
                                                        paddingBottom: '12px',
                                                    }}
                                                >
                                                    Connect wallet
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                    {props.showAnalytics ? (
                        <div className='popup-modal shadow-sm mt-3'>
                            <button
                                className='popup-close-btn'
                                onClick={() => {
                                    props.setShowAnalytics(false);
                                }}
                            >
                                <AiOutlineClose size={20} />
                            </button>

                            <AnalyticsGraph />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    switchAddress: (payload) => dispatch(switchAddress(payload)),
    setSelectedTokens: (payload) => dispatch(SELECTED_TOKEN_DEX(payload)),
    changeMarketValue: (payload) => dispatch(HANDLE_TOKEN_VALUES_DEX(payload)),
    getTokenBalance: (payload) => dispatch(GET_TOKEN_BALANCE(payload)),
    convertTokens: (payload) => dispatch(CONVERT_TOKENS(payload)),
    fetchTokenInfo: (payload) => dispatch(tokenInfo(payload)),
    convertMarketValue: (payload) => dispatch(CONVERT_TOKEN_VALUE_DEX(payload)),
    convertMarketValueEmptyState: (payload) =>
        dispatch(CONVERT_TOKEN_VALUE_DEX_EMPTY_STATE(payload)),
    getPriceImpact: (payload) => dispatch(GET_PRICE_IMPACT(payload)),
});
const mapStateToProps = (state) => ({
    selectedToken: state.selectedToken,
    wallet: state.wallet,
    handle_pay_values_market: state.handle_pay_values_market,
    selectedNetwork: state.selectedNetwork,
    convert_pay_values_market: state.convert_pay_values_market,
    tokenBalance: state.tokenBalance,
    priceimpact: state.priceimpact,
});
export default connect(mapStateToProps, mapDispatchToProps)(Swap_Dex);
