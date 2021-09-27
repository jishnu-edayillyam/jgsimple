import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.scss";

const SlideShowButton = () => {
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
    <Link
      to="/slideshow"
      className={`slideshow-button ${isSticky && "sticked"}`}
      ref={ref}
    >
      <img src="slideshow2.svg" alt="slideshow" />
      <span>Slideshow</span>
    </Link>
  );
};

export default SlideShowButton;
