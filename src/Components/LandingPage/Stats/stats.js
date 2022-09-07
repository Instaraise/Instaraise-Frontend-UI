import React from 'react';
import { PRICE_DATA } from '../../config/StatsConfig/config.stats';
import '../../../scss/_stats.css';
const Stats = () => {
    return (
        <section className=" landing-page-container two-background mb-5">
            <div className="details ">
                <div className="container">
                    <div className="row">
                        {PRICE_DATA.map((elem) => (
                            <div className="col  mb-4 mt-4">
                                <p>{elem.name}</p>
                                <h4>{elem.amount}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
