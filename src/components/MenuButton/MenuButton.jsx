import React, { useEffect, useState } from "react";
import "./style.scss";
import Menu from "../Menu/Menu";

const MenuButton = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const onBackButtonEvent = () => {
    setDisplayMenu(false);
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
        className="menu-button"
        onClick={() => setDisplayMenu((s) => !s)}
      >
        <div />
        <div />
        <div />
      </button>
      {displayMenu && (
        <Menu
          closeMenu={() => {
            setDisplayMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default MenuButton;
