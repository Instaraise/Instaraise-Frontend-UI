import React from 'react';
import { AiFillMinusCircle } from 'react-icons/ai';
import { MdOutlineAddCircle } from 'react-icons/md';
import { RiShieldFlashFill, RiShieldFlashLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DEX_LIQUIDITY_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import { SELECTED_TOKEN_DEX } from '../../../redux/actions/dex/action.dex';
import {
    GET_LIQUIDITY_POSITION,
    HANDLE_TOKEN_VALUE_POOLS,
    POOL_STATS,
    SELECT_POOL_PAIR,
    SET_CONVERTED_VALUE_EMPTY,
} from '../../../redux/actions/dex/action.liquidity';
import { midusdformatter } from '../../../utils/formatNumber';
const LiquidityPositionTable = (props) => {
    React.useEffect(() => {
        props.fetchPoolStats();
        props.fetchliquidityPositions({
            NETWORK: props.selectedNetwork,
        });
    }, [props.wallet]);
    return (
        <div className='pb-5'>
            <div className='card_i shadow-sm'>
                <div className='p-4 d-flex text-dark-to-light justify-content-between align-item-center '>
                    <h6 className='d-flex mt-1 flex-column justify-content-start p-0 text-dark-to-light fw-600 '>
                        Your LP Holdings
                    </h6>
                </div>
                <div className='table-responsive dex-card '>
                    <table className='table text-12 table-hover-tokens table-borderless px-3 m-0'>
                        <TableHeader />
                        <tbody className='text-14 position-relative '>
                            <tr>
                                <td></td>
                            </tr>
                            {props.liquidityPositions.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.liquidityProvided !== 0 && (
                                        <LiquidityPosition
                                            key={item.id}
                                            item={item}
                                            props={props}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                {props.liquidityPositions.filter(
                    (item) => item.liquidityProvided === 0
                ).length === DEX_LIQUIDITY_TOKEN_CONFIG.length && (
                    <h6 className='mx-auto my-5 text-center p-0 text-dark-to-light fw-600 '>
                        No Holdings available
                    </h6>
                )}
                {props.liquidityPositions.length === 0 && (
                    <h6 className='mx-auto my-5 text-center p-0 text-dark-to-light fw-600 '>
                        No Holdings available
                    </h6>
                )}
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setLiquidityPoolPair: (payload) => dispatch(SELECT_POOL_PAIR(payload)),
    setStakedValue: (payload) => dispatch(SET_CONVERTED_VALUE_EMPTY(payload)),
    setSelectedTokens: (payload) => dispatch(SELECTED_TOKEN_DEX(payload)),
    changeStakedValue: (payload) => dispatch(HANDLE_TOKEN_VALUE_POOLS(payload)),
    fetchliquidityPositions: (payload) =>
        dispatch(GET_LIQUIDITY_POSITION(payload)),
    fetchPoolStats: (payload) => dispatch(POOL_STATS(payload)),
});

const mapStateToProps = (state) => ({
    wallet: state.wallet,
    selectedToken: state.selectedToken,
    selectedNetwork: state.selectedNetwork,
    liquidityPositions: state.liquidityPositions,
    poolData: state.poolData,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LiquidityPositionTable);
const LiquidityPosition = ({ item, props }) => {
    const router = useNavigate();

    const addLiquidity = (data, type) => {
        props.setLiquidityPoolPair(data);
        props.changeStakedValue('');
        props.setStakedValue();
        router(
            `/dex/liquidity/configure-liquidity?kt=${data.dexAddress}&type=${type}`
        );
    };

    const Data = (item) => {
        if (!props.poolData.success) {
            return {
                apr: 0,
            };
        } else {
            try {
                // console.log(props.poolData.data[0]);
                const data = props.poolData.data[0][item.dexAddress2];
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
        <tr className='name-col fw-500  hover-class'>
            <td colSpan={8} className='col-sm-2 fixed-col name-col' scope='row'>
                <div className='my-2 d-flex align-items-center justify-content-start div-block '>
                    <div className='me-3 text-dark-to-light'>
                        <RiShieldFlashFill
                            size={25}
                            className='cursor-pointer'
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center ms-2 p-2 image-background-color border-10'>
                        <img
                            src={item.networkToken.logo}
                            alt='token_logo'
                            width={30}
                            height={30}
                            style={{
                                zIndex: '1',
                                borderRadius: '100%',
                            }}
                        />
                        <img
                            src={item.baseToken.logo}
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
                        {item.networkToken.name}
                        <div className='text-mini '>{item.baseToken.name}</div>
                    </div>
                </div>
            </td>
            <td
                style={{
                    minWidth: '180px',
                    fontSize: '12px',
                }}
                colSpan={2}
            >
                <div className='my-2 text-center justify-content-center d-flex align-items-center div-block text-dark-to-light'>
                    {item.networkToken.addedLiquidity}&nbsp;
                    {item.networkToken.name}
                    <br />
                    {item.baseToken.addedLiquidity}&nbsp;
                    {item.baseToken.name}
                </div>
            </td>
            <td
                style={{
                    minWidth: '180px',
                    fontSize: '12px',
                }}
                colSpan={2}
            >
                <div
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title={`Current APR : ${Data(item).apr}`}
                    className='cursor-pointer my-2 d-flex justify-content-center align-items-center div-block text-dark-to-light'
                >
                    {Data(item).apr ? midusdformatter(Data(item).apr) : '-'}
                </div>
            </td>
            <td
                style={{
                    minWidth: '120px',
                }}
                colSpan={2}
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
                    <div className='ms-2'>
                        <div className='my-2 d-flex align-items-center justify-content-center'>
                            <button
                                onClick={() => addLiquidity(item, 'remove')}
                                className='shadow-sm ms-2 text-12 px-1 m-auto py-1 btn rounded btn-sm trade-button'
                            >
                                <AiFillMinusCircle size={20} />
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
                    colSpan={8}
                    style={{
                        minWidth: '80px',
                        position: 'sticky',
                        left: '0',
                        zIndex: '1',
                    }}
                >
                    <div className='fw-500 d-flex align-items-end justify-content-start my-2'>
                        <div className='me-4 text-dark-to-light'>
                            <RiShieldFlashLine
                                size={25}
                                className='cursor-pointer'
                            />
                        </div>
                        <div>&nbsp;Name</div>
                    </div>
                </th>
                <th
                    style={{
                        minWidth: '100px',
                    }}
                    colSpan={2}
                >
                    <div className=' fw-500 text-center my-2 '>LP Share </div>
                </th>
                <th
                    style={{
                        minWidth: '180px',
                    }}
                    colSpan={2}
                >
                    <div className='my-2  text-center fw-500'>APR</div>
                </th>
                <th
                    className='col-sm-2 name-col-r'
                    colSpan={2}
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
