import React from 'react';
import { IoArrowBackOutline, IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import AddLiquidity from './AddLiquidity';
import RemoveLiquidity from './RemoveLiquidity';
import AppLayout from '../../dashboard/Layout/index';
import { DEX_DATA_REFRESH_TIME } from '../../../config/config';
import { DEX_LIQUIDITY_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import {
    GET_USER_LIQUIDITY_POSITION,
    NETWORK_TOKEN_LIMIT,
    SELECT_POOL_PAIR,
    SET_CONVERTED_VALUE_EMPTY,
    SET_STAKED_TOKEN,
} from '../../../redux/actions/dex/action.liquidity';
import { GET_TOKEN_BALANCE } from '../../../redux/actions/dex/action.liquidity';
import { ThemeContext } from '../../../routes/root';
const AddLiquidityPage = (props) => {
    const navigate = useNavigate();
    const { theme } = React.useContext(ThemeContext);
    const [currencyType] = React.useState('Coin');
    const [flag, setFlag] = React.useState(false);
    const [selectedLiquidityState, setSelectedLiquidityState] =
        React.useState('add');
    const location = useLocation();
    React.useEffect(() => {
        const search = window.location.search;
        if (search) {
            refresh(search);
            props.setStakedValue();
        }
    }, [location.search]);
    React.useEffect(() => {
        const search = window.location.search;
        const interval = setInterval(function () {
            if (search) {
                refresh(search);
            }
        }, DEX_DATA_REFRESH_TIME);
        return () => {
            clearInterval(interval);
        };
    }, [location.search, props.stakedPair]);
    const refresh = (search) => {
        const address = search.split('=')[1].split('&')[0];
        const type = search.split('=')[2];
        setSelectedLiquidityState(type);
        let data;
        if (props.selectedNetwork === 'TESTNET') {
            data = DEX_LIQUIDITY_TOKEN_CONFIG.filter((item) => {
                return item.DEX_ADDRESS === address;
            })[0];
        } else {
            data = DEX_LIQUIDITY_TOKEN_CONFIG.filter((item) => {
                return item.DEX_ADDRESS === address;
            })[0];
        }
        let pairData;
        if (props.stakedPair && props.stakedPair.name === 'Insta') {
            pairData = {
                name: data.FIRST_TOKEN_NAME,
                logo: data.FIRST_TOKEN_LOGO,
                tokenId: data.FIRST_TOKEN_ID,
                tokenType: data.FIRST_TOKEN_TYPE,
                tokenIndex: data.id,
                contractAddress: data.DEX_ADDRESS,
                decimal: data.DECIMAL_FIRST_TOKEN,
                tokenAddress: data.TOKEN_ADDRESS,
                baseTokenDecimal: data.DECIMAL_SECOND_TOKEN,
            };
            props.fetchNetworkTokenLimit({
                contractAddress: data.DEX_ADDRESS,
                tokenAddress: data.TOKEN_ADDRESS,
                tokenId: data.FIRST_TOKEN_ID,
            });
        } else {
            pairData = {
                name: data.SECOND_TOKEN_NAME,
                logo: data.SECOND_TOKEN_LOGO,
                tokenId: data.SECOND_TOKEN_ID,
                tokenType: data.SECOND_TOKEN_TYPE,
                tokenIndex: data.id,
                contractAddress: data.DEX_ADDRESS,
                decimal: data.DECIMAL_SECOND_TOKEN,
                tokenAddress: data.TOKEN_ADDRESS,
                baseTokenDecimal: data.DECIMAL_SECOND_TOKEN,
            };
        }
        props.getTokenBalance({
            network: props.selectedNetwork,
            tokenId: pairData.tokenId,
            tokenType: pairData.tokenType,
            DECIMAL: pairData.decimal,
        });
        props.setLiquidityPoolPair(data);
        props.getUserLiquidityPositions({
            tokenIndex: pairData.tokenIndex,
            baseTokenDecimal: pairData.baseTokenDecimal,
            contractAddress: pairData.contractAddress,
            NETWORK: props.selectedNetwork,
        });
        let token = {
            name: pairData.name,
            logo: pairData.logo,
            decimal: pairData.decimal,
            tokenType: pairData.tokenType,
            tokenId: pairData.tokenId,
        };
        props.setStakedPair(token);
    };
    return (
        <AppLayout>
            <div className='d-flex mt-5 justify-content-center align-items-center'>
                <div className='dex card_i shadow-sm p-2 token-information mx-3 shadow-sm'>
                    <div className='d-flex align-items-center justify-content-between px-2 py-2'>
                        {flag ? (
                            <div className=' text-dark-to-light cursor-pointer'>
                                <IoArrowBackOutline
                                    size={25}
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                />
                            </div>
                        ) : null}
                        <div className='d-flex justify-content-start py-2 '>
                            <div className=''>
                                <span className='fw-bold text-16 me-2 text-dark-to-light'>
                                    Configure liquidity
                                </span>
                            </div>
                        </div>
                        <div className='cursor-pointer d-flex align-items-center justify-content-center text-dark-to-light'>
                            <IoClose
                                size={25}
                                onClick={() => {
                                    navigate('/dex/liquidity');
                                }}
                            />
                        </div>
                    </div>
                    <div className='divider px-0'></div>
                    <div className='d-flex mt-2 align-items-center justify-content-between'>
                        <div
                            style={{
                                border:
                                    selectedLiquidityState === 'add'
                                        ? '0.2px solid #9e9e9e3d'
                                        : 'none',
                                backgroundColor:
                                    selectedLiquidityState === 'add'
                                        ? !theme
                                            ? 'black'
                                            : '#F9FAFA'
                                        : !theme
                                        ? '#080421'
                                        : 'white',
                            }}
                            onClick={() => {
                                setSelectedLiquidityState('add');
                            }}
                            className=' w-100  cursor-pointer text-center py-2 border-10'
                        >
                            <span className='text-14 fw-500 text-dark-to-light'>
                                Add Liquidity
                            </span>{' '}
                        </div>
                        {props.userLiquidityPositions.positions.length > 0 ? (
                            <div
                                style={{
                                    border:
                                        selectedLiquidityState === 'remove'
                                            ? '0.2px solid #9e9e9e3d'
                                            : 'none',
                                    backgroundColor:
                                        selectedLiquidityState === 'remove'
                                            ? !theme
                                                ? 'black'
                                                : '#F9FAFA'
                                            : !theme
                                            ? '#080421'
                                            : 'white',
                                }}
                                onClick={() => {
                                    setSelectedLiquidityState('remove');
                                }}
                                className='w-100 cursor-pointer ms-2 text-center py-2 border-10'
                            >
                                <span className='text-14 fw-500 text-dark-to-light'>
                                    Remove Liquidity
                                </span>
                            </div>
                        ) : null}
                    </div>
                    {selectedLiquidityState === 'add' ? (
                        <AddLiquidity
                            currencyType={currencyType}
                            setFlag={setFlag}
                        />
                    ) : (
                        <RemoveLiquidity
                            setSelectedLiquidityState={(val) =>
                                setSelectedLiquidityState(val)
                            }
                            currencyType={currencyType}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
};
const mapDispatchToProps = (dispatch) => ({
    getTokenBalance: (payload) => dispatch(GET_TOKEN_BALANCE(payload)),
    setStakedValue: (payload) => dispatch(SET_CONVERTED_VALUE_EMPTY(payload)),
    getUserLiquidityPositions: (payload) =>
        dispatch(GET_USER_LIQUIDITY_POSITION(payload)),
    setStakedPair: (payload) => dispatch(SET_STAKED_TOKEN(payload)),
    fetchNetworkTokenLimit: (payload) => dispatch(NETWORK_TOKEN_LIMIT(payload)),
    setLiquidityPoolPair: (payload) => dispatch(SELECT_POOL_PAIR(payload)),
});

const mapStateToProps = (state) => ({
    userLiquidityPositions: state.userLiquidityPositions,
    selectedNetwork: state.selectedNetwork,
    stakedPair: state.stakedPair,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddLiquidityPage);
