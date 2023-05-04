import React from 'react';
import Countdown from 'react-countdown';
import NumericLabel from 'react-pretty-numbers';
import { Link } from 'react-router-dom';
export const option = {
    justification: 'C',
    locales: 'en-AU',
    currency: false,
    percentage: false,
    precision: 0,
    wholenumber: null,
    commafy: true,
    shortFormat: true,
    shortFormatMinValue: 100,
    shortFormatPrecision: 1,
    title: true,
    cssClass: ['card-raise-value'],
};

const IdoCard = (props) => {
    const { projectdata } = props;
    const {
        PROJECT_NAME,
        ALIAS,
        START_TIME,
        DISABLED,
        END_TIME,
        AMOUNT_TO_RAISE,
        SALE_TYPE,
        ICON,
        CURRENCY,
    } = projectdata;

    var SALE_STATUS = 'Upcoming sale';
    var BUTTON_NAME = 'Enter sale';
    let DISABLE_SALE = DISABLED;
    const todayDATE = new Date();
    if (todayDATE > new Date(START_TIME) && todayDATE > new Date(END_TIME)) {
        SALE_STATUS = 'Finished sale';
        BUTTON_NAME = 'View info';
        if (PROJECT_NAME === 'Instaraise') {
            DISABLE_SALE = true;
        } else {
            DISABLE_SALE = false;
        }
    }
    if (todayDATE > new Date(START_TIME) && todayDATE < new Date(END_TIME)) {
        SALE_STATUS = 'Ongoing sale';
        BUTTON_NAME = 'Enter sale';
        DISABLE_SALE = false;
    }
    if (todayDATE < new Date(START_TIME) && todayDATE < new Date(END_TIME)) {
        SALE_STATUS = 'Upcoming sale';
        BUTTON_NAME = 'View info';
    }

    var countDownDate = new Date(START_TIME).getTime();
    const PROJECT_LINK = DISABLE_SALE ? '#' : `/launchpad/IDO/${ALIAS}`;

    const TOKEN_PRICE = projectdata.IsDiscountedUser
        ? projectdata.DISCOUNTED_PRICE
        : projectdata.TOKEN_PRICE;
    const XTZRate = TOKEN_PRICE;
    return (
        <span className='launchpad-card py-3'>
            <div className='container'>
                <div className='card' data-label={SALE_STATUS}>
                    <div className='card__container pb-0'>
                        <img
                            src={ICON}
                            width={45}
                            style={{
                                marginTop: '-12px',
                                marginBottom: '15px',
                            }}
                            className='d-inline-block align-top me-2 rounded-circle'
                            alt=''
                        />
                        <h2 className='card__header form-header'>
                            {PROJECT_NAME}
                        </h2>

                        <p className='card__body font-insta-regular'>
                            <div className='text-dark-to-light'>
                                {countDownDate ? (
                                    <Countdown date={countDownDate} />
                                ) : (
                                    'TBA'
                                )}
                            </div>
                            <div className='body-details-container text-14'>
                                <div className='navbar navbar-light bg-transparent sale-def p-0'>
                                    <div className='text-14 '>Total raise</div>
                                    <div className='d-flex'>
                                        <NumericLabel params={option}>
                                            {AMOUNT_TO_RAISE}
                                        </NumericLabel>
                                        &nbsp;{CURRENCY}
                                    </div>
                                </div>
                                <div className='navbar navbar-light bg-transparent sale-def p-0'>
                                    <div className=''>Sale type</div>
                                    <div className=''>{SALE_TYPE}</div>
                                </div>
                                {!projectdata.MULTI_SWAP_RATE ? (
                                    <div className='navbar navbar-light bg-transparent sale-def p-0'>
                                        <div className=''>Swap rate</div>
                                        <div>
                                            {projectdata.DISABLE_SWAP_RATE ? (
                                                'TBA'
                                            ) : (
                                                <div>
                                                    1 ꜩ ={' '}
                                                    {(
                                                        1 / XTZRate
                                                    ).PrecisionMaker(2)}
                                                    &nbsp;
                                                    {projectdata.TOKEN_NAME}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className='navbar navbar-light bg-transparent sale-def p-0'>
                                            <div className=''>Swap rate</div>
                                            <div>
                                                {projectdata.SWAP_RATE_NON_FCFS}
                                            </div>
                                        </div>
                                        <div className='navbar navbar-light bg-transparent sale-def p-0'>
                                            <div className=''>
                                                FCFS swap rate
                                            </div>
                                            <div>
                                                {projectdata.SWAP_RATE_FCFS}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </p>
                    </div>
                    <div className='d-flex w-100 justify-content-end py-4 px-4'>
                        <Link
                            style={{
                                cursor: DISABLE_SALE
                                    ? 'not-allowed'
                                    : 'pointer',
                            }}
                            className='btn view-info-btn shadow'
                            to={PROJECT_LINK}
                        >
                            {BUTTON_NAME}
                        </Link>
                    </div>
                </div>
            </div>
        </span>
    );
};

export default IdoCard;
