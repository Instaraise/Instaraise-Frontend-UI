import React from "react";
import { BACKERS_DATA } from "../../../config/HomeConfig/BackersConfig/config.backers";

// const lerp = (current, target, factor) =>
//   current * (1 - factor) + target * factor;

// class LoopingText {
//   constructor(el) {
//     this.el = el;
//     this.lerp = { current: 0, target: 0 };
//     this.interpolationFactor = 0.1;
//     this.speed = 0.2;
//     this.events();
//     this.render();
//   }

//   events() {
//     window.addEventListener(
//       "scroll",
//       () => (this.lerp.target += this.speed * 5)
//     );
//   }

//   animate() {
//     this.lerp.target += this.speed;
//     this.lerp.current = lerp(
//       this.lerp.current,
//       this.lerp.target,
//       this.interpolationFactor
//     );

//     if (this.lerp.target > 100) {
//       this.lerp.current -= this.lerp.target;
//       this.lerp.target = 0;
//     }

//     this.el.style.transform = `translateX(${this.lerp.current}%)`;
//   }

//   render() {
//     this.animate();
//     window.requestAnimationFrame(() => this.render());
//   }
// }

const Backers = () => {
  const element = React.useRef();
  let start, previousTimeStamp;
  let done = false;

  function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    if (previousTimeStamp !== timestamp) {
      // Math.min() is used here to make sure the element stops at exactly 200px
      const count = Math.min(0.1 * elapsed, 200);
      element.current.style.transform = `translateX(${count}px)`;
      if (count === 200) done = true;
    }

    if (elapsed < 2000) {
      // Stop the animation after 2 seconds
      previousTimeStamp = timestamp;
      if (!done) {
        window.requestAnimationFrame(step);
      }
    }
  }
  window.requestAnimationFrame(step);
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
          transition: "ease 2s all",
        }}
        ref={element}
      >
        {BACKERS_DATA.map((item, index) => {
          return (
            <div
              className="flex-shrink-0 mx-2"
              style={{
                width: "250px",
                overflowX: "scroll",
                height: "250px",
                border: "6px solid red",
              }}
            >
              {index + 1}
            </div>
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
