import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import RenderAction from './components';
import { STEPPER_DATA_ACTION } from '../../redux/actions/common/action.loader';
import { kycProcess } from '../../redux/actions/common/action.token';
import { connectWallet } from '../../redux/actions/wallet/action.wallet';

const Stepper = (props) => {
    const { stepDetails } = props;
    const { ALIAS, TIER_SYSTEM } = props.projectdata;
    const { isWhitelisted, hasStaked, isEnrolled } = props.kycStatus;
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const [currentStep, setCurrentStep] = React.useState(1);
    const fetchkyc = async () => {
        if (props.wallet) {
            let data = {
                wallet: props.wallet,
                projectName: ALIAS,
                tierSystem: TIER_SYSTEM,
            };
            await props.fetchKYCDetails(data);
            props.updateSteps([
                {
                    id: 1,
                    step: 1,
                    visited: isWhitelisted,
                },
                {
                    id: 2,
                    step: 2,
                    visited: hasStaked,
                },
                {
                    id: 3,
                    step: 3,
                    visited: isEnrolled,
                },
            ]);
            setCurrentStep(props.kycStatus.currentStep);
        }
    };

    React.useEffect(() => {
        fetchkyc();
    }, [isWhitelisted, hasStaked, isEnrolled, props.wallet]);

    React.useEffect(() => {
        const interval = setInterval(function () {
            fetchkyc();
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handlenext = () => {
        if (currentStep < stepDetails.length + 1) {
            stepDetails[currentStep - 1].visited = true;
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleprevious = () => {
        if (currentStep < stepDetails.length + 1 && currentStep > 1) {
            stepDetails[currentStep - 2].visited = false;
            setCurrentStep((prev) => prev - 1);
        }
    };
    const toggler = isPortrait ? 'height' : 'width';
    return (
        <div className='card h-100 p-3  rounded w-100'>
            <div className='pt-0 h-100 d-flex flex-column justify-content-between'>
                <div>
                    {props.projectdata.TIER_SYSTEM && (
                        <h6 className='text-center'>
                            Follow these steps to participate in sale
                        </h6>
                    )}

                    <div className='mt-4'>
                        <div className='row w-100 '>
                            <div className='d-flex flex-lg-column justify-content-between p-0 '>
                                {props.projectdata.TIER_SYSTEM && (
                                    <div
                                        className='d-flex flex-column p-0  flex-lg-row  justify-content-between  position-relative'
                                        style={{
                                            height: isPortrait && '15rem',
                                        }}
                                    >
                                        <div className='position-absolute connector'>
                                            <div
                                                className='dynamic'
                                                style={{
                                                    [toggler]:
                                                        (currentStep === 2 &&
                                                            '50%') ||
                                                        (currentStep === 3 &&
                                                            '100%') ||
                                                        (currentStep === 4 &&
                                                            '100%'),
                                                }}
                                            ></div>
                                        </div>
                                        {stepDetails.map((step, index) => (
                                            <div
                                                className={
                                                    currentStep === step.step
                                                        ? 'step-circle-active'
                                                        : step.visited
                                                        ? 'step-circle-visited'
                                                        : 'step-circle'
                                                }
                                                key={index}
                                            >
                                                {step.visited ? (
                                                    <BsCheckLg />
                                                ) : (
                                                    step.id
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className='mt-4 w-100 text-center justify-content-center mx-auto d-flex flex-grow-1 align-items-center'>
                                    {!props.wallet ? (
                                        <div>
                                            <div className='text-center mb-2'>
                                                <FaWallet size={65} />
                                            </div>
                                            <h6 className='text-center'>
                                                Please connect your wallet to
                                                proceed&nbsp;
                                                <Link
                                                    to='#'
                                                    className='router-l router-l-u'
                                                    onClick={() =>
                                                        props.connectWallet({
                                                            NETWORK: 'mainnet',
                                                        })
                                                    }
                                                >
                                                    Connect now{' '}
                                                </Link>
                                            </h6>
                                        </div>
                                    ) : (
                                        <RenderAction
                                            currentStep={currentStep}
                                            isEnrolled={isEnrolled}
                                            isWhitelisted={isWhitelisted}
                                            hasStaked={hasStaked}
                                            fetchkyc={fetchkyc}
                                            wallet={props.wallet}
                                            ALIAS={ALIAS}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {props.projectdata.TIER_SYSTEM && (
                    <div className='d-flex justify-content-between mt-4 '>
                        <div className=''>
                            {props.wallet &&
                                currentStep !== 1 &&
                                currentStep !== stepDetails.length + 1 && (
                                    <button
                                        disabled={currentStep === 1}
                                        className='btn btn-sm rounded px-4 next-prev-button d-flex align-items-center outline-none text-white  shadow-none'
                                        onClick={handleprevious}
                                    >
                                        <FaChevronCircleLeft />
                                        &nbsp;Previous
                                    </button>
                                )}
                        </div>

                        <div className=''>
                            {props.wallet &&
                                currentStep !== stepDetails.length + 1 &&
                                currentStep !== stepDetails.length && (
                                    <button
                                        className='btn btn-sm next-prev-button px-4 d-flex align-items-center rounded outline-none text-white  shadow-none'
                                        onClick={handlenext}
                                    >
                                        Next&nbsp;
                                        <FaChevronCircleRight />
                                    </button>
                                )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchKYCDetails: (payload) => dispatch(kycProcess(payload)),
    connectWallet: (payload) => dispatch(connectWallet(payload)),
    updateSteps: (payload) => dispatch(STEPPER_DATA_ACTION(payload)),
});

const mapStateToProps = (state) => ({
    wallet: state.wallet,
    kycStatus: state.kycProcess,
    stepDetails: state.getSteps,
});

export default connect(mapStateToProps, mapDispatchToProps)(Stepper);
