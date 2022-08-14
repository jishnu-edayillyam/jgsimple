import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import {
  textJumpDelayOfLastLetter,
  textJumpDurationOfEachLetter,
} from "../../constants";

const JumpingText = ({ text, animateOnMount, animateOnMountDelay }) => {
  const ref = useRef();
  const timeoutRef = useRef();

  const splitText = (str) => {
    return str.split("").map((letter, index) => (
      <div
        key={index}
        className="jumping-text"
        style={{
          "--duration": `${textJumpDurationOfEachLetter}ms`,
          "--delay": `${(index * textJumpDelayOfLastLetter) / text.length}ms`,
        }}
      >
        <div className="jumping-text-top">
          <pre>{letter}</pre>
        </div>
        <div className="jumping-text-bottom">
          <pre>{letter}</pre>
        </div>
      </div>
    ));
  };

  const setTextHovered = () => {
    ref.current?.classList.add("hovered");
    timeoutRef.current = setTimeout(() => {
      ref.current?.classList.remove("hovered");
    }, textJumpDurationOfEachLetter + textJumpDelayOfLastLetter); // total text jump time for last letter
  };

  useEffect(() => {
    if (animateOnMount) {
      setTimeout(() => {
        setTextHovered();
      }, animateOnMountDelay);
    }
    return clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className="jumping-text-container"
      onMouseEnter={setTextHovered}
    >
      {splitText(text)}
    </div>
  );
};

JumpingText.defaultProps = {
  animateOnMount: false,
  animateOnMountDelay: 0,
};

JumpingText.propTypes = {
  text: PropTypes.string.isRequired,
  animateOnMount: PropTypes.bool,
  animateOnMountDelay: PropTypes.number,
};

export default JumpingText;
