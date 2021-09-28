import React, { useState, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";

const ProjectCard = ({ details }) => {
  const [fontSize, setFontSize] = useState(60);
  const headingRef = useRef();
  const containerRef = useRef();

  useLayoutEffect(() => {
    if (
      headingRef.current.clientWidth + 20 >=
      containerRef.current.clientWidth
    ) {
      if (fontSize < 20) {
        headingRef.current.style.lineHeight = "40px";
      } else {
        headingRef.current.style.fontSize = `${fontSize - 2}px`;
        setFontSize(fontSize - 2);
      }
    }
  }, [fontSize]);

  return (
    <div className="card-container" ref={containerRef}>
      <div className="card">
        <img src={details.titleImage} alt="project_image" />
        <div className="project-basic-info">
          <div>
            <h2 ref={headingRef}>{details.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  details: PropTypes.shape({
    titleImage: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
