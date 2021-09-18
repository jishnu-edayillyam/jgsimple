import React from "react";
import "./style.scss";

const ProjectCard = () => {
  return (
    <div className="card-container">
      <div
        className="card"
        style={{
          transform: `translateY(${(Math.random() - 0.5) * 50}px)`,
        }}
      >
        <img src="download.jfif" alt="project_image" />
        <div className="project-info">
          <div>
            <h2>Project Name</h2>
            <p>client: someone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
