import React from 'react';
import { PRICE_DATA } from '../../../../config/HomeConfig/StatsConfig/config.stats';
const Stats = () => {
    return (
        <section className="statsContainer shadow-sm">
            <div className="container">
                <div className="row alg">
                    {PRICE_DATA.map((elem, index) => (
                        <div
                            key={index}
                            className="m-sm-auto col-xl-2 col-md-4 col-sm-6 col-6 d-flex"
                        >
                            <div className="mr-2 mt-4">
                                <img
                                    src={elem.image}
                                    alt="stats-imgs"
                                    className="img-fluid"
                                    width="20"
                                    height="20"
                                />
                            </div>
                            <div className="text-left mt-4">
                                <p className="font-weight-bold m-0 statsDesc">
                                    <span className="">{elem.description}</span>
                                </p>
                                <p className="statsNames">{elem.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className="row "> */}
                {/* {PRICE_DATA.map((elem) => (
                        <> */}
                {/* <div className="col-md-2 col-6">
                                <div className="d-flex"> */}
                {/* <div className="mr-2 m-0">
                                        <img
                                            className="img-fluid me-1"
                                            width="25"
                                            height="25"
                                            src={elem.image}
                                        />
                                    </div> */}
                {/* <div className="text-left">
                                        <p className="m-0 statsHeader">
                                            {elem.description}
                                        </p>
                                        <p className="statsDesc">
                                            <span>{elem.name}</span>
                                        </p>
                                    </div>
                                </div> */}
                {/* </div> */}
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
                {/* </>
                    ))} */}
                {/* </div> */}
            </div>
        </section>
    );
};

export default Stats;
