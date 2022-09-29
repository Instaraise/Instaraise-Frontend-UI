import React from 'react';

import { PRICE_DATA } from '../../../config/HomeConfig/StatsConfig/config.stats';
const Stats = () => {
    return (
        <section className='statsContainer shadow-sm'>
            <div className='container'>
                <div className='row alg'>
                    {PRICE_DATA.map((elem, index) => (
                        <div
                            key={index}
                            className='m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex'
                        >
                            <div className='mr-2 mt-4'>
                                <img
                                    src={elem.image}
                                    alt='insta-stas-img-logos'
                                    className='img-fluid'
                                    width='20'
                                    height='20'
                                />
                            </div>
                            <div className='text-left mt-4'>
                                <p className='font-weight-bold m-0 statsDesc'>
                                    <span className=''>{elem.description}</span>
                                </p>
                                <p className='statsNames'>{elem.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
