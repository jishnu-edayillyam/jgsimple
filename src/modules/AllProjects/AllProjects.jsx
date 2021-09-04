import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./style.scss";

const AllProjects = () => {
  return (
    <div className="horizontal-scroll-wrapper">
      <div className="horizontal-child">
        <div className="slide">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
