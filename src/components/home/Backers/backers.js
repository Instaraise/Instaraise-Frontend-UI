import React from "react";
import { BACKERS_DATA } from "../../../config/HomeConfig/BackersConfig/config.backers";
const Backers = () => {
  return (
    <div className="container px-5">
      <div className="d-flex py-4 justify-content-center">
        <h2 className="fs-1 text-aileron-bold text-insta-regular">&nbsp;Our</h2>
        <h2 className="fs-1 text-aileron-bold services-text">&nbsp;Backers</h2>
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          marginTop: "20px",
        }}
      >
        {BACKERS_DATA.map(() => {
          return (
            <div
              className="flex-shrink-0"
              style={{
                width: "250px",
                height: "250px",
                border: "6px solid red",
              }}
            ></div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          marginTop: "60px",
        }}
      >
        {BACKERS_DATA.map(() => {
          return (
            <div
              className="flex-shrink-0"
              style={{
                width: "250px",
                height: "250px",
                border: "6px solid red",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
export default Backers;
