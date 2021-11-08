/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import PropTypes from "prop-types";
import Gallery from "../../components/Gallery/Gallery";
import "./style.scss";
import db from "../../firebase";
import { slugReverse } from "../../store/utils";
// import "./solid_house";
// import "./wireframe_house";
// import House3D from "../../components/House3D/House3D";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import * as dat from 'dat.gui'
import { OrthographicCamera, Color } from "three";
import House3D from "../../components/House3D/HouseModels";
import HouseWireframe3D from "../../components/House3D/HouseWireframe3D";
// import { Color } from 'three';

// import './wireframe_house.js';

const ProjectDetails = ({ match }) => {
  const [projects, setProjects] = useState([]);
  // const [scrolled, setScrolled] = useState(false);
  const basicInfoContainer = useRef();

  async function getProjects() {
    const projectsCollection = collection(db, "projects");
    const q = query(
      projectsCollection,
      where("name", "==", slugReverse(match.params.id))
    );
    const projectsSnapshot = await getDocs(q);
    setProjects(projectsSnapshot.docs.map((doc1) => doc1.data()));
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

    const introSection = basicInfoContainer.current;
    const aboutSection = document.querySelector(".about-the-work-container");
    const splitBlock = document.querySelector(".split-block");
    // const pageContainer = document.querySelector(".project-details-page");

    // const disableScroll = (e) => {
    //   e.preventDefault();
    //   // setScrolled(false);
    //   introSection.classList.add("translate-up");
    //   setTimeout(() => {
    //     document.removeEventListener("wheel", disableScroll);
    //     document.removeEventListener("touchmove", disableScroll);
    //   }, 1000);
    // };

    const observerUp = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            introSection.classList.remove("translate-up");
            introSection.classList.remove("no-display");
            aboutSection.classList.remove("display");
            splitBlock.classList.remove("split-translate");
          }
        });
      },
      {
        threshold: 0,
      }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            introSection.classList.add("translate-up");
            setTimeout(() => {
              introSection.classList.add("no-display");
              aboutSection.classList.add("display");
              splitBlock.classList.add("split-translate");
            }, 1000);
            observerUp.observe(splitBlock);
          } else {
            // introSection.classList.remove("translate-up");
            // introSection.classList.remove("no-display");
            // aboutSection.classList.remove("display");
          }

          // if (entry.isIntersecting) {
          //   introSection.classList.remove("translate-up");
          //   document.addEventListener("wheel", disableScroll, {
          //     passive: false,
          //   });
          //   document.addEventListener("touchmove", disableScroll, {
          //     passive: false,
          //   });
          // }
        });
      },
      {
        threshold: 1,
      }
    );

    observer.observe(introSection);

    return () => {
      observer.unobserve(introSection);
      observerUp.unobserve(splitBlock);
    };
  }, []);

  // const disableScroll = (e) => {
  //   e.preventDefault();
  //   setScrolled(true);
  //   // setTimeout(() => {
  //   document.removeEventListener("wheel", disableScroll);
  //   document.removeEventListener("touchmove", disableScroll);
  //   // }, 1000);
  // };

  //   useEffect(() => {
  //   document.addEventListener("wheel", disableScroll, { passive: false });
  //   document.addEventListener("touchmove", disableScroll, { passive: false });

  //   return () => {
  //     document.removeEventListener("wheel", disableScroll);
  //     document.removeEventListener("touchmove", disableScroll);
  //   };
  // }, []);

  useEffect(() => {
    const aboutCardsSection = document.querySelector(".about-cards");
    const solidHouseCanvas = document.querySelector(".solid-house");
    const projectDetailsPage = document.querySelector(".project-details-page");
    const aboutWorkContainer = document.querySelector(
      ".about-the-work-container"
    );

    let scrolledValue = 0;
    const clipCanvas = () => {
      if (scrolledValue === 0) scrolledValue = aboutWorkContainer.scrollTop;
      solidHouseCanvas.style.webkitClipPath = `inset(0 0 ${
        (aboutWorkContainer.scrollTop - scrolledValue) / 10
      }% 0)`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutWorkContainer.addEventListener("scroll", clipCanvas);
            entry.target.classList.add("appear");
          } else {
            aboutWorkContainer.removeEventListener("scroll", clipCanvas);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    observer.observe(aboutCardsSection);

    const cards = document.querySelectorAll(".about-card");

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
      aboutWorkContainer.removeEventListener("scroll", clipCanvas);
    };
  }, [projects]);

  // useEffect(() => {
  //   const parameters = {};

  //   // Canvas
  //   const canvas = document.querySelector(".canvas2");
  //   canvas.style.backgroundColor = "black";

  //   // Scene
  //   const scene = new THREE.Scene();

  //   /**
  //    * Sizes
  //    */
  //   const sizes = {
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   };

  //   window.addEventListener("resize", () => {
  //     // Update sizes
  //     sizes.width = window.innerWidth;
  //     sizes.height = window.innerHeight;

  //     // Update camera
  //     camera.aspect = sizes.width / sizes.height;
  //     camera.updateProjectionMatrix();

  //     // Update renderer
  //     renderer.setSize(sizes.width, sizes.height);
  //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //   });

  //   const aboutCardsSection = document.querySelector(".about-cards");
  //   // div.addEventListener("scroll", (event) => {
  //   //   console.log(event.target);
  //   //   if (div.scrollTop >= 800 && div.scrollTop <= 2000) {
  //   //     camera.position.setZ(50 - (div.scrollTop - 800) / 100);
  //   //   }
  //   // });

  //   const zoomHouse = () => {
  //     console.log(aboutCardsSection.offsetTop);
  //   };

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           console.log("object2");
  //           window.addEventListener("scroll", zoomHouse, true);
  //         } else {
  //           console.log("object2");
  //           window.removeEventListener("scroll", zoomHouse, true);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0,
  //     }
  //   );

  //   observer.observe(aboutCardsSection);

  //   /**
  //    * Camera
  //    */
  //   // Base camera
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     sizes.width / sizes.height,
  //     0.1,
  //     1000
  //   );
  //   camera.position.set(0, 0, 50);
  //   scene.add(camera);
  //   const axesHelper = new THREE.AxesHelper(15);
  //   scene.add(axesHelper);
  //   // Controls
  //   // const controls = new OrbitControls(camera, canvas)
  //   // controls.enableDamping = true

  //   // imported models
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("/draco/");

  //   const gltfLoader = new GLTFLoader();
  //   gltfLoader.setDRACOLoader(dracoLoader);

  //   let house;
  //   const scaleFactor = 50;

  //   const houseGroup = new THREE.Group();

  //   gltfLoader.load("/models/shaji_7.glb", (gltf) => {
  //     gltf.scene.traverse((child) => {
  //       if (child.isMesh) {
  //         house = [...child.parent.children];
  //         return true;
  //       }
  //     });

  //     // for (const child of house) {
  //     //   child.material.wireframe = true;
  //     //   child.material.color = new Color("#fff");
  //     //   child.material.transparent = true;
  //     //   child.material.opacity = 0.1;

  //     //   // house
  //     //   const solid = new THREE.Mesh(child.geometry, child.material);
  //     //   solid.scale.set(1 / scaleFactor, 1 / scaleFactor, 1 / scaleFactor);
  //     //   solid.position.set(
  //     //     -(
  //     //       solid.geometry.boundingBox.max.x + solid.geometry.boundingBox.min.x
  //     //     ) /
  //     //       (2 * scaleFactor),
  //     //     0,
  //     //     -(
  //     //       solid.geometry.boundingBox.max.z + solid.geometry.boundingBox.min.z
  //     //     ) /
  //     //       (2 * scaleFactor)
  //     //   );
  //     //   houseGroup.add(solid);
  //     // }

  //     for (const child of house) {
  //       // house wireframe
  //       // child.material.wireframe = true can be used, but the edges are coloured. To give a single color for all the edges, THREE.LineSegments is used.
  //       const line = new THREE.LineSegments(
  //         child.geometry,
  //         new THREE.LineBasicMaterial({
  //           // color: 0xff0000,
  //           transparent: true,
  //           opacity: 0.1,
  //         })
  //       );
  //       line.scale.set(1 / scaleFactor, 1 / scaleFactor, 1 / scaleFactor);
  //       line.position.set(
  //         -(line.geometry.boundingBox.max.x + line.geometry.boundingBox.min.x) /
  //           (2 * scaleFactor),
  //         0,
  //         -(line.geometry.boundingBox.max.z + line.geometry.boundingBox.min.z) /
  //           (2 * scaleFactor)
  //       );
  //       // line.material = new THREE.MeshStandardMaterial({color: 0x000000})
  //       houseGroup.add(line);
  //     }
  //   });

  //   scene.add(houseGroup);

  //   // lights
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  //   scene.add(ambientLight);

  //   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  //   directionalLight.castShadow = true;
  //   directionalLight.shadow.mapSize.set(1024, 1024);
  //   directionalLight.shadow.camera.far = 150;
  //   directionalLight.shadow.camera.left = -7;
  //   directionalLight.shadow.camera.top = 7;
  //   directionalLight.shadow.camera.right = 7;
  //   directionalLight.shadow.camera.bottom = -7;
  //   directionalLight.position.set(5, 5, 5);
  //   scene.add(directionalLight);

  //   /**
  //    * Renderer
  //    */
  //   const renderer = new THREE.WebGLRenderer({
  //     canvas,
  //     alpha: true,
  //   });
  //   renderer.setSize(sizes.width, sizes.height);
  //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //   /**
  //    * Animate
  //    */
  //   const clock = new THREE.Clock();
  //   let oldElapsedTime = 0;

  //   const tick = () => {
  //     const elapsedTime = clock.getElapsedTime();
  //     const deltaTime = elapsedTime - oldElapsedTime;
  //     oldElapsedTime = elapsedTime;

  //     houseGroup.rotation.y = elapsedTime / 5;

  //     // // Update controls
  //     // controls.update()

  //     // Render
  //     renderer.render(scene, camera);

  //     // Call tick again on the next frame
  //     window.requestAnimationFrame(tick);
  //   };

  //   tick();

  //   return () => {
  //     observer.unobserve(aboutCardsSection);
  //     aboutCardsSection.removeEventListener("scroll", zoomHouse);
  //   };
  // }, []);

  return (
    <div style={{ position: "relative" }}>
      <div className="project-details-page">
        <div className="basic-info-container" ref={basicInfoContainer}>
          <div className="basic-info">
            <h1>{projects[0]?.name}</h1>
            <p>client: {projects[0]?.clients[0]}</p>
          </div>
        </div>
        <div className="split-block" />
        <section className="about-the-work-container">
          <div className="about-the-work">
            <p className="about-the-work-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              laudantium est eius? Aspernatur illum impedit, quisquam cum
              commodi blanditiis perferendis recusandae. Recusandae voluptatem
              repellendus tempore? Accusantium assumenda eos quae odio ad vero,
              neque excepturi sed fugiat distinctio facere. Nisi incidunt sit
              excepturi totam id, iste voluptas harum! Aliquam omnis debitis
              quasi provident modi possimus necessitatibus incidunt, fugit,
              maxime dolor voluptate alias accusamus harum consequuntur nemo
              cumque consectetur laborum amet voluptatem beatae ab eaque hic
              reiciendis minus. Quas, dolore molestiae explicabo quo earum,
              aliquam excepturi enim nemo aspernatur odit adipisci inventore
              veniam, qui natus incidunt voluptate debitis! Impedit inventore
              facere animi nemo laborum dolorem consequatur obcaecati vero.
              Expedita id, sequi debitis facilis animi sit fugiat repellendus
              eaque? Assumenda impedit reprehenderit perspiciatis fugit ipsum
              deleniti velit doloremque nam quidem dicta cumque quae distinctio
              dolores autem aperiam, quos aliquid nihil minus tenetur quasi.
              Consequatur aperiam beatae libero optio molestias. Ipsam, eveniet
              exercitationem est ratione dolores vitae mollitia assumenda quo
              architecto reiciendis tempore perspiciatis nostrum aperiam atque
              fuga iste odit cumque doloribus recusandae eum? Ipsa, quae
              nesciunt neque quasi necessitatibus suscipit consequuntur sit
              quisquam expedita numquam, vitae velit cumque corporis, natus
              accusantium voluptatum ipsam quis consequatur ducimus labore fugit
              rerum. Voluptates, aspernatur officia? Veritatis quam, distinctio
              dolorum, laborum explicabo quis inventore consequuntur fuga quidem
              vitae libero, saepe assumenda. Esse dicta veritatis, sapiente
              reiciendis at ex autem nobis culpa. Hic harum aspernatur dolorum
              porro iste exercitationem magnam! Voluptate consequatur atque
              soluta doloribus neque, explicabo illo omnis, eligendi, tempora
              saepe enim commodi? Qui nemo suscipit, possimus esse
              exercitationem non unde vitae nobis deleniti ratione? Dolorem
              corrupti, ipsa reprehenderit nisi porro quod? Odit, tenetur
              voluptatibus ut nulla dicta itaque sint qui, amet obcaecati
              consequatur ab repudiandae quasi eius architecto maxime! Cum nulla
              consectetur pariatur. Assumenda, molestiae ullam. Voluptatibus
              placeat voluptates expedita. Laudantium minus necessitatibus ipsa?
              Rerum, itaque quod. Soluta iusto deleniti iure aspernatur
              deserunt? Iure laudantium recusandae aspernatur ut maxime quas
              praesentium aliquam, est tenetur id minus eos asperiores
              distinctio non? Voluptates, distinctio possimus! Deserunt commodi
              eius esse cumque. Illo ad quasi reiciendis facere dolore, aliquid
              sint. Pariatur ut aliquam quisquam assumenda aut dolorum numquam
              adipisci quam eius modi molestiae facilis perferendis accusamus,
              voluptatum minima perspiciatis reprehenderit quas autem odit,
              neque fuga. Dolor minus magni fugit cupiditate incidunt! Incidunt
              facere officiis debitis enim consequuntur, aut consequatur iste
            </p>
          </div>
          <section className="about-cards">
            {projects[0]?.description.map((description1, index) => (
              <div key={index} className="about-card">
                {/* <img
                  src={description1.image}
                  alt="about_image"
                  className="about_image"
                /> */}
                <p>{description1.text}</p>
              </div>
            ))}
          </section>
          <Gallery />
        </section>
      </div>
      {/* <canvas
        id="canvas1"
        className="canvas1"
        style={{ backgroundColor: "black" }}
      />
      <canvas
        id="canvas2"
        className="canvas2"
        style={{ backgroundColor: "red" }}
      /> */}
      {/* <HouseWireframe3D /> */}
      <House3D />
      {/* <House3D wireframe /> */}
    </div>
  );
};

ProjectDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

export default ProjectDetails;
