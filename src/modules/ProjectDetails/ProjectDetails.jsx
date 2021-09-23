import React, { useEffect } from "react";
import Gallery from "../../components/Gallery/Gallery";
import "./style.scss";

const workDetails = [
  {
    imgSource: "house2.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Solutadelectus adipisci pariatur, nulla doloremque architecto perferendisquibusdam ex nemo, impedit, quo nisi ad neque accusamus blanditiisdoloribus et eum illo",
  },
  {
    imgSource: "house3.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Solutadelectus adipisci pariatur, nulla doloremque architecto perferendisquibusdam ex nemo, impedit, quo nisi ad neque accusamus blanditiisdoloribus et eum illo",
  },
  {
    imgSource: "house4.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Solutadelectus adipisci pariatur, nulla doloremque architecto perferendisquibusdam ex nemo, impedit, quo nisi ad neque accusamus blanditiisdoloribus et eum illo",
  },
  {
    imgSource: "house5.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Solutadelectus adipisci pariatur, nulla doloremque architecto perferendisquibusdam ex nemo, impedit, quo nisi ad neque accusamus blanditiisdoloribus et eum illo",
  },
  {
    imgSource: "house6.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Solutadelectus adipisci pariatur, nulla doloremque architecto perferendisquibusdam ex nemo, impedit, quo nisi ad neque accusamus blanditiisdoloribus et eum illo",
  },
];

const ProjectDetails = () => {
  useEffect(() => {
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
  }, []);

  return (
    <div className="project-details-page">
      <section className="project-info">
        <img
          src="house2.jpg"
          alt="group_image_1"
          className="group_image group_image_1"
        />
        <img
          src="house3.jpg"
          alt="group_image_2"
          className="group_image group_image_2"
        />
        <img
          src="house4.jpg"
          alt="group_image_3"
          className="group_image group_image_3"
        />
        {/* <img src="house1.jpg" alt="main_image" className="main-image" /> */}
        <div className="basic-info">
          <h1>THIS IS A VERY LONG PROJECT NAME WRITTEN</h1>
          <p>client: Some name</p>
        </div>
      </section>
      <section className="about-the-work">
        {workDetails.map((detail, index) => (
          <div key={index} className="about-cards">
            <img
              src={detail.imgSource}
              alt="about_image"
              className="about_image"
            />
            <p>{detail.text}</p>
          </div>
        ))}
      </section>
      <Gallery />
    </div>
  );
};

export default ProjectDetails;
