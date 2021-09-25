import React, { useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";

const Menu = ({ closeMenu }) => {
  const menuRef = useRef();

  useEffect(() => {
    disableBodyScroll(menuRef.current, { reserveScrollBarGap: true });
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <div className="menu" ref={menuRef}>
      <div className="left-menu">
        <Link to="/" onClick={closeMenu}>
          PROJECTS
        </Link>
      </div>
      <div className="right-menu">
        <Link to="/contact" onClick={closeMenu}>
          CONTACT
        </Link>
      </div>
    </div>
  );
};

Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};

export default Menu;
