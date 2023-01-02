// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { RiQuestionLine } from 'react-icons/ri';
import NumericLabel from 'react-pretty-numbers';
import { connect } from 'react-redux';

import MainModal from '../../Modals';
import INSTA_LOGO from '../../../assets/images/INSTA.png';
import { ChevDown, ChevUp } from '../../../components/Farm/FarmCard';
import {
    GetHarvestValue,
    claimInstaRewards,
    fetchInstaBalance,
    fetchInstaStorage,
    stakeInsta,
    unStakeInsta,
} from '../../../redux/actions/staking/action.staking';
import { connectWallet } from '../../../redux/actions/wallet/action.wallet';

// import { useMediaQuery } from "react-responsive";
export const option = {
    justification: 'L',
    locales: 'en-AU',
    currency: false,
    currencyIndicator: 'AUD',
    percentage: false,
    precision: 0,
    wholenumber: null,
    commafy: true,
    shortFormat: false,
    title: false,
    cssClass: ['class1', 'class2'],
};
const ActiveStaking = (props) => {
    // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const { wallet } = props;
    const { totalRewards } = props.getHarvestValue;
    const {
        APY,
        stakedamount,
        poolWeightedScore,
        currentBlockLevel,
        currentTier,
        stakings,
        TVL,
        APR,
    } = props.stakingDetails;
    const [modalType, setModalType] = useState(null);
    const [operationId, setOperationId] = useState(null);
    const [isOpen, setisOpen] = useState(false);
    const handleModalType = (value) => {
        setModalType(value);
    };

    const stakeInsta = async (userInput) => {
        if (userInput === 0) {
            return;
        }
        setModalType('transfer');
        const args = {
            amount: userInput,
            poolStake: 'ACTIVE',
        };
        const result = await props.stakeInsta(args);
        if (result.payload.success) {
            setModalType('success');
            fetchInstaBalance();
            setOperationId(result.payload.operationId);
        } else {
            setModalType('error');
        }
    };
    const withdraw = async () => {
        if (!wallet) {
            alert('Please connect your wallet to withdraw');
            return;
        }
        setModalType('transfer');
        const args = {
            poolStake: 'ACTIVE',
        };
        const result = await props.claimInstaRewards(args);
        if (result.payload.success) {
            setModalType('success');
            setOperationId(result.payload.operationHash);
            fetchInstaBalance();
        } else {
            setModalType('error');
        }
    };

    const unstake = async (stakes) => {
        setModalType('transfer');
        const args = {
            stakesToUnstake: stakes,
            poolStake: 'ACTIVE',
        };
        const data = await props.unStakeInsta(args);
        if (data.payload.success) {
            setModalType('success');
            setOperationId(data.payload.operationId);
            fetchInstaBalance();
        } else {
            fetchInstaBalance();
            setModalType('error');
        }
    };

    const refresh = () => {
        const args = {
            poolStake: 'ACTIVE',
        };
        props.fetchInstaStorage(args);
        props.fetchInstaBalance(args);
        props.GetHarvestValue(args);
    };

    React.useEffect(() => {
        const interval = setInterval(function () {
            refresh();
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const args = {
            poolStake: 'ACTIVE',
        };
        props.fetchInstaStorage(args);
        props.fetchInstaBalance(args);
        props.GetHarvestValue(args);
        // eslint-disable-next-line
    }, [wallet]);
    return (
        <>
            <MainModal
                setModalType={handleModalType}
                modalType={modalType}
                wallet={wallet}
                balance={props.fetchBalanceDetails}
                staking={stakeInsta}
                operationId={operationId}
                singularStakes={stakings}
                stakeamount={stakedamount}
                unstake={unstake}
                stake_title='Stake $INSTA'
                unstake_title='Unstake $INSTA tokens'
                type='staking'
                currentBlock={currentBlockLevel}
            />
            <div className='row  p-0 row-cols-1 row-cols-md-2 mb-4 mx-0 mx-lg-3  mx-md-3'>
                <div
                    className=' col-md-12  ps-lg-0  col-lg-4 my-4 my-lg-3 col-12  h-100 '
                    // style={{
                    //     width: isPortrait && "20rem",
                    // }}
                >
                    <div className='card pool text-center shadow-sm h-100 border-10'>
                        <div className='card-body '>
                            <div className='w-100 m-auto'>
                                <div>
                                    <img
                                        src={INSTA_LOGO}
                                        width={35}
                                        className='align-center me-2'
                                        alt=''
                                    />
                                    <h6 className='d-inline-block align-center card-title'>
                                        Instaraise
                                    </h6>
                                </div>
                            </div>
                            <div className=' d-flex justify-content-between align-items-center'>
                                <div className='form-group-1 text-start w-48'>
                                    <label htmlFor='usr' className='text-start'>
                                        APY
                                    </label>
                                    <div
                                        className='text-end me-2 pe-2 text-10 w-100 rounded margin-auto'
                                        style={{
                                            border: '0.2px solid #9e9e9e3d',
                                            fontSize: '0.8rem',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                        }}
                                    >
                                        {APY}%
                                    </div>
                                </div>
                                <div className='form-group-2 text-start w-48'>
                                    <label htmlFor='usr' className='text-start'>
                                        APR
                                    </label>
                                    <div
                                        className='text-end pe-2 w-100 rounded  margin-auto'
                                        style={{
                                            border: '0.2px solid #9e9e9e3d',
                                            fontSize: '0.8rem',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                        }}
                                    >
                                        {APR ? APR.toPrecision(2) : 0}%
                                    </div>
                                </div>
                            </div>
                            <div className=' d-flex justify-content-between align-items-center'>
                                <div className='form-group-1 text-start w-48'>
                                    <label htmlFor='usr' className='text-start'>
                                        Current tier
                                    </label>
                                    <div
                                        className='text-end me-2 pe-2 text-10 w-100 rounded margin-auto'
                                        style={{
                                            border: '0.2px solid #9e9e9e3d',
                                            fontSize: '0.8rem',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                        }}
                                    >
                                        {currentTier}
                                    </div>
                                </div>
                                <div className='form-group-2 text-start w-48'>
                                    <label htmlFor='usr' className='text-start'>
                                        Pool weight
                                    </label>
                                    <div
                                        className='text-end pe-2 w-100 rounded py-2 margin-auto'
                                        style={{
                                            border: '0.2px solid #9e9e9e3d',
                                        }}
                                    >
                                        {poolWeightedScore}
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex py-3 mt-3 bg-light-secondary rounded px-4  justify-content-between align-items-center  text-12 '>
                                <div className='fw-600'>TVL</div>
                                <div className='fw-600 d-flex'>
                                    $
                                    <NumericLabel params={option}>
                                        {TVL ? TVL.toPrecision(6) : 0}
                                    </NumericLabel>
                                </div>
                            </div>
                            <div className='py-3 w-100 d-flex justify-content-center'>
                                {wallet && stakings.length > 0 && (
                                    <>
                                        <div
                                            className='text-end pe-2 w-100 rounded py-2 margin-auto'
                                            style={{
                                                border: '0.2px solid #9e9e9e3d',
                                            }}
                                        >
                                            {stakedamount}
                                        </div>
                                        <button
                                            onClick={() =>
                                                setModalType('stake')
                                            }
                                            className='text-center w-100 button-primary  px-3 py-2  btn-faucet rounded py-2 margin-auto'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='25'
                                                height='25'
                                                fill='currentColor'
                                                className='bi bi-plus'
                                                viewBox='0 0 16 16'
                                            >
                                                <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setModalType('unstake')
                                            }
                                            className='text-center button-primary  px-2 py-2  ms-2 rounded py-2 margin-auto'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='25'
                                                height='25'
                                                fill='currentColor'
                                                className='bi bi-dash'
                                                viewBox='0 0 16 16'
                                            >
                                                <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' />
                                            </svg>
                                        </button>
                                    </>
                                )}
                                {wallet && stakings.length <= 0 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setModalType('stake')
                                            }
                                            className='text-center w-100 button-primary  px-3 py-2  btn-faucet rounded py-2 margin-auto'
                                        >
                                            Stake now
                                        </button>
                                    </>
                                )}
                                {!wallet && (
                                    <button
                                        onClick={() =>
                                            props.connectWallet({
                                                NETWORK: 'mainnet',
                                            })
                                        }
                                        className='text-center w-100 button-primary  px-3 py-2  btn-faucet rounded py-2 margin-auto'
                                    >
                                        + Connect wallet
                                    </button>
                                )}
                            </div>
                            <hr className='p-0 mt-2 mb-0' />
                            <div
                                className='px-3 pt-3 gradient-text-v text-center text-14 cursor-pointer fw-600'
                                onClick={() => setisOpen(!isOpen)}
                            >
                                {isOpen ? 'Hide' : 'Details'}&nbsp;
                                {isOpen ? (
                                    <span>
                                        <ChevUp />
                                    </span>
                                ) : (
                                    <span>
                                        <ChevDown />
                                    </span>
                                )}
                            </div>
                            <div
                                className={`collapse ${
                                    isOpen ? 'show' : ''
                                } pt-3`}
                            >
                                <div className='mb-3 bg-light-secondary b-4 w-100 w-lg-75 d-flex justify-content-center'>
                                    <>
                                        <div className='text-end pe-2 w-100 rounded py-2 margin-auto'>
                                            {totalRewards
                                                ? totalRewards.toPrecision(3)
                                                : 0}
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (
                                                    wallet &&
                                                    stakings.length > 0
                                                ) {
                                                    withdraw();
                                                }
                                            }}
                                            className={`text-center shadow-none ${
                                                wallet && stakings.length > 0
                                                    ? 'button-primary'
                                                    : 'disable-b'
                                            }  px-3 py-2 ms-2 rounded py-2 margin-auto`}
                                        >
                                            Harvest
                                        </button>
                                    </>
                                </div>
                                <div className='d-flex justify-content-around my-3 my-lg-0 my-md-0'>
                                    <div className='me-4'>
                                        <h5 className='mb-0 d-inline-block card-title text-sm  text-center'>
                                            Deposit fee
                                        </h5>
                                        <div className='my-2'>
                                            <RiQuestionLine size={25} />
                                            <span className='text-sm ms-1'>
                                                0%
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className='mb-0 d-inline-block card-title text-sm text-center'>
                                            Withdrawal fee
                                        </h5>
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                setModalType('withdraw')
                                            }
                                            className='my-2'
                                        >
                                            <RiQuestionLine size={25} />
                                            <span className='ms-1 text-sm'>
                                                Variable
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-start text-12 pt-2 mb-2  d-flex flex-column'>
                                    <button
                                        className='btn btn-faucet rounded btn-sm button-primary shadow-none py-2'
                                        onClick={() =>
                                            window.open(
                                                'https://quipuswap.com/swap?to=KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ_0&from=tez'
                                            )
                                        }
                                    >
                                        Buy INSTA&nbsp;
                                        <BiLinkExternal />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 col-lg-8 '>
                    <div className='d-flex flex-column flex-md-row flex-lg-column justify-content-between h-100'>
                        <div className='card border-10 px-0 py-2 d-block d-lg-block d-md-inline-block col-12 text-dark-to-light h-100'>
                            <div className='card-body'>
                                <div className='d-flex justify-content-center mb-0 align-items-center'>
                                    <h5 className='mb-0 d-inline-block card-title text-16 text-center'>
                                        Instaraise tiers
                                    </h5>
                                </div>
                                <div>
                                    <hr />
                                </div>
                                <div className='d-flex justify-content-center mb-0 align-items-center'>
                                    <div>
                                        <h6 className='text-sm text-center text-dark-to-light'>
                                            Instaraise will showcase a fixed
                                            tier system based on the number of
                                            tokens staked.
                                        </h6>
                                    </div>
                                </div>
                                <div className='mx-2 mx-lg-3 mx-md-3 my-4'>
                                    <ul>
                                        <li>
                                            <h6 className=''>
                                                <span className='fw-bold'>
                                                    2000 INSTA
                                                </span>{' '}
                                                <span className='text-sm '>
                                                    required before sale to
                                                    unlock Economy tier
                                                </span>
                                            </h6>
                                        </li>
                                        <li>
                                            <h6 className=''>
                                                <span className='fw-bold'>
                                                    20,000 INSTA
                                                </span>{' '}
                                                <span className='text-sm '>
                                                    required before sale to
                                                    unlock Business class tier
                                                </span>
                                            </h6>
                                        </li>
                                        <li>
                                            <h6 className=''>
                                                <span className='fw-bold'>
                                                    50,000 INSTA
                                                </span>{' '}
                                                <span className='text-sm '>
                                                    required before sale to
                                                    unlock First class tier
                                                </span>
                                            </h6>
                                        </li>
                                        <li>
                                            <h6 className=''>
                                                <span className='fw-bold'>
                                                    100,000 INSTA
                                                </span>{' '}
                                                <span className='text-sm '>
                                                    required before sale to
                                                    unlock Executive first class
                                                    tier
                                                </span>
                                            </h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchInstaStorage: (payload) => dispatch(fetchInstaStorage(payload)),
    fetchInstaBalance: (payload) => dispatch(fetchInstaBalance(payload)),
    stakeInsta: (payload) => dispatch(stakeInsta(payload)),
    claimInstaRewards: (payload) => dispatch(claimInstaRewards(payload)),
    GetHarvestValue: (payload) => dispatch(GetHarvestValue(payload)),
    unStakeInsta: (payload) => dispatch(unStakeInsta(payload)),
    connectWallet: (payload) => dispatch(connectWallet(payload)),
});

const mapStateToProps = (state) => ({
    wallet: state.wallet,
    stakingDetails: state.stakingDetails,
    fetchBalanceDetails: state.fetchBalanceDetails,
    getHarvestValue: state.getHarvestValue,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveStaking);
