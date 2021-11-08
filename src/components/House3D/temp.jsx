/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, useGLTF } from "@react-three/drei";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import "./style.scss";

// import * as dat from 'dat.gui'
// import { OrthographicCamera } from 'three'

/**
 * Base
 */
// const parameters = {};

// Canvas
// const canvas = document.querySelector("canvas.canvas2");

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// var div = document.getElementById("div1");
// div.addEventListener("scroll", (event) => {
//   if (div.scrollTop >= 800 && div.scrollTop <= 2000) {
//     camera.position.setZ(50 - (div.scrollTop - 800) / 100);
//   }
// });

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   1000
// );
// camera.position.set(0, 0, 50);
// scene.add(camera);
// const axesHelper = new THREE.AxesHelper(15);
// scene.add(axesHelper);
// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// imported models
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("/draco/");

// const gltfLoader = new GLTFLoader();
// gltfLoader.setDRACOLoader(dracoLoader);

// let house;
// let scaleFactor = 50;

// const houseGroup = new THREE.Group();

// gltfLoader.load("/models/shaji_12.gltf", (gltf) => {
//   console.log("dsfsdfsf", gltf);
//   gltf.scene.traverse(function (child) {
//     if (child.isMesh) {
//       console.log("mesh found");
//       house = [...child.parent.children];
//       return true;
//     }
//   });

//   for (const child of house) {
//     console.log("house component");
//     // house
//     var solid = new THREE.Mesh(child.geometry, child.material);
//     solid.scale.set(1 / scaleFactor, 1 / scaleFactor, 1 / scaleFactor);
//     solid.position.set(
//       -(solid.geometry.boundingBox.max.x + solid.geometry.boundingBox.min.x) /
//         (2 * scaleFactor),
//       0,
//       -(solid.geometry.boundingBox.max.z + solid.geometry.boundingBox.min.z) /
//         (2 * scaleFactor)
//     );
//     houseGroup.add(solid);
//   }
// });

// scene.add(houseGroup);

// lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.set(1024, 1024);
// directionalLight.shadow.camera.far = 150;
// directionalLight.shadow.camera.left = -7;
// directionalLight.shadow.camera.top = 7;
// directionalLight.shadow.camera.right = 7;
// directionalLight.shadow.camera.bottom = -7;
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   alpha: true,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
// const clock = new THREE.Clock();
// let oldElapsedTime = 0;

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();
//   const deltaTime = elapsedTime - oldElapsedTime;
//   oldElapsedTime = elapsedTime;

//   houseGroup.rotation.y = elapsedTime / 5;

//   // // Update controls
//   // controls.update()

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
// function Box(props) {
//   // This reference will give us direct access to the THREE.Mesh object
//   const ref = useRef();
//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   //   useFrame((state, delta) => (ref.current.rotation.x += 0.01))
//   useFrame(() => {
//     ref.current.rotation.x += 0.01;
//   });
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={active ? 1.5 : 1}
//       onClick={() => setActive(!active)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

// useLoader(GLTFLoader, "/computers.glb", (loader) => {
//   console.log(loader);
//   const dracoLoader = new DRACOLoader();
//   dracoLoader.setDecoderPath("/draco-gltf/");
//   loader.setDRACOLoader(dracoLoader);
// });

function Loader() {
  const { progress } = useProgress();
  return (
    <div style={{ color: "yellow", position: "absolute", zIndex: -1 }}>
      {progress} % loaded
    </div>
  );
  // return (
  //   <Canvas>
  //     <Html style={{ color: "red" }}>{progress} % loaded</Html>
  //   </Canvas>
  // );
}
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function House() {
  const houseRef = useRef();
  // const [scrolled, setScrolled] = useState(false);

  useFrame(({ clock, camera }) => {
    // const elapsedTime = clock.getElapsedTime();
    TWEEN.update();
    // console.log(houseRef.current.rotation.y);
    // if (scrolled) {
    //   // camera.lookAt(new THREE.Vector3(0, 0, 0));
    //   // houseRef.current.rotation.y -= 1 / 500;
    //   // houseRef.current.rotation.y = -5;
    //   // camera.position.y += Math.sin(elapsedTime);
    //   // camera.position.z += Math.cos(elapsedTime);
    // }
    // if (scrolled && camera.position.z > -500) {
    //   camera.position.x += 2;
    //   camera.position.z -= 4;
    //   camera.position.y -= 1 / 10;
    // } else if (scrolled) {
    //   houseRef.current.rotation.y -= 1 / 500;
    // }
  });

  // const { setDefaultCamera } = useThree();
  const { camera } = useThree();
  // camera.position.set(-200, 100, 200);

  const gltf = useGLTF("/models/shaji_7.glb", "/draco-gltf");

  // const disableScroll = (e) => {
  //   e.preventDefault();
  //   setScrolled(true);
  //   // setTimeout(() => {
  //   document.removeEventListener("wheel", disableScroll);
  //   document.removeEventListener("touchmove", disableScroll);
  //   // }, 1000);
  // };

  // useEffect(() => {
  //   document.addEventListener("wheel", disableScroll, { passive: false });
  //   document.addEventListener("touchmove", disableScroll, { passive: false });

  //   return () => {
  //     document.removeEventListener("wheel", disableScroll);
  //     document.removeEventListener("touchmove", disableScroll);
  //   };
  // }, []);

  useEffect(() => {
    new TWEEN.Tween(camera.position)
      .to(
        {
          x: 100,
          y: 0,
          z: 80,
        },
        1000
      )
      // .easing(TWEEN.Easing.Cubic.Out)
      .start();

    const introSection = document.querySelector(".basic-info-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            new TWEEN.Tween(camera.position)
              .to(
                {
                  x: 0,
                  y: 10,
                  z: 500,
                },
                1000
              )
              // .easing(TWEEN.Easing.Cubic.Out)
              .start();

            new TWEEN.Tween(houseRef.current.position)
              .to(
                {
                  x: -500,
                  y: 10,
                  z: 0,
                },
                1000
              )
              // .easing(TWEEN.Easing.Cubic.Out)
              .start();

            new TWEEN.Tween(houseRef.current.rotation)
              .to(
                {
                  x: 0,
                  y: Math.PI + 0.5,
                  z: 0,
                },
                1000
              )
              // .easing(TWEEN.Easing.Cubic.Out)
              .start();

            // setScrolled(true);
            observerOnUp.observe(introSection);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    const observerOnUp = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            new TWEEN.Tween(camera.position)
              .to(
                {
                  x: 100,
                  y: 0,
                  z: 80,
                },
                1000
              )
              // .easing(TWEEN.Easing.Cubic.Out)
              .start();

            new TWEEN.Tween(houseRef.current.position)
              .to(
                {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                1000
              )
              // .easing(TWEEN.Easing.Cubic.Out)
              .start();

            new TWEEN.Tween(houseRef.current.rotation)
              .to(
                {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                1000
              )
              // .easing(TWEEN.Easing.Cubic.Out)
              .start();

            // setScrolled(false);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    observer.observe(introSection);

    return () => {
      observer.unobserve(introSection);
      observerOnUp.unobserve(introSection);
    };
  }, []);

  let house;
  const scaleFactor = 50;

  const houseGroup = new THREE.Group();
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      house = [...child.parent.children];
      return true;
    }
  });

  for (const child of house) {
    // house
    const solid = new THREE.Mesh(child.geometry, child.material);
    solid.scale.set(5 / scaleFactor, 5 / scaleFactor, 5 / scaleFactor);
    // solid.position.set(
    //   -(solid.geometry.boundingBox.max.x + solid.geometry.boundingBox.min.x) /
    //     (2 * scaleFactor),
    //   0,
    //   -(solid.geometry.boundingBox.max.z + solid.geometry.boundingBox.min.z) /
    //     (2 * scaleFactor)
    // );
    houseGroup.add(solid);
  }

  gltf.scene.add(houseGroup);
  // gltf.scene.position.set(0, 0, 0);

  return (
    // <Suspense fallback={<div style={{ color: "yellow" }}>Loading</div>}>
    <primitive
      ref={houseRef}
      object={gltf.scene}
      // scale={1}
    />
    // </Suspense>
  );
}

useGLTF.preload("/models/shaji_7.glb");

const House3D = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        className="solid-house"
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [-100, 100, 100],
        }}
        // colorManagement
      >
        <ambientLight color={0xffffff} />
        <pointLight position={[10, 10, 10]} />
        <House />
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
};

export default House3D;
