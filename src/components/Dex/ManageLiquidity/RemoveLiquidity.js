import React from 'react';
import { BiChevronDown, BiLoaderAlt } from 'react-icons/bi';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import MainModal from '../../Modals';
import RemoveLiquidityModal from '../../Modals/DexModals/RemoveLiquidityModal';
import {
    GET_USER_LIQUIDITY_POSITION,
    REMOVE_LIQUIDITY,
} from '../../../redux/actions/dex/action.liquidity';
import { connectWallet } from '../../../redux/actions/wallet/action.wallet';
import { ThemeContext } from '../../../routes/root';
const RemoveLiquidity = (props) => {
    const { currencyType } = props;
    const [liquidityLoader, setLiquidityLoader] = React.useState(false);
    const [modalType, setModalType] = React.useState(null);
    const [operationId, setOperationId] = React.useState('');
    const { theme } = React.useContext(ThemeContext);
    const [modalState, setModalState] = React.useState(false);
    const [removeLiquidityPair, setRemoveLiquidityPair] = React.useState({
        name: null,
        logo: null,
        positionId: null,
        tokenAddress: null,
        tokenId: null,
        amount: null,
        initialAmount: null,
        tokenType: null,
    });
    const handleClose = () => {
        setModalState(false);
    };
    const removeLiquidity = async () => {
        try {
            setLiquidityLoader(true);
            setModalType('transfer');
            const request = await props.removeLiquidity({
                positionId: removeLiquidityPair.positionId,
                selectedNetwork: props.selectedNetwork,
                contractAddress: props.liquidityPair.DEX_ADDRESS,
                tokenAddress: removeLiquidityPair.tokenAddress,
                tokenId: removeLiquidityPair.tokenId,
                tokenType: removeLiquidityPair.tokenType,
                portion:
                    Number(removeLiquidityPair.amount) /
                    Number(removeLiquidityPair.initialAmount),
            });
            if (request.payload.success) {
                setModalType('success');
                setOperationId(request.payload.operationId);
                setLiquidityLoader(false);
                props.getUserLiquidityPositions({
                    tokenIndex: props.liquidityPair.id,
                    baseTokenDecimal: props.liquidityPair.DECIMAL_SECOND_TOKEN,
                    contractAddress: props.liquidityPair.DEX_ADDRESS,
                    NETWORK: props.selectedNetwork,
                });
                setRemoveLiquidityPair({
                    name: null,
                    logo: null,
                    positionId: null,
                    tokenAddress: null,
                    tokenId: null,
                    amount: null,
                    initialAmount: null,
                    tokenType: null,
                });
            } else {
                setModalType('error');
                setLiquidityLoader(false);
                setRemoveLiquidityPair({
                    name: null,
                    logo: null,
                    positionId: null,
                    tokenAddress: null,
                    tokenId: null,
                    amount: null,
                    initialAmount: null,
                    tokenType: null,
                });
            }
        } catch (error) {
            setLiquidityLoader(false);
        }
    };
    return (
        <div>
            {/* for success, fail */}
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
            <RemoveLiquidityModal
                isOpen={modalState}
                handleClose={handleClose}
                currencyType={currencyType}
                setRemoveLiquidityPair={(value) =>
                    setRemoveLiquidityPair(value)
                }
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div id='#market'>
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
                                    Learn what it means to add liquidity to a
                                    pool:
                                </span>
                                <br />
                                <br />
                                <a
                                    // href='/launchpad/faq/#provide_liquidity'
                                    className=' text-dark-to-light'
                                >
                                    1. How do I make money by providing
                                    liquidity?
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
                                    3. How does INSTA protect me; from
                                    impermanent loss?
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='px-2 py-3 d-flex justify-content-between align-items-center'>
                        <div className='text-14 fw-500 text-dark-to-light'>
                            Select Position
                        </div>
                        {props.liquidityPair.FIRST_TOKEN_NAME &&
                        props.liquidityPair.SECOND_TOKEN_NAME ? (
                            <div
                                className='d-flex bg-f9 py-1 px-3 border-20 cursor-pointer cursor-pointer align-items-center'
                                onClick={() => {
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
                                        src={
                                            props.liquidityPair.FIRST_TOKEN_LOGO
                                        }
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
                                        src={
                                            props.liquidityPair
                                                .SECOND_TOKEN_LOGO
                                        }
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
                    {removeLiquidityPair.name && (
                        <div className='px-2  mb-3 d-flex justify-content-between align-items-center'>
                            <div>
                                <div className='text-sm mb-2 fw-500 text-dark-to-light'>
                                    Provided Liquidity
                                </div>
                                <div className='d-flex cursor-pointer cursor-pointer align-items-center'>
                                    <div>
                                        <img
                                            src={removeLiquidityPair.logo}
                                            style={{
                                                borderRadius: '100%',
                                            }}
                                            width={35}
                                            height={35}
                                        />
                                    </div>
                                    <div className='ms-2 text-dark-to-light'>
                                        {removeLiquidityPair.name}
                                        {/* <span>
                                            <BiChevronDown />
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                            <div className='w-80'>
                                <div className='position-relative'>
                                    <input
                                        id='market_from'
                                        placeholder={`${
                                            currencyType === 'USD'
                                                ? '~$0.00'
                                                : '0'
                                        }`}
                                        type='number'
                                        onChange={(e) => {
                                            setRemoveLiquidityPair({
                                                name: removeLiquidityPair.name,
                                                logo: removeLiquidityPair.logo,
                                                amount: e.target.value,
                                                initialAmount:
                                                    removeLiquidityPair.initialAmount,
                                                positionId:
                                                    removeLiquidityPair.positionId,
                                                tokenAddress:
                                                    removeLiquidityPair.tokenAddress,
                                                tokenId:
                                                    removeLiquidityPair.tokenId,
                                            });
                                        }}
                                        value={removeLiquidityPair.amount}
                                        className='token-information text-14 text-end input-bar pb-3 pt-3 px-3 border-20 text-dark-to-light'
                                    />
                                </div>
                            </div>
                        </div>
                    )}
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
                                className='btn w-100 mb-2 border-10 shadow-none  mt-2 btn-sm button-primary'
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
                                    if (removeLiquidityPair.amount) {
                                        removeLiquidity();
                                    }
                                }}
                                style={{
                                    paddingTop: '12px',
                                    paddingBottom: '12px',
                                }}
                                className='text-center border-10 button-primary btn-faucet w-100 py-2 margin-auto my-2'
                            >
                                Remove Liquidity
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    connectWallet: (payload) => dispatch(connectWallet(payload)),
    getUserLiquidityPositions: (payload) =>
        dispatch(GET_USER_LIQUIDITY_POSITION(payload)),
    removeLiquidity: (payload) => dispatch(REMOVE_LIQUIDITY(payload)),
});
const mapStateToProps = (state) => ({
    wallet: state.wallet,
    liquidityPair: state.liquidityPair,
    selectedNetwork: state.selectedNetwork,
});
export default connect(mapStateToProps, mapDispatchToProps)(RemoveLiquidity);
