import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";

const ServiceParallax = ({ service }) => {
  const [isObserved, setIsObserved] = useState(false);

  let scrolled = 0;

  const titleRef = useRef(null);

  const translateProjectTitle = () => {
    if (titleRef.current)
      titleRef.current.style.left = `${(-window.pageYOffset - scrolled) / 2}px`;
  };

  useEffect(() => {
    const cachedRef = titleRef.current;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio === 1) {
          setIsObserved(true);
          observer.unobserve(cachedRef);
        }
      },
      { threshold: [1], rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(cachedRef);

    return () => {
      observer.unobserve(cachedRef);
    };
  }, []);

  useEffect(() => {
    if (isObserved) {
      scrolled = -window.pageYOffset;
      document.addEventListener("scroll", translateProjectTitle);
    }

    return () => {
      document.removeEventListener("scroll", translateProjectTitle);
    };
  }, [isObserved]);

  return (
    <div
      className="service-parallax"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${service.image})`,
      }}
    >
      <div className="service-title" ref={titleRef}>
        <div className={`${isObserved ? "service-name-container" : ""}`}>
          <h1 className="service-name">{service.name}</h1>
          <h1 className="service-name">{service.name}</h1>
          <h1 className="service-name">{service.name}</h1>
        </div>
      </div>
    </div>
  );
};

ServiceParallax.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ServiceParallax;
