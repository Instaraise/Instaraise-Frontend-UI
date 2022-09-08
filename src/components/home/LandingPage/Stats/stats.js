import React from 'react';
import { PRICE_DATA } from '../../../../config/HomeConfig/StatsConfig/config.stats';
import '../../../../scss/_stats.css';
const Stats = () => {
    return (
        <section className=" two-background mb-5">
            <div className="container ">
                <div className="details">
                    <div className="row">
                        {PRICE_DATA.map((elem) => (
                            <div className="col my-4">
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
