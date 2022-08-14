import React, { useEffect, useRef, useState } from "react";

import "./style.scss";
import Menu from "../Menu/Menu";
import { widthAnimationDuration } from "../../store/constants";

const MenuButton = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const menuRef = useRef();

  const onBackButtonEvent = () => {
    setDisplayMenu(false);
  };

  const handleDisplayMenu = () => {
    if (displayMenu) {
      menuRef?.current?.classList.remove("clicked");
      setIsClosing(true);
      setTimeout(() => {
        setDisplayMenu(false);
        setIsClosing(false);
      }, widthAnimationDuration);
    } else {
      menuRef?.current?.classList.add("clicked");
      setDisplayMenu(true);
    }
  };

  // close the Menu when broswer back/forward button is clicked
  useEffect(() => {
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  return (
    <div>
      <button
        type="button"
        ref={menuRef}
        className="menu-button"
        onClick={handleDisplayMenu}
        style={{
          "--rotation-animation-duration": `${widthAnimationDuration}ms`,
        }}
      >
        <div />
        <div />
      </button>
      {displayMenu && (
        <Menu closeMenu={handleDisplayMenu} isClosing={isClosing} />
      )}
    </div>
  );
};

export default MenuButton;
