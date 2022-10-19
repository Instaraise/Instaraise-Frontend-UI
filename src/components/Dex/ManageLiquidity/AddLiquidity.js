import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { connect } from 'react-redux';

import {
    SELECT_POOL_PAIR,
    SET_STAKED_TOKEN,
} from '../../../redux/actions/dex/action.liquidity';
const AddLiquidity = (props) => {
    return (
        <div>
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
                            href='/launchpad/faq/#provide_liquidity'
                            className='router-l text-dark-to-light'
                        >
                            1. How do I make money by providing liquidity?
                        </a>
                        <br />

                        <a
                            href='/launchpad/faq/#impermanent_loss'
                            className='router-l text-dark-to-light'
                        >
                            2. What is impermanent loss?
                        </a>
                        <br />
                        <a
                            href='/launchpad/faq#insta'
                            className='router-l text-dark-to-light'
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
                        // onClick={() => {
                        //     setTransfer('from');
                        //     setModalState(!modalState);
                        // }}
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
                        <div className='ms-2 text-14'>
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
                            // onClick={() => {
                            //     setTransfer('to');
                            //     setModalState(!modalState);
                            //     props.fetchNetworkTokenLimit({
                            //         contractAddress:
                            //             props.liquidityPair.DEX_ADDRESS,
                            //         tokenAddress:
                            //             props.liquidityPair.TOKEN_ADDRESS,
                            //         tokenId: props.liquidityPair.FIRST_TOKEN_ID,
                            //     });
                            // }}
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
                            <div className='ms-2'>
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
                        className='btn w-100 mb-2 border-10 shadow-none  mt-2 btn-sm button-primary'
                    >
                        Connect wallet
                    </button>
                )}

                {props.wallet && (
                    <button
                        type='submit'
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     addLiquidity();
                        // }}
                        className='text-center border-10 button-primary btn-faucet w-100 py-1  rounded py-2 margin-auto my-2'
                    >
                        Add Liquidity
                    </button>
                )}
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setStakedPair: (payload) => dispatch(SET_STAKED_TOKEN(payload)),
    setLiquidityPoolPair: (payload) => dispatch(SELECT_POOL_PAIR(payload)),
});
const mapStateToProps = (state) => ({
    wallet: state.wallet,
    liquidityPair: state.liquidityPair,
    stakedPair: state.stakedPair,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddLiquidity);
