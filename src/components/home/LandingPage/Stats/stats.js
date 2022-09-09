import React from 'react';
import { PRICE_DATA } from '../../../../config/HomeConfig/StatsConfig/config.stats';
import '../../../../scss/_stats.css';
const Stats = () => {
    return (
        <section className="statsContainer shadow-sm">
            <div className=" container details">
                <div className="row ">
                    {PRICE_DATA.map((elem) => (
                        <>
                            <div className=" pb-2 pt-3 m-sm-auto col-xl-2 col-md-4 col-sm-6">
                                <div className="d-flex">
                                    <div className="mr-2 m-0">
                                        <img
                                            className="img-fluid me-1"
                                            width="25"
                                            height="25"
                                            src={elem.image}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="m-0 statsHeader">
                                            <span>{elem.name}</span>
                                        </p>
                                        <p className="statsDesc">
                                            {elem.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="m-sm-auto col-xl-2  col-sm-6 d-flex justify-content-center">
                                <div className="d-flex align-items-center w-50per   my-4 ">
                                    <div className="d-flex justify-content-start align-items-start">
                                        <img
                                            className="img-fluid me-1"
                                            width="25"
                                            height="25"
                                            src={elem.image}
                                        />
                                    </div>
                                    <div className="mx-1">
                                        <div className="d-inline-block">
                                            <h5>{elem.name}</h5>
                                        </div>
                                        <div>
                                            <p>{elem.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
{
    /* <section className=" two-background mb-5">
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
        </section> */
}
