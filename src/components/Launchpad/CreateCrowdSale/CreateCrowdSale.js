import React from 'react';

import FormsInputField from './FormsInputField';
const CreateCrowdSale = () => {
    return (
        <div className='pb-3'>
            <div className='row row-cols-1 text-dark-to-light my-3 my-lg-0 my-md-0 mx-0 mx-lg-3 mx-md-3 text-sm-start'>
                <div className='d-flex bg-red flex-column flex-lg-row text-lg-start justify-content-between align-items-center p-0'>
                    <div className='col'>
                        <h4 className='fw-600 '>Create Crowdsale</h4>
                    </div>
                </div>
            </div>
            <div className='mt-4 mb-5 mb-lg-0 mb-md-0 row p-0 gx-5 project-layout mx-0 mx-lg-4 mx-md-3'>
                <div className='card_i shadow-sm'>
                    <FormsInputField />
                </div>
            </div>
        </div>
    );
};

export default CreateCrowdSale;
