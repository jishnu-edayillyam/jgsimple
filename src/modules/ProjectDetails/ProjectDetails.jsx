import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import PropTypes from "prop-types";

import Gallery from "../../components/Gallery/Gallery";
import "./style.scss";
import db from "../../firebase";
import { slugReverse } from "../../store/utils";
import Loader from "../../components/Loader/Loader";
import { loadingEndAnimationDuration } from "../../store/constants";

const ProjectDetails = ({ match }) => {
  const [project, setProject] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isLoadingEndAnimation, setIsLoadingEndAnimation] = useState(false);

  async function getProjects() {
    const projectsCollection = collection(db, "projects");
    const q = query(
      projectsCollection,
      where("name", "==", slugReverse(match.params.id))
    );
    const projectsSnapshot = await getDocs(q);
    setProject(projectsSnapshot.docs.map((doc1) => doc1.data()));
    setIsLoadingEndAnimation(true);
    setIsContentLoading(false);
    setTimeout(() => {
      setIsLoadingEndAnimation(false);
    }, loadingEndAnimationDuration);
    // setProjects([
    //   {
    //     name: "project name",
    //     clients: ["client name"],
    //     description: [
    //       {
    //         image:
    //           "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
    //         text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur error enim quam nostrum magnam est necessitatibus eligendi magni numquam blanditiis repudiandae quisquam eos alias eum modi perferendis veniam, doloremque dolore quo, atque laborum illo ipsa porro! A enim odit cumque, rem laboriosam perspiciatis dolorum, ad optio suscipit culpa incidunt maxime.",
    //       },
    //       {
    //         image:
    //           "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
    //         text: `${match.params}Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur error enim quam nostrum magnam est necessitatibus eligendi magni numquam blanditiis repudiandae quisquam eos alias eum modi perferendis veniam, doloremque dolore quo, atque laborum illo ipsa porro! A enim odit cumque, rem laboriosam perspiciatis dolorum, ad optio suscipit culpa incidunt maxime.`,
    //       },
    //     ],
    //   },
    // ]);
  }

  useEffect(() => {
    getProjects();
  }, []);

  if (isContentLoading || isLoadingEndAnimation) {
    return <Loader isContentLoading={isContentLoading} />;
  }

  return (
    <div className="project-details-page">
      <div className="basic-info-container">
        <div className="basic-info">
          <h1>{project[0]?.name}</h1>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error nihil
          consequatur maiores culpa laudantium labore reiciendis quae! Itaque
          ducimus illo mollitia, temporibus soluta assumenda atque blanditiis
          praesentium odio maxime placeat, facere officia. Aliquid voluptates
          tenetur cupiditate numquam totam eveniet incidunt a quibusdam
          laboriosam magni animi sed corrupti eaque veritatis, reiciendis
          suscipit delectus? Ipsa voluptatem totam repellat necessitatibus.
          Cumque dolore est eius quidem id quo ab quos dolor quasi nesciunt
          mollitia vel in illum, aut eaque aspernatur nemo consectetur deleniti
          quis quisquam ea. Aperiam quo ratione illum quis rem? Cupiditate
          tenetur reprehenderit iure eaque eligendi quibusdam, aperiam omnis
          praesentium sequi qui?
        </div>
      </div>
      <Gallery />
    </div>
  );
};

ProjectDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

export default ProjectDetails;
