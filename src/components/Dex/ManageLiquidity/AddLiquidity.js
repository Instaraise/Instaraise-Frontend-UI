// eslint-disable-next-line
import { Skeleton } from '@mui/material';
import React from 'react';
import { BiChevronDown, BiLoaderAlt } from 'react-icons/bi';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

import MainModal from '../../Modals';
import LiquidityModal from '../../Modals/DexModals/liquidityModal';
import { DEX_DATA_REFRESH_TIME } from '../../../config/config';
import {
    ADD_TOKEN_LIQUIDITY,
    CONVERT_TOKEN_VALUES_POOLS,
    GET_TOKEN_BALANCE,
    GET_USER_LIQUIDITY_POSITION,
    HANDLE_TOKEN_VALUE_POOLS,
    NETWORK_TOKEN_LIMIT,
    SELECT_POOL_PAIR,
    SET_CONVERTED_VALUE_EMPTY,
    SET_STAKED_TOKEN,
} from '../../../redux/actions/dex/action.liquidity';
import { connectWallet } from '../../../redux/actions/wallet/action.wallet';
import { ThemeContext } from '../../../routes/root';
const AddLiquidity = (props) => {
    const { currencyType, setFlag } = props;
    const [transfer, setTransfer] = React.useState('to');
    const [loading, setLoading] = React.useState(false);
    const [modalState, setModalState] = React.useState(false);
    const [liquidityLoader, setLiquidityLoader] = React.useState(false);
    const [operationId, setOperationId] = React.useState('');
    const [modalType, setModalType] = React.useState(null);
    const handleClose = () => {
        setModalState(false);
    };
    const { theme } = React.useContext(ThemeContext);
    const limit =
        currencyType === 'Coin'
            ? Number(props.handle_staked_amount_pools) >
              Number(props.tokenBalance)
            : Number(props.convert_staked_amount_pool.value) >
              Number(props.tokenBalance);
    const debounced = useDebouncedCallback(
        async (value, data) => {
            if (props.handle_staked_amount_pools) {
                if (value !== '' && value !== 0 && value) {
                    await props.convertStakedValue(data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    props.setStakedValue();
                }
            }
        },
        // delay in ms
        2000
    );
    const handleChange = (value) => {
        setLoading(true);
        props.changeStakedValue(value);
        if (!value) {
            setLoading(false);
            props.setStakedValue();
            return;
        }
        let data = {
            status: currencyType === 'Coin',
            token1: props.stakedPair.name,
            token2:
                props.stakedPair.name === props.liquidityPair.SECOND_TOKEN_NAME
                    ? props.liquidityPair.FIRST_TOKEN_NAME
                    : props.liquidityPair.SECOND_TOKEN_NAME,
            number: value,
            DEX_TO_ADDRESS:
                props.stakedPair.name !== 'Insta'
                    ? 'INSTA'
                    : props.liquidityPair.DEX_ADDRESS,
            DEX_FROM_ADDRESS:
                props.stakedPair.name !== 'Insta'
                    ? props.liquidityPair.DEX_ADDRESS
                    : 'INSTA',
            selectedNetwork: props.selectedNetwork,
            DECIMAL: props.stakedPair.decimal,
            tokenType: props.stakedPair.tokenType,
            tokenId: props.stakedPair.tokenId,
        };
        debounced(value, data);
    };
    React.useEffect(() => {
        if (props.stakedPair) {
            props.getTokenBalance({
                network: props.selectedNetwork,
                tokenId: props.stakedPair.tokenId,
                tokenType: props.stakedPair.tokenType,
                DECIMAL: props.stakedPair.decimal,
            });
        }
    }, [props.wallet]);
    React.useEffect(() => {
        const interval = setInterval(function () {
            refresh();
        }, DEX_DATA_REFRESH_TIME);
        return () => {
            clearInterval(interval);
        };
    }, [props.wallet, props.handle_staked_amount_pools]);
    const refresh = async () => {
        if (props.handle_staked_amount_pools && props.wallet) {
            setLoading(true);

            let data = {
                status: currencyType === 'Coin',
                token1: props.stakedPair.name,
                token2:
                    props.stakedPair.name ===
                    props.liquidityPair.SECOND_TOKEN_NAME
                        ? props.liquidityPair.FIRST_TOKEN_NAME
                        : props.liquidityPair.SECOND_TOKEN_NAME,
                number: props.handle_staked_amount_pools,
                DEX_TO_ADDRESS:
                    props.stakedPair.name !== 'Insta'
                        ? 'INSTA'
                        : props.liquidityPair.DEX_ADDRESS,
                DEX_FROM_ADDRESS:
                    props.stakedPair.name !== 'Insta'
                        ? props.liquidityPair.DEX_ADDRESS
                        : 'INSTA',
                selectedNetwork: props.selectedNetwork,
                DECIMAL: props.stakedPair.decimal,
                tokenType: props.stakedPair.tokenType,
                tokenId: props.stakedPair.tokenId,
            };
            if (
                props.handle_staked_amount_pools !== '' &&
                props.handle_staked_amount_pools !== 0 &&
                props.handle_staked_amount_pools
            ) {
                await props.convertStakedValue(data);
            } else {
                props.setStakedValue();
            }
        }
        setLoading(false);
    };
    const addLiquidity = async () => {
        try {
            if (
                props.stakedPair.tokenId === '0' &&
                Number(props.handle_staked_amount_pools) >
                    Number(props.networkTokenLimit.data.limit)
            ) {
                toast.error(
                    `Maximum token limit is ${props.networkTokenLimit.data.limit} INSTA`
                );
                return;
            }
            if (limit) {
                toast.error('Insufficient Balance');
                return;
            }
            if (loading) {
                return;
            }
            if (!props.wallet) {
                toast.error('Please connect wallet');
                return;
            }
            if (
                !props.handle_staked_amount_pools ||
                props.handle_staked_amount_pools <= 0
            ) {
                toast.dismiss();
                toast.error('Please enter a valid number');
                return;
            }
            setLiquidityLoader(true);
            setModalType('transfer');
            const response = await props.addLiquidity({
                selectedNetwork: props.selectedNetwork,
                token: props.stakedPair.name,
                amount: props.handle_staked_amount_pools,
                decimals: props.stakedPair.decimal,
                tokenId: props.stakedPair.tokenId,
                dexAddress: props.liquidityPair.DEX_ADDRESS,
                tokenAddress: props.liquidityPair.TOKEN_ADDRESS,
                tokenType: props.liquidityPair.SECOND_TOKEN_TYPE,
            });
            if (response.payload.success) {
                setOperationId(response.payload.operationId);
                setLiquidityLoader(false);
                props.changeStakedValue('');
                props.setStakedValue();
                setModalType('success');
                props.fetchNetworkTokenLimit({
                    contractAddress: props.liquidityPair.DEX_ADDRESS,
                    tokenAddress: props.liquidityPair.TOKEN_ADDRESS,
                    tokenId: props.liquidityPair.FIRST_TOKEN_ID,
                });
                props.getUserLiquidityPositions({
                    tokenIndex: props.liquidityPair.id,
                    baseTokenDecimal: props.liquidityPair.DECIMAL_SECOND_TOKEN,
                    contractAddress: props.liquidityPair.DEX_ADDRESS,
                    NETWORK: props.selectedNetwork,
                });
            } else {
                setLiquidityLoader(false);
                props.fetchNetworkTokenLimit({
                    contractAddress: props.liquidityPair.DEX_ADDRESS,
                    tokenAddress: props.liquidityPair.TOKEN_ADDRESS,
                    tokenId: props.liquidityPair.FIRST_TOKEN_ID,
                });
                props.changeStakedValue('');
                props.setStakedValue();
                setModalType('error');
            }
        } catch (error) {
            setModalType('error');
            props.changeStakedValue('');
            props.setStakedValue();
            setLiquidityLoader(false);
        }
    };
    return (
        <div>
            <MainModal
                setModalType={setModalType}
                modalType={modalType}
                operationId={operationId}
                type='error'
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
            <LiquidityModal
                isOpen={modalState}
                handleClose={handleClose}
                currencyType={currencyType}
                transfer={transfer}
            />
            <div
                className='inner bg-f9 px-2 mb-1 mt-2   '
                style={{
                    border: '0.2px solid rgba(158, 158, 158, 0.24)',
                    borderRadius: '20px',
                }}
            >
                <div className='px-2 text-12 py-3 d-flex justify-content-between align-items-center'>
                    <div className=''>
                        <span className='text-14 fw-500 text-dark-to-light'>
                            Learn what it means to add liquidity to a pool:
                        </span>
                        <br />
                        <br />
                        <a
                            // href='/launchpad/faq/#provide_liquidity'
                            className=' text-dark-to-light'
                        >
                            1. How do I make money by providing liquidity?
                        </a>
                        <br />

                        <a
                            // href='/launchpad/faq/#impermanent_loss'
                            className=' text-dark-to-light'
                        >
                            2. What is impermanent loss?
                        </a>
                        <br />
                        <a
                            // href='/launchpad/faq#insta'
                            className=' text-dark-to-light'
                        >
                            3. How does INSTA protect me; from impermanent loss?
                        </a>
                    </div>
                </div>
            </div>
            <div className='px-2 py-3 d-flex justify-content-between align-items-center'>
                <div className='text-14 fw-500 text-dark-to-light'>
                    Staked Pool
                </div>
                {props.liquidityPair.FIRST_TOKEN_NAME &&
                props.liquidityPair.SECOND_TOKEN_NAME ? (
                    <div
                        className='d-flex bg-f9 py-1 px-3 border-20 cursor-pointer cursor-pointer align-items-center'
                        onClick={() => {
                            setFlag(true);
                            setTransfer('from');
                            setModalState(!modalState);
                        }}
                        style={{
                            border: '0.2px solid rgba(158, 158, 158, 0.24)',
                            borderRadius: '20px',
                        }}
                    >
                        <div
                            style={{
                                zIndex: '1',
                            }}
                        >
                            <img
                                src={props.liquidityPair.FIRST_TOKEN_LOGO}
                                style={{
                                    borderRadius: '100%',
                                }}
                                width={25}
                                height={25}
                            />
                        </div>
                        <div
                            style={{
                                marginLeft: '-10px',
                            }}
                        >
                            <img
                                src={props.liquidityPair.SECOND_TOKEN_LOGO}
                                style={{
                                    borderRadius: '100%',
                                }}
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className='ms-2 text-14 text-dark-to-light'>
                            {props.liquidityPair.FIRST_TOKEN_NAME}/
                            {props.liquidityPair.SECOND_TOKEN_NAME}
                            <span>
                                <BiChevronDown size={20} />
                            </span>
                        </div>
                    </div>
                ) : (
                    <div
                        className='spinner-grow text-light border-20 px-5'
                        role='status'
                    >
                        <span className='sr-only'></span>
                    </div>
                )}
            </div>
            <div className='px-2  mb-3 d-flex justify-content-between align-items-center'>
                <div>
                    <div className='text-sm mb-2 fw-500 text-dark-to-light'>
                        Stake Amount
                    </div>
                    {props.liquidityPair.FIRST_TOKEN_NAME &&
                    props.stakedPair ? (
                        <div
                            className='d-flex cursor-pointer cursor-pointer align-items-center'
                            onClick={() => {
                                setTransfer('to');
                                setModalState(!modalState);
                                props.fetchNetworkTokenLimit({
                                    contractAddress:
                                        props.liquidityPair.DEX_ADDRESS,
                                    tokenAddress:
                                        props.liquidityPair.TOKEN_ADDRESS,
                                    tokenId: props.liquidityPair.FIRST_TOKEN_ID,
                                });
                            }}
                        >
                            <div>
                                <img
                                    src={props.stakedPair.logo}
                                    style={{
                                        borderRadius: '100%',
                                    }}
                                    width={35}
                                    height={35}
                                />
                            </div>
                            <div className='ms-2 text-dark-to-light'>
                                {props.stakedPair.name}
                                <span>
                                    <BiChevronDown />
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div
                            className='spinner-grow text-light border-20 px-5'
                            role='status'
                        >
                            <span className='sr-only'></span>
                        </div>
                    )}
                </div>
                <div className='w-80'>
                    <div className='position-relative'>
                        {limit && !loading ? (
                            <div
                                style={{
                                    color: 'red',
                                }}
                                className='text-12 text-end mb-1 text-dark-to-light'
                            >
                                Max Balance : {props.tokenBalance}
                            </div>
                        ) : (
                            <div className='text-12 text-end mb-1 text-dark-to-light'>
                                Balance : {props.tokenBalance}
                            </div>
                        )}
                        {loading && (
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
                                        borderRadius: '20px',
                                        backgroundColor: !theme
                                            ? '#15202B'
                                            : 'none',
                                    }}
                                    width={100}
                                    height={11}
                                />
                            </label>
                        )}
                        {limit && !loading && (
                            <label
                                style={{
                                    right: '0px',
                                    color: 'red',
                                    bottom: '8px',
                                }}
                                className='text-10 fw-600 position-absolute pe-3'
                            >
                                Insufficient {props.stakedPair.name}{' '}
                            </label>
                        )}
                        {!limit && !loading && (
                            <label
                                htmlFor='market_from'
                                className='text-10 fw-600 position-absolute pe-3 text-dark-to-light'
                                style={{
                                    right: '0px',
                                    bottom: '0px',
                                }}
                            >
                                {currencyType === 'Coin' && '~$'}
                                {props.convert_staked_amount_pool.value
                                    ? props.convert_staked_amount_pool.value
                                    : null}
                                &nbsp;
                                {currencyType === 'USD' &&
                                    `${props.stakedPair.name}`}
                            </label>
                        )}
                        <input
                            id='market_from'
                            style={{
                                cursor: props.wallet ? 'auto' : 'not-allowed',
                                border: limit && !loading && '1px solid red',
                            }}
                            placeholder={`${
                                currencyType === 'USD' ? '~$0.00' : '0'
                            }`}
                            disabled={!props.wallet}
                            type='number'
                            onChange={(e) => handleChange(e.target.value)}
                            value={`${props.handle_staked_amount_pools}`}
                            className='token-information text-14 text-end input-bar pb-4 pt-2 px-3 border-20 text-dark-to-light'
                        />
                    </div>
                    {props.stakedPair && props.stakedPair.tokenId === '0' && (
                        <div className='text-12 text-end mt-1 text-dark-to-light'>
                            Token Limit :{' '}
                            {props.networkTokenLimit.success
                                ? props.networkTokenLimit.data.limit
                                : '-'}
                        </div>
                    )}
                </div>
            </div>
            <div className='w-100 mt-2'>
                {!props.wallet && (
                    <button
                        type='button'
                        onClick={(e) => {
                            e.preventDefault();
                            props.connectWallet({
                                NETWORK: props.selectedNetwork,
                            });
                        }}
                        style={{
                            paddingTop: '12px',
                            paddingBottom: '12px',
                        }}
                        className='text-center border-10 button-primary btn-faucet w-100 py-2 margin-auto my-2'
                    >
                        Connect wallet
                    </button>
                )}
                {props.wallet && liquidityLoader && (
                    <button
                        type='submit'
                        style={{
                            cursor: 'progress',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                        }}
                        className='text-center border-10 button-primary btn-faucet w-100 py-2 margin-auto my-2'
                    >
                        <div className='rotate-2'>
                            <BiLoaderAlt size={20} />
                        </div>
                    </button>
                )}
                {props.wallet && !liquidityLoader && (
                    <button
                        type='submit'
                        onClick={(e) => {
                            e.preventDefault();
                            addLiquidity();
                        }}
                        className='text-center border-10 button-primary btn-faucet w-100 py-2 margin-auto my-2'
                    >
                        Add Liquidity
                    </button>
                )}
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    changeStakedValue: (payload) => dispatch(HANDLE_TOKEN_VALUE_POOLS(payload)),
    convertStakedValue: (payload) =>
        dispatch(CONVERT_TOKEN_VALUES_POOLS(payload)),
    setStakedValue: (payload) => dispatch(SET_CONVERTED_VALUE_EMPTY(payload)),
    setStakedPair: (payload) => dispatch(SET_STAKED_TOKEN(payload)),
    setLiquidityPoolPair: (payload) => dispatch(SELECT_POOL_PAIR(payload)),
    addLiquidity: (payload) => dispatch(ADD_TOKEN_LIQUIDITY(payload)),
    getTokenBalance: (payload) => dispatch(GET_TOKEN_BALANCE(payload)),
    connectWallet: (payload) => dispatch(connectWallet(payload)),
    fetchNetworkTokenLimit: (payload) => dispatch(NETWORK_TOKEN_LIMIT(payload)),
    getUserLiquidityPositions: (payload) =>
        dispatch(GET_USER_LIQUIDITY_POSITION(payload)),
});
const mapStateToProps = (state) => ({
    wallet: state.wallet,
    liquidityPair: state.liquidityPair,
    stakedPair: state.stakedPair,
    selectedNetwork: state.selectedNetwork,
    handle_staked_amount_pools: state.handle_staked_amount_pools,
    tokenBalance: state.tokenBalance,
    convert_staked_amount_pool: state.convert_staked_amount_pool,
    networkTokenLimit: state.network_token_limit,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddLiquidity);
