import React from 'react';
import { BACKERS_DATA } from '../../../config/HomeConfig/BackersConfig/config.backers';
const Backers = () => {
    return (
        <div className="container">
            <div class="d-flex py-4 justify-content-center">
                <h2 class="fs-1 text-aileron-bold text-insta-regular">
                    &nbsp;Our
                </h2>
                <h2 class="fs-1 text-aileron-bold services-text">
                    &nbsp;Backers
                </h2>
            </div>

            <div className=" row row-cols-2 row-cols-lg-5 row-cols-md-5  mx-0 ">
                {BACKERS_DATA.map((elem, index) => (
                    <div
                        key={index}
                        className="col-xs-6 d-flex justify-content-center align-items-center my-4 my-xl-0 my-lg-0 my-md-none"
                    >
                        <div className="card h-20 ">
                            {index == 14 || index == 15 || index == 16 ? (
                                <img
                                    style={{
                                        width: '150px',
                                    }}
                                    className="bg-transparent"
                                    src={elem.image_url}
                                />
                            ) : (
                                <img
                                    className="bg-transparent"
                                    src={elem.image_url}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Backers;
