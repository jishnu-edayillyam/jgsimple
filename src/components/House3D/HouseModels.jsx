/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import * as THREE from "three";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress, useGLTF } from "@react-three/drei";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import "./style.scss";
import { Color } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { cloneDeep } from "lodash";
import House from "./House";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <div style={{ color: "red", position: "absolute", zIndex: -1 }}>
      {progress} % loaded
    </div>
  );
};

const House1 = () => {
  const houseRef = useRef();

  useFrame(() => {
    TWEEN.update();
  });

  const { camera } = useThree();

  const gltf = useGLTF("/models/shaji_7-transformed.glb", "/draco-gltf");
  useEffect(() => {
    // useGLTF.preload("/models/shaji_7.glb");
    // new TWEEN.Tween(camera.position)
    //   .to(
    //     {
    //       x: 100,
    //       y: 0,
    //       z: 80,
    //     },
    //     1000
    //   )
    //   .start();

    // const introSection = document.querySelector(".basic-info-container");

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (!entry.isIntersecting) {
    //         new TWEEN.Tween(camera.position)
    //           .to(
    //             {
    //               x: 0,
    //               y: 10,
    //               z: 500,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.position)
    //           .to(
    //             {
    //               x: -500,
    //               y: 10,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.rotation)
    //           .to(
    //             {
    //               x: 0,
    //               y: Math.PI + 0.5,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         observerOnUp.observe(introSection);
    //       }
    //     });
    //   },
    //   {
    //     threshold: 1,
    //   }
    // );

    // const observerOnUp = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         new TWEEN.Tween(camera.position)
    //           .to(
    //             {
    //               x: 100,
    //               y: 0,
    //               z: 80,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.position)
    //           .to(
    //             {
    //               x: 0,
    //               y: 0,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.rotation)
    //           .to(
    //             {
    //               x: 0,
    //               y: 0,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();
    //       }
    //     });
    //   },
    //   {
    //     threshold: 1,
    //   }
    // );

    // observer.observe(introSection);

    let house;
    const houseGroup = new THREE.Group();
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        house = [...child.parent.children];
        return true;
      }
    });

    for (const child of house) {
      const solid = new THREE.Mesh(child.geometry, child.material);
      solid.scale.set(1 / 10, 1 / 10, 1 / 10);
      houseGroup.add(solid);
    }

    gltf.scene.add(houseGroup);

    return () => {
      // observer.unobserve(introSection);
      // observerOnUp.unobserve(introSection);
    };
  }, []);

  return <primitive ref={houseRef} object={gltf.scene} />;
};

const HouseWireframe = () => {
  const houseRef = useRef();

  useFrame(() => {
    TWEEN.update();
  });

  const { camera } = useThree();
  const gltf = useGLTF("/models/shaji_7-transformed.glb", "/draco-gltf");

  // const [model, setModel] = useState();
  // useEffect(() => {
  //   new GLTFLoader().load("/models/shaji_7-transformed.glb", setModel);
  // }, []);
  // console.log(model);
  // console.log("gltf", gltf);
  // const { scene } = useGLTF("/models/shaji_7.glb", "/draco-gltf");
  // const copiedScene = useMemo(() => scene.clone(), [scene]);
  // console.log(scene, copiedScene);

  useEffect(() => {
    // useGLTF.preload("/models/shaji_7.glb");
    // new TWEEN.Tween(camera.position)
    //   .to(
    //     {
    //       x: 100,
    //       y: 0,
    //       z: 80,
    //     },
    //     1000
    //   )
    //   .start();

    // const introSection = document.querySelector(".basic-info-container");

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (!entry.isIntersecting) {
    //         new TWEEN.Tween(camera.position)
    //           .to(
    //             {
    //               x: 0,
    //               y: 10,
    //               z: 500,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.position)
    //           .to(
    //             {
    //               x: -500,
    //               y: 10,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.rotation)
    //           .to(
    //             {
    //               x: 0,
    //               y: Math.PI + 0.5,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         observerOnUp.observe(introSection);
    //       }
    //     });
    //   },
    //   {
    //     threshold: 1,
    //   }
    // );

    // const observerOnUp = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         new TWEEN.Tween(camera.position)
    //           .to(
    //             {
    //               x: 100,
    //               y: 0,
    //               z: 80,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.position)
    //           .to(
    //             {
    //               x: 0,
    //               y: 0,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef.current.rotation)
    //           .to(
    //             {
    //               x: 0,
    //               y: 0,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();
    //       }
    //     });
    //   },
    //   {
    //     threshold: 1,
    //   }
    // );

    // observer.observe(introSection);

    let house;
    const houseGroup = new THREE.Group();
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        house = [...child.parent.children];
        return true;
      }
    });

    const house2 = cloneDeep(house);

    for (const child of house2) {
      child.material.wireframe = true;
      child.material.color = new Color("#fff");
      child.material.transparent = true;
      child.material.opacity = 0.1;
      const solid = new THREE.Mesh(child.geometry, child.material);
      solid.scale.set(1 / 10, 1 / 10, 1 / 10);
      houseGroup.add(solid);
    }

    gltf.scene.add(houseGroup);

    return () => {
      // observer.unobserve(introSection);
      // observerOnUp.unobserve(introSection);
    };
  }, []);

  return <primitive ref={houseRef} object={gltf.scene} />;
};

const House3D = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        className="house solid-house"
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [-100, 100, 100],
        }}
      >
        <ambientLight color={0xffffff} intensity={0.5} />
        {/* <pointLight position={[10, 10, 10]} /> */}
        <directionalLight
          color={0xffffff}
          intensity={0.5}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          // shadowCameraFar={150}
          shadow-camera-left={-7}
          shadow-camera-top={7}
          shadow-camera-right={7}
          shadow-camera-bottom={0.7}
          position={[5, 5, 5]}
        />
        <House />
        <OrbitControls />
      </Canvas>
      <Canvas
        className="house wireframe-house"
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [-100, 100, 100],
        }}
        shadowMap
      >
        <ambientLight color={0xffffff} intensity={0.5} />
        {/* <pointLight position={[10, 10, 10]} /> */}
        <directionalLight
          color={0xffffff}
          intensity={0.5}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          // shadowCameraFar={150}
          shadow-camera-left={-7}
          shadow-camera-top={7}
          shadow-camera-right={7}
          shadow-camera-bottom={0.7}
          position={[5, 5, 5]}
        />
        <House wireframe />
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
};

export default House3D;
