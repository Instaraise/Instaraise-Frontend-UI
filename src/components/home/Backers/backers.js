import React from "react";
import { BACKERS_DATA } from "../../../config/HomeConfig/BackersConfig/config.backers";
const Backers = () => {
  // const element = React.useRef();
  // let start, previousTimeStamp;
  // let done = false;

  // function step(timestamp) {
  //   if (start === undefined) {
  //     start = timestamp;
  //   }
  //   const elapsed = timestamp - start;

  //   if (previousTimeStamp !== timestamp) {
  //     // Math.min() is used here to make sure the element stops at exactly 200px
  //     const count = Math.min(0.1 * elapsed, 200);
  //     element.current.style.transform = `translateX(${count}px)`;
  //     if (count === 200) done = true;
  //   }

  //   if (elapsed < 2000) {
  //     // Stop the animation after 2 seconds
  //     previousTimeStamp = timestamp;
  //     if (!done) {
  //       window.requestAnimationFrame(step);
  //     }
  //   }
  // }
  // window.requestAnimationFrame(step);
  return (
    <div className="container px-5">
      <div className="d-flex py-4 justify-content-center mb-4">
        <h2 className="fs-1 text-aileron-bold text-insta-regular">&nbsp;Our</h2>
        <h2 className="fs-1 text-aileron-bold services-text">&nbsp;Backers</h2>
      </div>
      {[1, 2].map((item, index) => (
        <div className="backers-scroll" key={index}>
          <div className="backers_content">
            {[
              ...BACKERS_DATA,
              ...BACKERS_DATA,
              ...BACKERS_DATA,
              ...BACKERS_DATA,
              ...BACKERS_DATA,
              ...BACKERS_DATA,
            ].map((item, index) => {
              return (
                <div className="flex-shrink-0 mx-2 d-flex align-items-center justify-content-center">
                  <div
                    className="card h-20 my-4 card-img-top"
                    style={{
                      width: "150px",
                      marginLeft: "50px",
                    }}
                  >
                    <img src={item.image_url} alt={item.id} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Backers;
