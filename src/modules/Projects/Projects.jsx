import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { Link } from "react-router-dom";

import "./style.scss";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import db from "../../firebase";
import { slugify } from "../../store/utils";
import Loader from "../../components/Loader/Loader";
import { loadingEndAnimationDuration } from "../../store/constants";

// const projects = [
//   { titleImage: "house2.jpg", name: "AllProjects component created" },
//   {
//     titleImage: "house1.jpg",
//     name: "UI for list of all projects page",
//   },
//   { titleImage: "house3.jpg", name: "horizontal gallery try" },
//   {
//     titleImage: "house4.jpg",
//     name: "sdfsdfsdfs sdfasdfsdf sdfsdf sdasdadadaSD zxczxczx Plain text exclusively consists of character repre",
//   },
//   {
//     titleImage: "house5.jpg",
//     name: "character is represented by a",
//   },
//   { titleImage: "house6.jpg", name: "ition has not changed." },
//   { titleImage: "house7.jpg", name: "rd-image files created from suc" },
//   { titleImage: "house8.jpg", name: "ommands that specified the li" },
//   {
//     titleImage: "house9.jpg",
//     name: "keypunching. Some line editors could be used by",
//   },
//   {
//     titleImage: "house10.jpg",
//     name: "verify mode in which change comma",
//   },
//   {
//     titleImage: "house11.jpg",
//     name: "allowing them to open files saved from text ",
//   },
//   {
//     titleImage: "house12.jpg",
//     name: "sdsdfsdfs asdasasdasd ditors, and in fact were commonly used as such durin",
//   },
//   {
//     titleImage: "house13.jpg",
//     name: "basic format being plain text and visual formatting",
//   },
//   {
//     titleImage: "house14.jpg",
//     name: "language or development environment they are",
//   },
// ];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isLoadingEndAnimation, setIsLoadingEndAnimation] = useState(false);

  async function getProjects() {
    const projectsCollection = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsCollection);
    setProjects(projectsSnapshot.docs.map((doc1) => doc1.data()));
    setIsLoadingEndAnimation(true);
    setIsContentLoading(false);
    setTimeout(() => {
      setIsLoadingEndAnimation(false);
    }, loadingEndAnimationDuration);
  }

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 3) {
      setProjects(projects.concat(projects).concat(projects));
    }
  }, [projects]);

  // hide scrollbar for only this page
  useEffect(() => {
    document.documentElement.classList.add("no-scrollbar");
    return () => {
      document.documentElement.classList.remove("no-scrollbar");
    };
  }, []);

  if (isContentLoading || isLoadingEndAnimation) {
    return <Loader isContentLoading={isContentLoading} />;
  }

  return (
    <div className="projects-list-container">
      {projects.map((project, index) => (
        <Link to={`/projects/${slugify(project.name)}`} key={index}>
          <ProjectCard details={project} />
        </Link>
      ))}
    </div>
  );
};

export default Projects;
