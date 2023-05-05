// eslint-disable-next-line
import React, { useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AppLayout from '../../components/dashboard/Layout/index';
import PoolDetails from '../../components/Launchpad/ProjectTiers/PoolDetails';
import { NETWORK, TZKT_NODES } from '../../config/config';
import { IDO_CONFIG } from '../../config/Launchpad/Ido/IdoConfig';
import { POOL_ADDRESS } from '../../config/Launchpad/Ido/IdoConfig';
import Socials from '../../config/Launchpad/Ido/IdoProjectSocials';
import { kycProcess } from '../../redux/actions/common/action.token';
import {
    FetchSaleData,
    ParticipateInSale,
    claimNow,
} from '../../redux/actions/ido/action.ido';
import NotFound from '../NotFound/NotFound';

const LaunchIdoProjects = (props) => {
    const {
        SaleData,
        fetchSaleData,
        kycStatus,
        participateInSale,
        wallet,
        claimTokens,
    } = props;
    const params = useParams();
    const [projectData, setProjectData] = useState([]);

    const tiers = {
        EC: 'Economy Class',
        FC: 'First Class',
        BC: 'Business Class',
        EFC: 'Executive First Class',
    };
    let statement;
    if (tiers[SaleData.data.currentier] && kycStatus.isWhitelisted) {
        statement = `You are whitelisted for ${
            tiers[SaleData.data.currentier]
        } and FCFS round`;
    } else if (kycStatus.isWhitelisted) {
        statement = `You are whitelisted for FCFS round`;
    } else {
        statement = 'You are not whitelisted';
    }
    const PROJECT_NAME = params.name;
    const projectContractAddress = POOL_ADDRESS[PROJECT_NAME].POOL_ADDRESS;
    const fetchProjectDetails = async () => {
        // Fetching Project Data from PROJECTINFO
        const data = IDO_CONFIG.filter((item) => {
            return item.ALIAS === PROJECT_NAME;
        })[0];
        // fetch sale data
        setProjectData(data);
        if (PROJECT_NAME && POOL_ADDRESS[PROJECT_NAME]) {
            await fetchSaleData({
                contractAddress: POOL_ADDRESS[PROJECT_NAME].POOL_ADDRESS,
                ENROLLMENT_KEY: data.ENROLLMENT_KEY,
                pricePerToken: data.TOKEN_PRICE,
                DECIMALS: data.DECIMALS,
                SALE_MAP_KEY: data.SALE_MAP_KEY,
            });
            let info = {
                wallet: wallet,
                projectName: data.ALIAS,
            };
            await props.fetchKYCDetails(info);
        }
    };

    const DECIMALS = projectData.DECIMALS;
    let progressPercentage = (
        (SaleData.data.totalTokensSold /
            (SaleData.data.totalTokensToSell / Math.pow(10, DECIMALS))) *
        100
    ).PrecisionMaker(2);
    progressPercentage =
        projectData.ALIAS === 'shuttleone' ? 82 : progressPercentage;
    React.useEffect(() => {
        const interval = setInterval(function () {
            fetchProjectDetails();
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    React.useEffect(() => {
        fetchProjectDetails();
        // eslint-disable-next-line
    }, []);
    React.useEffect(() => {
        fetchProjectDetails();
        // eslint-disable-next-line
    }, [wallet]);
    const links = projectData.SOCIAL_HANDLES;
    return (
        <div>
            <AppLayout flag={props.flag}>
                <div className='row row-cols-1 row-cols-md-2 my-3 g-4 mx-0 mx-lg-3 mx-md-3 '>
                    <div className='col-md-12 col-lg-6 mw-70'>
                        <div className='card project-detail  shadow-sm h-100 border-10'>
                            <div className='card-body form-header'>
                                <img
                                    src={projectData.ICON}
                                    width={45}
                                    className='my-3 d-inline-block align-top me-2 rounded-circle'
                                    alt=''
                                />
                                <h5 className='card-title form-header'>
                                    {projectData.PROJECT_NAME}
                                </h5>
                                <p className='m-auto card-text mx-4 my-3 text-sm text-second font-insta-regular'>
                                    {projectData.DESCRIPTION}
                                </p>
                                <div className='d-flex justify-content-center mt-4 me-3'>
                                    <Socials
                                        width={27}
                                        margin='ms-3'
                                        height={27}
                                        medium={links ? links.MEDIUM : ''}
                                        website={links ? links.WEBSITE : ''}
                                        twitter={links ? links.TWITTER : ''}
                                        telegram={links ? links.TELEGRAM : ''}
                                    />
                                </div>
                                <hr />
                                <p className='m-auto card-text mx-4 text-j fw-500 text-sm text-center'>
                                    {statement}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 col-lg-6'>
                        <div className='card token-information shadow-sm h-100 border-10 pt-2'>
                            <div className='card-body font-insta-regular'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h5 className='card-title text-18 text-dark-to-light form-header'>
                                        Token Information
                                    </h5>
                                    <div
                                        style={{
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        <Link
                                            onClick={() => {
                                                window.open(
                                                    `${TZKT_NODES[
                                                        NETWORK
                                                    ].replace('api.', '')}/${
                                                        projectData.TOKEN_ADDRESS
                                                    }`
                                                );
                                            }}
                                            to='#'
                                            className='router-l text-decoration-underline'
                                        >
                                            Contract&nbsp;
                                            <BiLinkExternal />
                                        </Link>
                                    </div>
                                </div>{' '}
                                <div className='row '>
                                    <div className='mt-3 px-0 text-center text-lg-start text-md-center text-sm-center col-6 col-md-6 col-lg'>
                                        <div className='fw-500 text-second form-header'>
                                            Name
                                        </div>
                                        <div className='text-dark-to-light'>
                                            {projectData.PROJECT_NAME}
                                        </div>
                                    </div>
                                    <div className='mt-3 text-center text-lg-start text-md-center text-sm-center px-0   col-6 col-md-6 col-lg'>
                                        <div className='fw-500 text-second form-header'>
                                            Token
                                        </div>
                                        <div className='text-dark-to-light'>
                                            {projectData.TOKEN_NAME}
                                        </div>
                                    </div>
                                    <div className='mt-3 px-0 text-center text-lg-start text-md-center text-sm-center   col-6 col-md-6 col-lg'>
                                        <div className='fw-500 text-second form-header'>
                                            Decimal
                                        </div>
                                        <div className='text-dark-to-light'>
                                            {projectData.DECIMALS}
                                        </div>
                                    </div>
                                    <div className='mt-3 px-0 text-center text-lg-start text-md-center text-sm-center col-6 col-md-6 col-lg'>
                                        <div className='fw-500 text-second form-header'>
                                            Launch Price
                                        </div>
                                        <div className='text-dark-to-light'>
                                            {projectData.LISTING_PRICE}&nbsp;
                                            {projectData.TEZ}
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <hr />
                                </div>
                                <p className='card-text text-j mt-3 mb-2 text-sm text-second'>
                                    *{projectData.TOKEN_INFO}
                                </p>
                                <div className='mb-0 text-sm fw-500 d-flex justify-content-between align-items-center form-header'>
                                    <div>
                                        <p className='m-0 text-dark-to-light'>
                                            Sale progress
                                        </p>
                                    </div>
                                    <div>
                                        <p className='m-0 text-dark-to-light'>
                                            {progressPercentage
                                                ? parseFloat(progressPercentage)
                                                : 0}
                                            %
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className='w-100 mt-2 border-10 '
                                    style={{
                                        height: '10px',
                                        border: '1px solid #5E0EE2',
                                    }}
                                >
                                    <div
                                        className='progress-bar h-100 '
                                        style={{
                                            width: `${
                                                progressPercentage
                                                    ? progressPercentage > 100
                                                        ? 100
                                                        : progressPercentage
                                                    : 0
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                                <div className='mt-3 text-sm fw-500 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <p className='m-0'>
                                            <span className='value text-sm text-dark-to-light form-header'>
                                                {SaleData.data.totalTokensSold.PrecisionMaker(
                                                    2
                                                )}
                                            </span>
                                            <span className='value'>
                                                &nbsp;{projectData.SUB_CURRENCY}
                                                &nbsp;
                                            </span>
                                            <br />
                                            <span className='fw-normal text-second '>
                                                Total Tokens Sold
                                            </span>
                                        </p>
                                    </div>
                                    <div className='text-end'>
                                        <p className='m-0'>
                                            <span className='value text-sm text-dark-to-light form-header'>
                                                &nbsp;
                                                {SaleData.data.totalXTZRaised.PrecisionMaker(
                                                    2
                                                )}
                                                &nbsp;
                                            </span>
                                            <br />
                                            <span className='fw-normal text-second'>
                                                Total XTZ raised
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row my-4  mx-0 mx-lg-3 mx-md-3 '>
                    <PoolDetails
                        SaleData={SaleData}
                        participateInSale={participateInSale}
                        fetchSaleData={fetchProjectDetails}
                        projectData={projectData}
                        wallet={wallet}
                        isKyced={kycStatus.isWhitelisted}
                        projectContractAddress={projectContractAddress}
                        claimTokens={claimTokens}
                    />
                </div>
            </AppLayout>
        </div>
    );
};
const IdoProjects = (props) => {
    const params = useParams();
    const data = IDO_CONFIG.filter((item) => {
        return item.ALIAS === params.name;
    })[0];
    return typeof data === 'undefined' ? (
        <NotFound />
    ) : (
        <LaunchIdoProjects {...props} />
    );
};
const mapDispatchToProps = (dispatch) => ({
    participateInSale: (payload) => dispatch(ParticipateInSale(payload)),
    fetchSaleData: (payload) => dispatch(FetchSaleData(payload)),
    claimTokens: (payload) => dispatch(claimNow(payload)),
    fetchKYCDetails: (payload) => dispatch(kycProcess(payload)),
});

const mapStateToProps = (state) => ({
    wallet: state.wallet,
    SaleData: state.fetchSaleData,
    kycStatus: state.kycProcess,
});

export default connect(mapStateToProps, mapDispatchToProps)(IdoProjects);
