import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, where } from "firebase/firestore/lite";
// import { disableNetwork } from "firebase/firestore";
import PropTypes from "prop-types";
import Gallery from "../../components/Gallery/Gallery";
import "./style.scss";
// import db from "../../firebase";
// import { slugReverse } from "../../store/utils";

const ProjectDetails = ({ match }) => {
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    // const projectsCollection = collection(db, "projects");
    // const q = query(
    //   projectsCollection,
    //   where("name", "==", slugReverse(match.params.id))
    // );
    // const projectsSnapshot = await getDocs(q);
    // await disableNetwork(db);
    // setProjects(projectsSnapshot.docs.map((doc1) => doc1.data()));
    setProjects([
      {
        name: "project name",
        clients: ["client name"],
        description: [
          {
            image:
              "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
            text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur error enim quam nostrum magnam est necessitatibus eligendi magni numquam blanditiis repudiandae quisquam eos alias eum modi perferendis veniam, doloremque dolore quo, atque laborum illo ipsa porro! A enim odit cumque, rem laboriosam perspiciatis dolorum, ad optio suscipit culpa incidunt maxime.",
          },
          {
            image:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
            text: `${match.params}Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur error enim quam nostrum magnam est necessitatibus eligendi magni numquam blanditiis repudiandae quisquam eos alias eum modi perferendis veniam, doloremque dolore quo, atque laborum illo ipsa porro! A enim odit cumque, rem laboriosam perspiciatis dolorum, ad optio suscipit culpa incidunt maxime.`,
          },
        ],
      },
    ]);
  }

  useEffect(() => {
    getProjects();

    const cards = document.querySelectorAll(".about-cards");

    const observerOnDown = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    const observerOnUp = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            entry.target.classList.remove("appear");
          }
        });
      },
      {
        threshold: 0,
      }
    );

    cards.forEach((card) => {
      observerOnDown.observe(card);
      observerOnUp.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        observerOnDown.unobserve(card);
        observerOnUp.unobserve(card);
      });
    };
  }, [projects]);

  return (
    <div className="project-details-page">
      <section className="project-info">
        <img src="house1.jpg" alt="main_image" className="main-image" />
        <div className="basic-info-container">
          <div className="basic-info">
            <h1>{projects[0]?.name}</h1>
            <p>client: {projects[0]?.clients[0]}</p>
          </div>
        </div>
      </section>
      <section className="about-the-work">
        {projects[0]?.description.map((description1, index) => (
          <div key={index} className="about-cards">
            <img
              src={description1.image}
              alt="about_image"
              className="about_image"
            />
            <p>{description1.text}</p>
          </div>
        ))}
      </section>
      <Gallery />
    </div>
  );
};

ProjectDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

export default ProjectDetails;
