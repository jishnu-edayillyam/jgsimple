import React, { useState, useRef, useLayoutEffect } from "react";
import "./style.scss";

const VerticalProjectCard = ({ projectDetail }) => {
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
        <img src={projectDetail.imageSource} alt="project_image" />
        <div className="project-basic-info">
          <div>
            <h2 ref={headingRef}>{projectDetail.projectName}</h2>
            {/* <p>client: someone</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalProjectCard;
