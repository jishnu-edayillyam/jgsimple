import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import "./style.scss";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import db from "../../firebase";
import { slugify } from "../../store/utils";

// const projectDetails = [
//   { imageSource: "house2.jpg", projectName: "AllProjects component created" },
//   {
//     imageSource: "house1.jpg",
//     projectName: "UI for list of all projects page",
//   },
//   { imageSource: "house3.jpg", projectName: "horizontal gallery try" },
//   {
//     imageSource: "house4.jpg",
//     projectName:
//       "sdfsdfsdfs sdfasdfsdf sdfsdf sdasdadadaSD zxczxczx Plain text exclusively consists of character repre",
//   },
//   {
//     imageSource: "house5.jpg",
//     projectName: "character is represented by a",
//   },
//   { imageSource: "house6.jpg", projectName: "ition has not changed." },
//   { imageSource: "house7.jpg", projectName: "rd-image files created from suc" },
//   { imageSource: "house8.jpg", projectName: "ommands that specified the li" },
//   {
//     imageSource: "house9.jpg",
//     projectName: "keypunching. Some line editors could be used by",
//   },
//   {
//     imageSource: "house10.jpg",
//     projectName: "verify mode in which change comma",
//   },
//   {
//     imageSource: "house11.jpg",
//     projectName: "allowing them to open files saved from text ",
//   },
//   {
//     imageSource: "house12.jpg",
//     projectName:
//       "sdsdfsdfs asdasasdasd ditors, and in fact were commonly used as such durin",
//   },
//   {
//     imageSource: "house13.jpg",
//     projectName: "basic format being plain text and visual formatting",
//   },
//   {
//     imageSource: "house14.jpg",
//     projectName: "language or development environment they are",
//   },
// ];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    const projectsCollection = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsCollection);
    setProjects(projectsSnapshot.docs.map((doc1) => doc1.data()));
  }

  useEffect(() => {
    getProjects();
  }, []);

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
