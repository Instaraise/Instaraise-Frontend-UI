import React, { useState } from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';

import Claim from './Claim';
import { DATA } from './TierData';
import MainModal from '../../Modals';

const PoolDetails = (props) => {
    const {
        SaleData,
        projectData,
        fetchSaleData,
        claimTokens,
        wallet,
        participateInSale,
        projectContractAddress,
    } = props;
    const [modalType, setModalType] = useState(null);
    const [operationId, setOperationId] = useState(null);
    const [saleType, setSaleType] = useState(null);
    const [tab, setTab] = useState('invest');

    const handleModalType = (value) => {
        setModalType(value);
    };

    const ClaimNow = async () => {
        if (!wallet) {
            alert('Please connect wallet');
            return;
        }
        setModalType('transfer');
        const API_RESPONSE = await claimTokens({
            contractAddress: projectData.POOL_ADDRESS,
        });
        if (API_RESPONSE.payload.success) {
            fetchSaleData();
            setOperationId(API_RESPONSE.payload.operationHash);
            setModalType('success');
        } else {
            setModalType('error');
        }
    };

    let participatingStatus = false;
    if (
        new Date() >= new Date(projectData.START_TIME) &&
        new Date() <= new Date(projectData.END_TIME)
    ) {
        participatingStatus = true;
    }

    let participateInFCFS = false;
    if (new Date() >= new Date(projectData.FCFS_OPEN_TIME)) {
        participateInFCFS = true;
    }

    const handleOperationId = (value) => {
        setOperationId(value);
    };

    const FCFS_OPEN_TIME = new Date(projectData.FCFS_OPEN_TIME).toString();
    const START_TIME = new Date(projectData.START_TIME).toString();

    const TOKEN_PRICE = projectData.IsDiscountedUser
        ? projectData.DISCOUNTED_PRICE
        : projectData.TOKEN_PRICE;
    const XTZRate = TOKEN_PRICE;

    const SWAP_RATE = `1 XTZ = ${(1 / XTZRate).PrecisionMaker(2)} ${
        projectData.TOKEN_NAME
    }`;

    return (
        <div className='pool-detail-teir  fw-500'>
            <MainModal
                setModalType={handleModalType}
                modalType={modalType}
                operationId={operationId}
                allocation={SaleData.data.allocation}
                wallet={wallet}
                fetchSaleData={fetchSaleData}
                projectData={projectData}
                saleType={saleType}
                participateInSale={participateInSale}
                handleOperationId={handleOperationId}
                contractAddress={projectContractAddress}
            />
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-start'>
                    <div className='d-flex justify-content-start text-14 py-1 '>
                        <div className='p-1 cursor-pointer'>
                            <span
                                className={
                                    tab === 'invest'
                                        ? 'text-toggle-selected'
                                        : 'text-toggle'
                                }
                                onClick={() => {
                                    setTab('invest');
                                }}
                            >
                                Invest
                            </span>
                        </div>
                        <div className='text-border'></div>
                        <div className='p-1 cursor-pointer'>
                            <span
                                className={
                                    tab === 'claim'
                                        ? 'text-toggle-selected'
                                        : 'text-toggle'
                                }
                                onClick={() => {
                                    setTab('claim');
                                }}
                            >
                                Claim
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {tab === 'invest' ? (
                <>
                    <div className='tiers'>
                        {props.isKyced && <TableHeader />}
                        {DATA.map((item, index) => (
                            <div key={index}>
                                {item.tier === SaleData.data.currentier && (
                                    <div className='tier card shadow-sm my-4 my-lg-2 border-10'>
                                        <div className=' row d-flex align-items-center'>
                                            <div className='py-3 col-lg-3 col-md-12 text-20 d-flex justify-content-center justify-content-lg-start'>
                                                <div className='plane'>
                                                    <FaPlaneDeparture className='plane-img d-inline-block align-center me-2' />
                                                    <span className='text-14 '>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='col-lg col-md-6 m-0  py-3  text-12  text-lg-center text-center text-md-left '>
                                                <span className='text-second d-block d-sm-block d-md-block d-lg-none'>
                                                    Start time
                                                </span>
                                                <br className='text-10 d-block d-sm-block d-md-block d-lg-none' />
                                                {START_TIME}
                                            </div>
                                            <div className=' col-lg col-md-6  py-3 d-inline-block text-12 align-bottom text-lg-center text-center text-md-left '>
                                                <span className='text-second d-block d-md-block  d-sm-block d-lg-none'>
                                                    Total raise
                                                </span>
                                                <br className='d-block d-md-block d-sm-block d-lg-none' />
                                                {item.totalraise}
                                            </div>
                                            <div className=' col-lg col-md-6  py-3 text-center text-12 order-12'>
                                                <span className='text-second d-block d-md-block d-sm-block d-lg-none'>
                                                    Your min allocation
                                                </span>
                                                <br className='d-block d-sm-block d-md-block d-lg-none' />
                                                {item.min} xꜩ
                                            </div>
                                            <div className='col-lg col-md-6 text-center py-3 d-inline-block text-12 align-bottom text-lg-center text-md-left '>
                                                <span className='text-second d-block d-md-block d-sm-block d-lg-none'>
                                                    Your max allocation{' '}
                                                </span>
                                                <br className='d-block d-md-block d-sm-block d-lg-none' />
                                                {item.tier ===
                                                SaleData.data.currentier
                                                    ? `${SaleData.data.allocation} xꜩ`
                                                    : 'Not eligible'}
                                            </div>
                                            <div className='col-lg col-md-6 text-center py-3 d-inline-block text-12 align-bottom text-lg-center text-md-left '>
                                                <span className='text-second d-block d-md-block d-sm-block d-lg-none'>
                                                    Swap rate{' '}
                                                </span>
                                                <br className='d-block d-md-block d-sm-block d-lg-none' />
                                                {projectData.MULTI_SWAP_RATE
                                                    ? projectData.SWAP_RATE_NON_FCFS
                                                    : SWAP_RATE}
                                            </div>
                                            <div className='col-lg  col-md-12 py-3 d-flex justify-content-center order-1'>
                                                {item.tier ===
                                                SaleData.data.currentier ? (
                                                    <button
                                                        onClick={() => {
                                                            if (
                                                                participatingStatus
                                                            ) {
                                                                setSaleType(
                                                                    'private'
                                                                );
                                                                setModalType(
                                                                    'joinpool'
                                                                );
                                                            }
                                                        }}
                                                        className={`shadow-none text-14 ${
                                                            participatingStatus
                                                                ? 'connect-wallet-button'
                                                                : 'disable-b'
                                                        } px-3 btn btn-sm `}
                                                    >
                                                        Join Pool
                                                    </button>
                                                ) : (
                                                    <div className='text-sm'>
                                                        Not eligible
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {props.isKyced && (
                            <div>
                                <div className='tier card shadow-sm my-4 my-lg-2 border-10'>
                                    <div className=' row d-flex align-items-center'>
                                        <div className='py-3 col-lg-3 col-md-12 text-20 d-flex justify-content-center justify-content-lg-start'>
                                            <div className='plane'>
                                                <FaPlaneDeparture className='plane-img d-inline-block align-center me-2' />
                                                <span className='text-14 '>
                                                    FCFS
                                                </span>
                                            </div>
                                        </div>
                                        <div className='col-lg col-md-6 m-0  py-3  text-12  text-lg-center text-center text-md-left '>
                                            <span className='d-block d-sm-block d-md-block d-lg-none'>
                                                Start time
                                            </span>
                                            <br className='text-10 d-block d-sm-block d-md-block d-lg-none' />
                                            {FCFS_OPEN_TIME}
                                        </div>
                                        <div className=' col-lg col-md-6  py-3 d-inline-block text-12 align-bottom text-lg-center text-center text-md-left '>
                                            <span className='d-block d-md-block  d-sm-block d-lg-none'>
                                                Total raise
                                            </span>
                                            <br className='d-block d-md-block d-sm-block d-lg-none' />
                                            {projectData.FCFS_TOTAL_RAISE}
                                        </div>
                                        <div className=' col-lg col-md-6  py-3 text-center text-12 order-12'>
                                            <span className='d-block d-md-block d-sm-block d-lg-none'>
                                                Your min allocation
                                            </span>
                                            <br className='d-block d-sm-block d-md-block d-lg-none' />
                                            {projectData.FCFS_MIN_ALLOCATION}
                                        </div>
                                        <div className='col-lg col-md-6 text-center py-3 d-inline-block text-12 align-bottom text-lg-center text-md-left '>
                                            <span className='d-block d-md-block d-sm-block d-lg-none'>
                                                Your max allocation{' '}
                                            </span>
                                            <br className='d-block d-md-block d-sm-block d-lg-none' />
                                            {projectData.FCFS_MAX_ALLOCATION}
                                        </div>
                                        <div className='col-lg col-md-6 text-center py-3 d-inline-block text-12 align-bottom text-lg-center text-md-left '>
                                            <span className='d-block d-md-block d-sm-block d-lg-none'>
                                                Swap rate{' '}
                                            </span>
                                            <br className='d-block d-md-block d-sm-block d-lg-none' />
                                            {projectData.MULTI_SWAP_RATE
                                                ? projectData.SWAP_RATE_FCFS
                                                : SWAP_RATE}
                                        </div>
                                        <div className='col-lg  col-md-12 py-3 d-flex justify-content-center order-1'>
                                            {wallet ? (
                                                <button
                                                    onClick={() => {
                                                        if (participateInFCFS) {
                                                            setSaleType(
                                                                'public'
                                                            );
                                                            setModalType(
                                                                'joinpool'
                                                            );
                                                        }
                                                    }}
                                                    className={`shadow-none text-14 ${
                                                        participateInFCFS
                                                            ? 'connect-wallet-button'
                                                            : 'disable-b'
                                                    } px-3 btn btn-sm`}
                                                >
                                                    Join Pool
                                                </button>
                                            ) : (
                                                <div className='text-sm'>
                                                    + Connect Wallet
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <>
                        {!SaleData.data.IsWhitelistedUser && !props.isKyced ? (
                            <div className='col-md-12 col-lg mw-100 h-100 mt-4 p-0'>
                                <div className='card project-detail  shadow-sm h-100 border-10'>
                                    <div className='card-body  d-flex align-items-center '>
                                        <h5 className='card-title text-16 m-auto'>
                                            No Investments on this address
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </>
                </>
            ) : (
                <Claim
                    SaleData={SaleData}
                    projectData={projectData}
                    ClaimNow={ClaimNow}
                />
            )}
        </div>
    );
};

export default PoolDetails;

const TableHeader = () => {
    return (
        <div className='card my-2'>
            <div className='row d-lg-flex d-none py-1 d-flex align-items-center'>
                <div className='w-25 col-sm-3 text-20'>
                    <span className='text-14'></span>
                </div>
                <div className='text-second col-sm w-25 d-inline-block text-12 align-bottom text-center'>
                    Start time
                </div>
                <div className='text-second col-sm w-25 d-inline-block text-12 align-bottom text-center'>
                    Total raise
                </div>
                <div className='text-second col-sm w-25 d-inline-block text-12 align-bottom text-center'>
                    Your min allocation
                </div>
                <div className='text-second col-sm w-25 d-inline-block text-12 align-bottom text-center'>
                    Your max allocation
                </div>
                <div className='text-second col-sm w-25 d-inline-block text-12 align-bottom text-center'>
                    Swap rate
                </div>
                <div className='col-sm w-25 d-flex justify-content-end'></div>
            </div>
        </div>
    );
};
