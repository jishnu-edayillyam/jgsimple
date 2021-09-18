import React from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./style.scss";

const AllProjects = () => {
  return (
    <div className="horizontal-scroll-wrapper">
      <div className="horizontal-child">
        <div className="slide">
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
          <Link to="/ProjectDetails">
            <ProjectCard />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
