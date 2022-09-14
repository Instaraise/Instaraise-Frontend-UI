import React from 'react';
import { SERVICES_DATA } from '../../../config/HomeConfig/ServicesConfig/config.services';
import { SERVICES_DATA2 } from '../../../config/HomeConfig/ServicesConfig/config.services';
const Services = () => {
    return (
        <section className="services_section py-5 py-lg-none py-md-none py-sm-none">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 card-body service-heading">
                        <h1 className="text-aileron-bold">Our</h1>
                        <h1 className="text-aileron-bold services-text">
                            Services
                        </h1>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-6 ">
                                {SERVICES_DATA.map((elem) => (
                                    <div className="">
                                        <img
                                            className="ml-md-3"
                                            src={elem.image}
                                            alt="Card image cap"
                                        />
                                        <div class="card-body">
                                            <h4 className="text-insta-regular font-weight-bold">
                                                {elem.heading}
                                            </h4>
                                            <p className="text-insta-regular font-insta-regular">
                                                {elem.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                {SERVICES_DATA2.map((elem) => (
                                    <div className="">
                                        <img
                                            class="ml-md-3"
                                            src={elem.image}
                                            alt="Card image cap"
                                        />
                                        <div class="card-body">
                                            <h4 className="text-insta-regular font-weight-bold">
                                                {elem.heading}
                                            </h4>
                                            <p className="text-insta-regular font-insta-regular">
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
