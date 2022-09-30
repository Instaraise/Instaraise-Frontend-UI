import React from 'react';

import mexc_img from '../../../assets/images/mexc_img.svg';
import space_farm_img from '../../../assets/images/space_farm_img.svg';
const EcoSystem = () => {
    return (
        <>
            <div className='container d-flex justify-content-center'>
                <div className='mt-5 d-flex font-size-media'>
                    <h2 className='fs-1 text-aileron-bold text-insta-regular'>
                        &nbsp;Ecosystem
                    </h2>
                    <h2 className='fs-1 text-aileron-bold services-text'>
                        &nbsp;Partners
                    </h2>
                </div>
            </div>
            <div className='container pt-2 pt-lg-5'>
                <div className='row row-cols-1 row-cols-md-4 g-4 d-flex justify-content-evenly'>
                    <div className='col d-flex justify-content-center align-items-center my-5 my-lg-none my-xl-none my-md-none'>
                        <div className='card h-150'>
                            <img src={space_farm_img} />
                        </div>
                    </div>
                    <div className='col d-flex justify-content-center align-items-center my-5 my-lg-none my-xl-none my-md-none '>
                        <div className='card h-20'>
                            <img src={mexc_img} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EcoSystem;
