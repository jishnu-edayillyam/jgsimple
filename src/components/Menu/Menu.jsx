import React, { useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.scss";
import JumpingText from "../JumpingText/JumpingText";
import {
  textJumpDelayOfLastLetter,
  textJumpDurationOfEachLetter,
} from "../../constants";
import {
  slideUpAdditionalDelayOfSecondChild,
  slideUpDuration,
  widthAnimationDuration,
} from "../../store/constants";

const Menu = ({ closeMenu, isClosing }) => {
  const menuRef = useRef();

  useEffect(() => {
    disableBodyScroll(menuRef.current, { reserveScrollBarGap: true });
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <div
      className="menu"
      ref={menuRef}
      style={{ "--widthAnimationDuration": `${widthAnimationDuration}ms` }}
    >
      <div className={`left-menu ${isClosing ? "closing" : ""}`}>
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            "--slideUpDelay": `${widthAnimationDuration}ms`,
            "--slideUpDuration": `${slideUpDuration}ms`,
          }}
        >
          <JumpingText
            text="HOME"
            animateOnMount
            animateOnMountDelay={
              widthAnimationDuration +
              slideUpDuration -
              textJumpDelayOfLastLetter -
              textJumpDurationOfEachLetter
            }
          />
        </Link>
        <Link
          to="/services"
          onClick={closeMenu}
          style={{
            "--slideUpDelay": `${
              widthAnimationDuration + slideUpAdditionalDelayOfSecondChild
            }ms`,
            "--slideUpDuration": `${slideUpDuration}ms`,
          }}
        >
          <JumpingText
            text="SERVICES"
            animateOnMount
            animateOnMountDelay={
              widthAnimationDuration +
              slideUpDuration -
              textJumpDelayOfLastLetter -
              textJumpDurationOfEachLetter +
              slideUpAdditionalDelayOfSecondChild
            }
          />
        </Link>
      </div>
      <div className={`right-menu ${isClosing ? "closing" : ""}`}>
        <Link
          to="/projects"
          onClick={closeMenu}
          style={{
            "--slideUpDelay": `${widthAnimationDuration}ms`,
            "--slideUpDuration": `${slideUpDuration}ms`,
          }}
        >
          <JumpingText
            text="PROJECTS"
            animateOnMount
            animateOnMountDelay={
              widthAnimationDuration +
              slideUpDuration -
              textJumpDelayOfLastLetter -
              textJumpDurationOfEachLetter
            }
          />
        </Link>
        <Link
          to="/contact"
          onClick={closeMenu}
          style={{
            "--slideUpDelay": `${widthAnimationDuration}ms`,
            "--slideUpDuration": `${slideUpDuration}ms`,
          }}
        >
          <JumpingText
            text="CONTACT"
            animateOnMount
            animateOnMountDelay={
              widthAnimationDuration +
              slideUpDuration -
              textJumpDelayOfLastLetter -
              textJumpDurationOfEachLetter
            }
          />
        </Link>
      </div>
    </div>
  );
};

Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  isClosing: PropTypes.bool.isRequired,
};

export default Menu;
