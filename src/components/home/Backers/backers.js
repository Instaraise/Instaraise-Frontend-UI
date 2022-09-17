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

            <div className=" row mx-0 ">
                {BACKERS_DATA.map((elem) => (
                    <div className="col-6 col-md-3 d-flex justify-content-center align-items-center my-4 my-xl-0 my-lg-0 my-md-none">
                        <div className="card h-20 ">
                            <img
                                className="bg-transparent"
                                src={elem.image_url}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Backers;
