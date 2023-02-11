import React from 'react';

import { BACKERS_DATA } from '../../../config/HomeConfig/BackersConfig/config.backers';
const Backers = () => {
    return (
        <div className='container-fluid'>
            <div className='d-flex py-4 justify-content-center mb-4'>
                <h2 className='fs-1 text-aileron-bold text-insta-regular'>
                    &nbsp;Investors &
                </h2>
                <h2 className='fs-1 text-aileron-bold services-text'>
                    &nbsp;Partners
                </h2>
            </div>
            <div className='backers-scroll'>
                <div className='backers_content'>
                    {[
                        ...BACKERS_DATA.slice(0, BACKERS_DATA.length / 2),
                        ...BACKERS_DATA.slice(0, BACKERS_DATA.length / 2),
                        ...BACKERS_DATA.slice(0, BACKERS_DATA.length / 2),
                        ...BACKERS_DATA.slice(0, BACKERS_DATA.length / 2),
                        ...BACKERS_DATA.slice(0, BACKERS_DATA.length / 2),
                        ...BACKERS_DATA.slice(0, BACKERS_DATA.length / 2),
                        ...BACKERS_DATA.slice(0, BACKERS_DATA.length / 2),
                    ].map((item, index) => {
                        return (
                            <div
                                key={index}
                                className='flex-shrink-0 mx-2 d-flex align-items-center justify-content-center'
                            >
                                <div
                                    className='card h-20 my-4 card-img-top'
                                    style={{
                                        width: '150px',
                                        marginLeft: '50px',
                                    }}
                                >
                                    <img src={item.image_url} alt={item.id} />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='backers_content mb-5'>
                    {[
                        ...BACKERS_DATA.slice(
                            BACKERS_DATA.length / 2,
                            BACKERS_DATA.length
                        ),
                        ...BACKERS_DATA.slice(
                            BACKERS_DATA.length / 2,
                            BACKERS_DATA.length
                        ),
                        ...BACKERS_DATA.slice(
                            BACKERS_DATA.length / 2,
                            BACKERS_DATA.length
                        ),
                        ...BACKERS_DATA.slice(
                            BACKERS_DATA.length / 2,
                            BACKERS_DATA.length
                        ),
                        ...BACKERS_DATA.slice(
                            BACKERS_DATA.length / 2,
                            BACKERS_DATA.length
                        ),
                        ...BACKERS_DATA.slice(
                            BACKERS_DATA.length / 2,
                            BACKERS_DATA.length
                        ),
                        ...BACKERS_DATA.slice(
                            BACKERS_DATA.length / 2,
                            BACKERS_DATA.length
                        ),
                    ].map((item, index) => {
                        return (
                            <div
                                key={index}
                                className='flex-shrink-0 mx-2 d-flex align-items-center justify-content-center'
                            >
                                <div
                                    className='card h-20 my-4 card-img-top'
                                    style={{
                                        width: '150px',
                                        marginLeft: '50px',
                                    }}
                                >
                                    <img src={item.image_url} alt={item.id} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default Backers;
