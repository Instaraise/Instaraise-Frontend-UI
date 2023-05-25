import React from 'react';

import IdoCard from './IdoCard';
import Stepper from '../../Stepper/Stepper';
import { IDO_CONFIG } from '../../../config/Launchpad/Ido/IdoConfig';
export const IdoSale = (props) => {
    return (
        <div>
            <div className='row row-cols-1 text-dark-to-light mt-3  project-layout g-4  mx-0 mx-lg-3 mx-md-3 '>
                <div className='d-flex flex-column flex-lg-row'>
                    <div className='p-2 w-100 text-center'>
                        <div className='col w-100'>
                            <h4 className='fw-600 text-center form-header text-nowrap'>
                                Welcome to Launchpad
                            </h4>
                            <p className='text-center font-insta-regular'>
                                Decentralised fundraising launchpad for new
                                tokens
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <div
                    className='my-2 my-lg-5 my-md-5 
                    my-sm-5 mb-lg-0 text-dark-to-light
                    mb-md-0 row 
                    mx-0 mx-lg-3 mx-md-3'
                >
                    {IDO_CONFIG.map((item, index) => {
                        if (item.TYPE === 'Upcoming') {
                            return (
                                <div
                                    key={index}
                                    className='row mx-0 px-0 d-flex justify-content-center align-items-center'
                                >
                                    <div className='col-sm-12 col-lg-4'>
                                        <IdoCard
                                            {...props}
                                            projectdata={item}
                                        />
                                    </div>
                                    <div className='col-12  my-3 my-lg-0 col-lg-8 m-auto'>
                                        <Stepper projectdata={item} />
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div
                    className='my-2 my-lg-5 my-md-5 my-sm-5 
                    px-0 mb-lg-0 text-dark-to-light mb-md-0 
                    row row-cols-1 row-cols-xxl-3 row-cols-lg-2 
                    row-cols-md-1 row-cols-sm-1
                    mx-0 mx-lg-3 mx-md-3'
                >
                    {IDO_CONFIG.map((item, index) => {
                        if (item.TYPE !== 'Upcoming') {
                            return (
                                <IdoCard
                                    key={index}
                                    {...props}
                                    projectdata={item}
                                />
                            );
                        }
                    })}
                </div>
            </>
        </div>
    );
};
