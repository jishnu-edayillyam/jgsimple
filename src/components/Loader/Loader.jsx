import React from "react";
import "./style.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src="instagram_logo.svg" alt="jg-logo" className="jg-logo" />
      <div className="loading-animation">
        <img
          src="writing_hand.svg"
          alt="writing-hand"
          className="writing-hand"
        />
        <div className="measuring-scale">
          <div className="completed-status-line" />
          <div className="vertical-lines">
            {[...Array(20)].map(() => (
              <>
                <div className="large-line" />
                <div className="small-line" />
                <div className="small-line" />
                <div className="small-line" />
                <div className="small-line" />
              </>
            ))}
            <div className="large-line" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
