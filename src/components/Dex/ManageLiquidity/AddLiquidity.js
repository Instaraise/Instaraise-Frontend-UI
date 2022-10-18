import React from 'react';
import { connect } from 'react-redux';
const AddLiquidity = (props) => {
    return (
        <div>
            <div
                className='inner bg-f9 px-2 mb-1 mt-2   '
                style={{
                    border: '0.2px solid #9e9e9e3d',
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
            </div>
            <div className='px-2  mb-3 d-flex justify-content-between align-items-center'>
                <div>
                    <div className='text-sm mb-2 fw-500 text-dark-to-light'>
                        Stake Amount
                    </div>
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
                        style={{
                            cursor: 'progress',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                        }}
                        className='btn w-100 mb-2 border-10 shadow-none  mt-2 btn-sm button-primary'
                    ></button>
                )}
                {props.wallet && (
                    <button
                        type='submit'
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     addLiquidity();
                        // }}
                        style={{
                            paddingTop: '12px',
                            paddingBottom: '12px',
                        }}
                        className='text-center button-primary btn-faucet w-100 py-1  rounded py-2 margin-auto'
                    >
                        Add Liquidity
                    </button>
                )}
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    wallet: state.wallet,
});
export default connect(mapStateToProps)(AddLiquidity);
