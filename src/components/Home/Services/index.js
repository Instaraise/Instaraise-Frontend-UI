import React from 'react';

import { SERVICES_DATA } from '../../../config/HomeConfig/ServicesConfig/config.services';
import { SERVICES_DATA2 } from '../../../config/HomeConfig/ServicesConfig/config.services';
import { ThemeContext } from '../../../routes/root';
const Services = () => {
    const { theme } = React.useContext(ThemeContext);
    return (
        <section className='services_section py-5 py-lg-none py-md-none py-sm-none'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-5 card-body service-heading'>
                        <h1 className='text-aileron-bold text-insta-regular'>
                            Our
                        </h1>
                        <h1 className='text-aileron-bold services-text'>
                            Products
                        </h1>
                    </div>

                    <div className='col-md-7'>
                        <div className='row'>
                            <div className='col-md-6 '>
                                {SERVICES_DATA.map((elem, index) => (
                                    <div key={index} className=''>
                                        <img
                                            className='ml-md-3'
                                            src={
                                                theme
                                                    ? elem.image
                                                    : elem.image_dark
                                            }
                                            alt='Services-card'
                                            width='50'
                                            height='52'
                                        />
                                        <div className='card-body'>
                                            <h4 className='text-insta-regular lh-sm font-weight-bold'>
                                                {elem.heading}
                                            </h4>
                                            <p className='statsNames font-insta-regular'>
                                                {elem.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='col-md-6'>
                                {SERVICES_DATA2.map((elem, index) => (
                                    <div key={index} className=''>
                                        <img
                                            className='ml-md-3'
                                            src={
                                                theme
                                                    ? elem.image
                                                    : elem.image_dark
                                            }
                                            alt='Services-card'
                                            width='50'
                                            height='52'
                                        />
                                        <div className='card-body'>
                                            <h4 className='text-insta-regular lh-sm font-weight-bold'>
                                                {elem.heading}
                                            </h4>
                                            <p className='statsNames font-insta-regular'>
                                                {elem.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
