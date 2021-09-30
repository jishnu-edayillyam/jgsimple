import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../style.scss";

const SlideShowButton = ({ startSlideshow }) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1], rootMargin: "-21px 0px 0px 0px" }
    );

    observer.observe(cachedRef);

    return () => {
      observer.unobserve(cachedRef);
    };
  }, []);

  return (
    <button
      type="button"
      className={`slideshow-button ${isSticky && "sticked"}`}
      ref={ref}
      onClick={startSlideshow}
    >
      <img src="slideshow2.svg" alt="slideshow" />
      <span>Slideshow</span>
    </button>
  );
};

SlideShowButton.propTypes = {
  startSlideshow: PropTypes.func.isRequired,
};

export default SlideShowButton;
