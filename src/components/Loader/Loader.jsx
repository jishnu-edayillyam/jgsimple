import React, { useRef } from "react";
import PropTypes from "prop-types";

import "./style.scss";
import { loadingEndAnimationDuration } from "../../store/constants";

const Loader = ({ isContentLoading }) => {
  const writingHandRef = useRef();
  const completedStatusLineRef = useRef();

  if (!isContentLoading && writingHandRef.current) {
    writingHandRef.current.animate(
      [
        // keyframes
        { left: `${writingHandRef.current?.style.left}px` },
        { left: "100%" },
      ],
      {
        // timing options
        duration: loadingEndAnimationDuration,
        fill: "forwards",
      }
    );

    completedStatusLineRef.current.animate(
      [
        // keyframes
        { width: `${completedStatusLineRef.current?.style.width}px` },
        { width: "100%" },
      ],
      {
        // timing options
        duration: loadingEndAnimationDuration,
        fill: "forwards",
      }
    );
  }

  return (
    <div className="loader-container">
      <img src="instagram_logo.svg" alt="jg-logo" className="jg-logo" />
      <div className="loading-animation">
        <img
          ref={writingHandRef}
          src="writing_hand.svg"
          alt="writing-hand"
          className={`writing-hand ${
            isContentLoading ? "still-loading" : "loading-completed"
          }`}
        />
        <div className="measuring-scale">
          <div
            ref={completedStatusLineRef}
            className={`completed-status-line ${
              isContentLoading ? "still-loading" : "loading-completed"
            }`}
          />
          <div className="vertical-lines">
            {[
              ...Array(Math.min(Math.ceil(window.innerWidth / 200) * 5, 20)),
            ].map((_, index) => (
              <React.Fragment key={index}>
                <div className="large-line" />
                <div className="small-line" />
                <div className="small-line" />
                <div className="small-line" />
                <div className="small-line" />
              </React.Fragment>
            ))}
            <div className="large-line" />
          </div>
        </div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  isContentLoading: PropTypes.bool.isRequired,
};

export default Loader;
