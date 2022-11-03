// eslint-disable-next-line
import React, { useState } from 'react';

import { BiLinkExternal } from 'react-icons/bi';
import { RiAlertLine } from 'react-icons/ri';
import { connect } from 'react-redux';

import MainModal from '../Modals';
import VariableWidthToolTip from '../Tooltip';
import { connectWallet } from '../../redux/actions/wallet/action.wallet';
import {
    CLAIM_FARMS_REWARDS,
    FARM_STAKE_BAL_RESPONSE,
    FARM_USER_BALANCE_RESPONSE,
    FETCH_INSTA_REWARDS,
    FetchFarmsData,
    STAKE_INSTA_RESPONSE,
    UNSTAKE_INSTA_RESPONSE,
} from '../../redux/actions/farms/action.farms';
const FarmCard = (props) => {
    const { projectdata, wallet } = props;
    const { APR, totalLiquidty, rewardRate } = props.farmData;
    const { balance, singularStakes, currentBlockLevel } = props.FarmStakedData;
    const { totalRewards } = props.getRewards;
    const APY = ((Math.pow(1 + APR / 100 / 365, 365) - 1) * 100).toFixed(0);
    const [isOpen, setisOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [operationId, setOperationId] = useState(null);
    React.useEffect(() => {
        props.fetchFarmDetails();
        props.fetchFarmStakedData(props.projectdata);
        props.FetchUserBalance(props.projectdata);
        props.fetchInstaRewards(props.projectdata);
    }, []);
    const refresh = () => {
        props.fetchFarmDetails();
        props.fetchFarmStakedData(props.projectdata);
        props.FetchUserBalance(props.projectdata);
        props.fetchInstaRewards(props.projectdata);
    };
    React.useEffect(() => {
        const interval = setInterval(function () {
            refresh();
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const claimRewards = async () => {
        setModalType('transfer');
        const Response = await props.claimFarmRewards(props.projectdata);
        if (Response.payload.success) {
            setModalType('success');
            refresh();
            setOperationId(Response.payload.response.operationId);
        } else {
            setModalType('error');
            console.log('error');
        }
    };
    const stakeInsta = async (userInput) => {
        if (userInput === 0) {
            return;
        }
        setModalType('transfer');
        const args = {
            amount: userInput,
            data: props.projectdata,
        };
        const result = await props.stakeInstaFarms(args);
        if (result.payload.success) {
            setModalType('success');
            setOperationId(result.payload.operationId);
            refresh();
        } else {
            setModalType('error');
        }
    };
    const unstake = async (stakes) => {
        setModalType('transfer');
        const args = {
            stakesToUnstake: stakes,
            data: props.projectdata,
        };
        const data = await props.unstakeInstaFarms(args);
        if (data.payload.success) {
            setModalType('success');
            refresh();
            setOperationId(data.payload.operationId);
        } else {
            setModalType('error');
        }
    };
    return (
        <div className='p-0'>
            <MainModal
                setModalType={setModalType}
                modalType={modalType}
                wallet={wallet}
                balance={props.fetchUserBalance}
                operationId={operationId}
                singularStakes={singularStakes}
                stakeamount={balance}
                staking={stakeInsta}
                unstake={unstake}
                currentBlock={currentBlockLevel}
                stake_title='Stake INSTA / XTZ LP'
                unstake_title='Unstake INSTA / XTZ LP'
                type='farm'
            />
            <div
                className='col  m-auto m-lg-0  m-md-0 m-sm-0  px-2 ps-lg-0'
                style={{
                    width: '320px',
                }}
            >
                <div
                    className={`mb-3 card  shadow-sm farm-card border-10 mx-auto`}
                >
                    <div className='p-0 m-0'>
                        <div className='w-100 alert py-2 d-flex align-items-center mb-0 justify-content-between alert-warning px-2 text-dark-to-light fw-500  shadow-sm'>
                            <div className='d-flex align-items-center justify-start'>
                                <RiAlertLine size={22} color='#856305' />
                                <div
                                    className=' ms-1'
                                    style={{
                                        fontSize: '11px',
                                        color: '#856305',
                                    }}
                                >
                                    Reward distribution Stopped, Recharging Soon
                                    !
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card-body pt-0'>
                        <nav className='d-flex justify-content-between '>
                            <div className=''>
                                <div>
                                    <img
                                        src={projectdata.ICON_2}
                                        width={45}
                                        className='farm-img-circle rounded-circle d-inline-block align-top'
                                        alt=''
                                    />
                                </div>
                                <div
                                    className=''
                                    style={{
                                        marginTop: '-25px',
                                        marginLeft: '25px',
                                    }}
                                >
                                    <div>
                                        <img
                                            src={projectdata.ICON_1}
                                            width={40}
                                            className='farm-img-circle d-inline-block align-top  rounded-circle'
                                            alt=''
                                        />
                                    </div>
                                </div>
                            </div>
                            <small className='text-dark-to-light fw-600 '>
                                <span
                                    style={{
                                        fontSize: '15px',
                                    }}
                                >
                                    {projectdata.NAME}
                                </span>
                                <br />
                                <div className='text-dark-to-light text-center d-flex justify-content-end'>
                                    <div className='farm-badge w-75 text-10 py-1 fw-normal'>
                                        {projectdata.DEX_TYPE}
                                    </div>
                                </div>
                            </small>
                        </nav>
                        <div className='d-flex justify-content-between align-items-center'>
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
                                    {APR}%
                                </div>
                            </div>
                        </div>
                        <div className='d-flex py-3 mt-3 bg-light-secondary rounded px-4  justify-content-between align-items-center  text-12 '>
                            <div className='fw-200'>Rewards</div>
                            <div className='fw-200 d-flex'>
                                {`${parseInt(
                                    (rewardRate ?? 0) * 2880
                                )} INSTA / DAY`}
                            </div>
                            {/* Reward type from config */}
                        </div>
                        <div className='d-flex py-3 mt-3 bg-light-secondary rounded px-4  justify-content-between align-items-center  text-12 '>
                            <div className='fw-600'>TVL</div>
                            <div className='fw-600 d-flex'>
                                ${totalLiquidty}
                            </div>
                        </div>
                        {!wallet && (
                            <button
                                onClick={() =>
                                    props.connectWallet({
                                        NETWORK: 'mainnet',
                                    })
                                }
                                className='text-center button-primary btn-faucet w-100 mt-2 py-1 rounded py-2 margin-auto'
                            >
                                + Connect Wallet
                            </button>
                        )}
                        {wallet && singularStakes.length > 0 && (
                            <div className='d-flex my-3 '>
                                <div
                                    className='text-end pe-2 w-100 rounded py-2 margin-auto'
                                    style={{
                                        border: '0.2px solid #9e9e9e3d',
                                    }}
                                >
                                    {balance}
                                </div>
                                <button
                                    onClick={() => setModalType('stake')}
                                    className='text-center button-primary px-2 py-2 ms-2 rounded py-2 margin-auto'
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
                                    onClick={() => setModalType('unstake')}
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
                            </div>
                        )}
                        {wallet && singularStakes.length <= 0 && (
                            <div className='mt-3'>
                                <button
                                    type='submit'
                                    onClick={() => setModalType('stake')}
                                    className='text-center w-100 button-primary  px-3 py-2  btn-faucet rounded py-2 margin-auto'
                                >
                                    Stake now
                                </button>
                            </div>
                        )}
                    </div>
                    <hr className='p-0 m-0' />
                    <div
                        className='p-3 gradient-text-v text-center text-c text-14 cursor-pointer fw-600'
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
                        className={`collapse ${isOpen ? 'show' : ''} px-3 pb-3`}
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
                                        if (wallet && totalRewards !== 0) {
                                            claimRewards();
                                        }
                                    }}
                                    className={`text-center shadow-none ${
                                        wallet && totalRewards !== 0
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
                                <h5 className='mb-0 d-inline-block card-title text-12  text-center'>
                                    Deposit fee{' '}
                                </h5>
                                <div className='my-2 d-flex align-items-center justify-content-start'>
                                    <VariableWidthToolTip text='Deposit fee' />
                                    <span className='text-sm ms-1'>0%</span>
                                </div>
                            </div>
                            <div>
                                <h5 className='mb-0 d-inline-block card-title text-12 text-center'>
                                    Withdrawal fee
                                </h5>

                                <div
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setModalType('withdraw')}
                                    className='my-2 d-flex align-items-center justify-content-end'
                                >
                                    <VariableWidthToolTip text='' />
                                    <span className='text-sm ms-1'>
                                        Variable
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='text-start text-12 pt-2 mb-2  d-flex flex-column'>
                            <button
                                className='btn btn-faucet rounded btn-sm button-primary shadow-none py-2'
                                onClick={() =>
                                    window.open(projectdata.BUY_LINK)
                                }
                            >
                                Go to INSTA-XTZ LP&nbsp;
                                <BiLinkExternal />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    connectWallet: (payload) => dispatch(connectWallet(payload)),
    fetchFarmDetails: (payload) => dispatch(FetchFarmsData(payload)),
    FetchUserBalance: (payload) =>
        dispatch(FARM_USER_BALANCE_RESPONSE(payload)),
    fetchFarmStakedData: (payload) =>
        dispatch(FARM_STAKE_BAL_RESPONSE(payload)),
    fetchInstaRewards: (payload) => dispatch(FETCH_INSTA_REWARDS(payload)),
    claimFarmRewards: (payload) => dispatch(CLAIM_FARMS_REWARDS(payload)),
    stakeInstaFarms: (payload) => dispatch(STAKE_INSTA_RESPONSE(payload)),
    unstakeInstaFarms: (payload) => dispatch(UNSTAKE_INSTA_RESPONSE(payload)),
});
const mapStateToProps = (state) => ({
    wallet: state.wallet,
    farmData: state.farmData,
    FarmStakedData: state.FarmStakedData,
    fetchUserBalance: state.fetchUserBalance,
    getRewards: state.fetchInstaRewards,
});
export default connect(mapStateToProps, mapDispatchToProps)(FarmCard);
export const ChevUp = () => {
    return (
        <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M8.49961 5.80019L4.99961 2.3002L1.49961 5.80019L0.0996094 5.10019L4.99961 0.200195L9.89961 5.10019L8.49961 5.80019Z'
                fill='url(#paint0_linear_202:738)'
            />
            <defs>
                <linearGradient
                    id='paint0_linear_202:738'
                    x1='4.99961'
                    y1='0.200195'
                    x2='4.99961'
                    y2='5.80019'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='#6513E2' />
                    <stop offset='1' stopColor='#8B2BE2' />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const ChevDown = () => {
    return (
        <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M8.49961 0.199805L4.99961 3.6998L1.49961 0.199805L0.0996094 0.899805L4.99961 5.7998L9.89961 0.899805L8.49961 0.199805Z'
                fill='url(#paint0_linear_202:1066)'
            />
            <defs>
                <linearGradient
                    id='paint0_linear_202:1066'
                    x1='4.99961'
                    y1='5.7998'
                    x2='4.99961'
                    y2='0.199805'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='#6513E2' />
                    <stop offset='1' stopColor='#8B2BE2' />
                </linearGradient>
            </defs>
        </svg>
    );
};
