import React from 'react';
import '../../../scss/_services.css';
import { SERVICES_DATA } from '../../../config/HomeConfig/ServicesConfig/config.services';
import { SERVICES_DATA2 } from '../../../config/HomeConfig/ServicesConfig/config.services';
const Services = () => {
    return (
        <section className="container services_section">
            <div className="row">
                <div className="col-md-5">
                    <h1>Our</h1>
                    <h1>
                        <span>Services</span>
                    </h1>
                    <p className="mt-5 servicesPara">
                        Instaraise is building DeFi Universe on Tezos. We
                        support projects to raise fund, build communities and
                        turn their ideas into products.Instaraise is building
                        DeFi Universe on Tezos.
                    </p>
                </div>
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-6">
                            {SERVICES_DATA.map((elem) => (
                                <div>
                                    <img
                                        class="ml-3"
                                        src={elem.image}
                                        alt="Card image cap"
                                    />
                                    <div class="card-body">
                                        <h4>{elem.heading}</h4>
                                        <p>{elem.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-6">
                            {SERVICES_DATA2.map((elem) => (
                                <div>
                                    <img
                                        class="ml-3"
                                        src={elem.image}
                                        alt="Card image cap"
                                    />
                                    <div class="card-body">
                                        <h4>{elem.heading}</h4>
                                        <p>{elem.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
