import { useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DEX_LIQUIDITY_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import {
    CONVERT_TOKEN_VALUES_POOLS,
    GET_TOKEN_BALANCE,
    POOL_STATS,
    SELECT_POOL_PAIR,
    SET_CONVERTED_VALUE_EMPTY,
    SET_STAKED_TOKEN,
} from '../../../redux/actions/dex/action.liquidity';
import { ThemeContext } from '../../../routes/root';
function LiquidityModal(props) {
    const router = useNavigate();
    const matches = useMediaQuery('(min-width:600px)');
    const { theme } = React.useContext(ThemeContext);
    const { isOpen, handleClose, transfer, currencyType } = props;
    const [tokenData, setTokenArray] = React.useState(
        props.selectedNetwork === 'TESTNET'
            ? DEX_LIQUIDITY_TOKEN_CONFIG
            : DEX_LIQUIDITY_TOKEN_CONFIG
    );
    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        width: !matches ? '90vw' : '25vw',
        bgcolor: theme ? '#fff' : '#160335',
        color: theme ? '#4e5d78' : '#ffffff',
        borderRadius: '10px',
        boxShadow: 24,
        outline: 'none',
        pb: 3,
        px: 2,
    };

    const setTokenData = (data) => {
        props.setLiquidityPoolPair(data);
        props.setStakedPair({
            name: data.FIRST_TOKEN_NAME,
            logo: data.FIRST_TOKEN_LOGO,
            decimal: data.DECIMAL_FIRST_TOKEN,
            tokenType: data.FIRST_TOKEN_TYPE,
            tokenId: data.FIRST_TOKEN_ID,
        });
        props.getTokenBalance({
            network: props.selectedNetwork,
            tokenId: data.FIRST_TOKEN_ID,
            tokenType: data.FIRST_TOKEN_TYPE,
            DECIMAL: data.DECIMAL_FIRST_TOKEN,
        });
        let info = {
            status: currencyType === 'Coin' ? true : false,
            token1: data.FIRST_TOKEN_NAME,
            token2: data.SECOND_TOKEN_NAME,
            number:
                currencyType === 'Coin'
                    ? props.handle_staked_amount_pools
                    : props.convert_staked_amount_pool.value,
            DEX_TO_ADDRESS:
                data.FIRST_TOKEN_NAME !== 'Insta'
                    ? 'INSTA'
                    : props.liquidityPair.DEX_ADDRESS,
            DEX_FROM_ADDRESS:
                data.FIRST_TOKEN_NAME !== 'Insta'
                    ? props.liquidityPair.DEX_ADDRESS
                    : 'INSTA',
            selectedNetwork: props.selectedNetwork,
            DECIMAL: data.DECIMAL_FIRST_TOKEN,
            tokenType: data.FIRS_TOKEN_TYPE,
            tokenId: data.FIRST_TOKEN_ID,
        };

        convertValue(info);
        router(
            `/dex/liquidity/configure-liquidity/?kt=${data.DEX_ADDRESS}&type=add`
        );
        handleClose();
    };

    const filterData = (search) => {
        if (search) {
            let newData = tokenData.filter((item) => {
                return item.FIRST_TOKEN_NAME.toLowerCase().includes(
                    search.toLowerCase()
                );
            });
            setTokenArray(newData);
        } else {
            setTokenArray(
                props.selectedNetwork === 'TESTNET'
                    ? DEX_LIQUIDITY_TOKEN_CONFIG
                    : DEX_LIQUIDITY_TOKEN_CONFIG
            );
        }
    };

    React.useEffect(() => {
        props.fetchPoolStats();
        setTokenArray(
            props.selectedNetwork === 'TESTNET'
                ? DEX_LIQUIDITY_TOKEN_CONFIG
                : DEX_LIQUIDITY_TOKEN_CONFIG
        );
    }, [isOpen]);

    const convertValue = (data) => {
        if (data.number !== '' && data.number !== 0) {
            props.convertStakedValue(data);
        } else {
            props.setStakedValue();
        }
    };

    const Data = (item) => {
        if (!props.poolData.success) {
            return {
                apr: 10,
            };
        } else {
            try {
                const data = props.poolData.data[0][item.DEX_ADDRESS];

                return {
                    apr: parseFloat(data.apr),
                };
            } catch (err) {
                return {
                    apr: null,
                };
            }
        }
    };

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={isOpen}
            onClose={() => handleClose('dex')}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    <div className='d-flex justify-content-end'>
                        <div
                            className='d-flex justify-content-center align-items-center'
                            onClick={() => handleClose('dex')}
                            style={{
                                cursor: 'pointer',
                                border: '2px solid #ffff',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                marginTop: '-8px',
                                marginRight: '-24px',
                                backgroundColor: theme ? '#4e5d78' : '#080421',
                            }}
                        >
                            <MdClose color='white' size={20} />
                        </div>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h6>
                                Select your{' '}
                                {transfer === 'from' ? 'pair' : 'token'}
                            </h6>
                        </div>
                        <div className='mb-2'>
                            <div
                                className='py-2 d-flex align-items-center px-2 border-10 bg-f9'
                                style={{
                                    border: '1px solid #e6e6e6',
                                }}
                            >
                                <BiSearch />
                                <input
                                    placeholder='Search your token'
                                    onChange={(e) => filterData(e.target.value)}
                                    className='w-100  text-12 text-dark-to-light ms-2 text-start'
                                />
                            </div>
                        </div>
                        <p className='m-0 text-14'>
                            {transfer === 'from' ? 'Pools' : 'Assets'}
                        </p>
                        {transfer === 'from' ? (
                            <div className='pt-2'>
                                {tokenData.map((token, index) => (
                                    <div key={index}>
                                        <div
                                            key={index}
                                            className={`d-flex ${
                                                !theme
                                                    ? 'token-hover-2'
                                                    : 'token-hover'
                                            } py-2 cursor-pointer mb-1 text-12  d-flex justify-content-between align-items-center px-2 border-10 cursor-pointer align-items-center`}
                                            onClick={() => setTokenData(token)}
                                        >
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div
                                                    style={{
                                                        zIndex: '1',
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            token.FIRST_TOKEN_LOGO
                                                        }
                                                        style={{
                                                            borderRadius:
                                                                '100%',
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
                                                        src={
                                                            token.SECOND_TOKEN_LOGO
                                                        }
                                                        style={{
                                                            borderRadius:
                                                                '100%',
                                                        }}
                                                        width={25}
                                                        height={25}
                                                    />
                                                </div>
                                                <div className='ms-2'>
                                                    {token.FIRST_TOKEN_NAME}/
                                                    {token.SECOND_TOKEN_NAME}
                                                </div>
                                            </div>
                                            <div
                                                className='text-mini fw-500 px-2'
                                                style={{
                                                    padding: '3px',
                                                }}
                                            >
                                                {Data(token).apr
                                                    ? Data(token).apr
                                                    : 0}
                                                %
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div className='pt-2'>
                                    <div
                                        className={`d-flex ${
                                            !theme
                                                ? 'token-hover-2'
                                                : 'token-hover'
                                        } py-2 cursor-pointer mb-1 text-12  d-flex justify-content-between align-items-center px-2 border-10 cursor-pointer align-items-center`}
                                        onClick={() => {
                                            props.setStakedPair({
                                                name: props.liquidityPair
                                                    .FIRST_TOKEN_NAME,
                                                logo: props.liquidityPair
                                                    .FIRST_TOKEN_LOGO,
                                                decimal:
                                                    props.liquidityPair
                                                        .DECIMAL_FIRST_TOKEN,
                                                tokenType:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_TYPE,
                                                tokenId:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_ID,
                                            });
                                            props.getTokenBalance({
                                                network: props.selectedNetwork,
                                                tokenId:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_ID,
                                                tokenType:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_TYPE,
                                                DECIMAL:
                                                    props.liquidityPair
                                                        .DECIMAL_FIRST_TOKEN,
                                            });
                                            let info = {
                                                status:
                                                    currencyType === 'Coin'
                                                        ? true
                                                        : false,
                                                token1: props.liquidityPair
                                                    .FIRST_TOKEN_NAME,
                                                token2: props.liquidityPair
                                                    .SECOND_TOKEN_NAME,
                                                number:
                                                    currencyType === 'Coin'
                                                        ? props.handle_staked_amount_pools
                                                        : props
                                                              .convert_staked_amount_pool
                                                              .value,
                                                DEX_TO_ADDRESS:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_NAME !==
                                                    'Insta'
                                                        ? 'INSTA'
                                                        : props.liquidityPair
                                                              .DEX_ADDRESS,
                                                DEX_FROM_ADDRESS:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_NAME !==
                                                    'Insta'
                                                        ? props.liquidityPair
                                                              .DEX_ADDRESS
                                                        : 'INSTA',
                                                selectedNetwork:
                                                    props.selectedNetwork,
                                                DECIMAL:
                                                    props.liquidityPair
                                                        .DECIMAL_FIRST_TOKEN,
                                                tokenType:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_TYPE,
                                                tokenId:
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_ID,
                                            };
                                            convertValue(info);
                                            handleClose();
                                        }}
                                    >
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <img
                                                    src={
                                                        props.liquidityPair
                                                            .FIRST_TOKEN_LOGO
                                                    }
                                                    style={{
                                                        borderRadius: '100%',
                                                    }}
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>
                                            <div className='ms-2'>
                                                {
                                                    props.liquidityPair
                                                        .FIRST_TOKEN_NAME
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-2'>
                                    <div
                                        className={`d-flex ${
                                            !theme
                                                ? 'token-hover-2'
                                                : 'token-hover'
                                        } py-2 cursor-pointer mb-1 text-12  d-flex justify-content-between align-items-center px-2 border-10 cursor-pointer align-items-center`}
                                        onClick={() => {
                                            props.setStakedPair({
                                                name: props.liquidityPair
                                                    .SECOND_TOKEN_NAME,
                                                logo: props.liquidityPair
                                                    .SECOND_TOKEN_LOGO,
                                                decimal:
                                                    props.liquidityPair
                                                        .DECIMAL_SECOND_TOKEN,
                                                tokenType:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_TYPE,
                                                tokenId:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_ID,
                                            });
                                            props.getTokenBalance({
                                                network: props.selectedNetwork,
                                                tokenId:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_ID,
                                                tokenType:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_TYPE,
                                                DECIMAL:
                                                    props.liquidityPair
                                                        .DECIMAL_SECOND_TOKEN,
                                            });
                                            let info = {
                                                status:
                                                    currencyType === 'Coin'
                                                        ? true
                                                        : false,
                                                token1: props.liquidityPair
                                                    .SECOND_TOKEN_NAME,
                                                token2: props.liquidityPair
                                                    .FIRST_TOKEN_NAME,
                                                number:
                                                    currencyType === 'Coin'
                                                        ? props.handle_staked_amount_pools
                                                        : props
                                                              .convert_staked_amount_pool
                                                              .value,
                                                DEX_TO_ADDRESS:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_NAME !==
                                                    'Insta'
                                                        ? 'INSTA'
                                                        : props.liquidityPair
                                                              .DEX_ADDRESS,
                                                DEX_FROM_ADDRESS:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_NAME !==
                                                    'Insta'
                                                        ? props.liquidityPair
                                                              .DEX_ADDRESS
                                                        : 'INSTA',
                                                selectedNetwork:
                                                    props.selectedNetwork,
                                                DECIMAL:
                                                    props.liquidityPair
                                                        .DECIMAL_SECOND_TOKEN,
                                                tokenType:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_TYPE,
                                                tokenId:
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_ID,
                                            };
                                            convertValue(info);
                                            handleClose();
                                        }}
                                    >
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <img
                                                    src={
                                                        props.liquidityPair
                                                            .SECOND_TOKEN_LOGO
                                                    }
                                                    width={25}
                                                    height={25}
                                                    style={{
                                                        borderRadius: '100%',
                                                    }}
                                                />
                                            </div>
                                            <div className='ms-2'>
                                                {
                                                    props.liquidityPair
                                                        .SECOND_TOKEN_NAME
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setLiquidityPoolPair: (payload) => dispatch(SELECT_POOL_PAIR(payload)),
    setStakedPair: (payload) => dispatch(SET_STAKED_TOKEN(payload)),
    getTokenBalance: (payload) => dispatch(GET_TOKEN_BALANCE(payload)),

    convertStakedValue: (payload) =>
        dispatch(CONVERT_TOKEN_VALUES_POOLS(payload)),
    setStakedValue: (payload) => dispatch(SET_CONVERTED_VALUE_EMPTY(payload)),
    fetchPoolStats: (payload) => dispatch(POOL_STATS(payload)),
});

const mapStateToProps = (state) => ({
    handle_staked_amount_pools: state.handle_staked_amount_pools,
    convert_staked_amount_pool: state.convert_staked_amount_pool,
    stakedPair: state.stakedPair,
    liquidityPair: state.liquidityPair,
    selectedNetwork: state.selectedNetwork,
    poolData: state.poolData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LiquidityModal);
