/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import * as THREE from "three";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress, useGLTF } from "@react-three/drei";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import "./style.scss";
import { Color } from "three";
// import Model from "./Shaji_7";
import WireframeModel from "./Shaji_7";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <div style={{ color: "yellow", position: "absolute", zIndex: -1 }}>
      {progress} % loaded
    </div>
  );
};

const HouseWireframe = () => {
  const houseRef1 = useRef();

  useFrame(() => {
    TWEEN.update();
  });

  const { camera } = useThree();

  const gltf = useGLTF("/models/shaji_13.glb", "/draco-gltf");

  useEffect(() => {
    useGLTF.preload("/models/shaji_13.glb");
    new TWEEN.Tween(camera.position)
      .to(
        {
          x: 0,
          y: 0,
          z: 80,
        },
        1000
      )
      .start();

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

    //         new TWEEN.Tween(houseRef1.current.position)
    //           .to(
    //             {
    //               x: -500,
    //               y: 10,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef1.current.rotation)
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

    //         new TWEEN.Tween(houseRef1.current.position)
    //           .to(
    //             {
    //               x: 0,
    //               y: 0,
    //               z: 0,
    //             },
    //             1000
    //           )
    //           .start();

    //         new TWEEN.Tween(houseRef1.current.rotation)
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
      // child.material.wireframe = true;
      // child.material.color = new Color("#fff");
      // child.material.transparent = true;
      // child.material.opacity = 0.1;
      // const solid = new THREE.Mesh(child.geometry, child.material);
      // solid.scale.set(1 / 10, 1 / 10, 1 / 10);
      // houseGroup.add(solid);

      const line = new THREE.LineSegments(
        child.geometry,
        new THREE.LineBasicMaterial({
          // color: 0xffffff,
          transparent: true,
          opacity: 0.1,
        })
      );
      line.scale.set(1 / 20, 1 / 20, 1 / 20);
      // line.position.set(
      //         -(line.geometry.boundingBox.max.x + line.geometry.boundingBox.min.x)/(2 * scaleFactor),
      //         0,
      //         -(line.geometry.boundingBox.max.z + line.geometry.boundingBox.min.z)/(2 * scaleFactor),
      //     )
      // line.material = new THREE.MeshStandardMaterial({color: 0x000000})
      houseGroup.add(line);

      // // child.material.wireframe = true;
      // child.material.color = new Color("#fff");
      // child.material.transparent = true;
      // child.material.opacity = 0.1;
      // console.log(child.material);
      // // const solid = new THREE.Mesh(child.geometry, child.material);
      // // solid.scale.set(1 / 10, 1 / 10, 1 / 10);

      // const solid = (
      //   <mesh scale={0.1}>
      //     <bufferGeometry {...child.geometry} />
      //     <meshStandardMaterial {...child.material} wireframe />
      //   </mesh>
      // );
      // // houseGroup.add(solid);
      // gltf.scene.add(solid);
    }

    gltf.scene.add(houseGroup);

    return () => {
      //   observer.unobserve(introSection);
      //   observerOnUp.unobserve(introSection);
    };
  }, []);

  return <primitive ref={houseRef1} object={gltf.scene} />;
};

const HouseWireframe3D = () => {
  return (
    <Suspense fallback={<Loader />}>
      {/* <Canvas
          // className={`house ${wireframe ? "wireframe-house" : "solid-house"}`}
          className="house solid-house"
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [-100, 100, 100],
          }}
        >
          <ambientLight color={0xffffff} />
          <pointLight position={[10, 10, 10]} />
          <House />
          {wireframe ? <HouseWireframe /> : <House />}
          <OrbitControls />
        </Canvas>
      ) : ( */}
      <Canvas
        className="house wireframe-house"
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [-100, 100, 100],
        }}
      >
        <ambientLight color={0xffffff} intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        {/* <HouseWireframe /> */}
        <WireframeModel />
        <OrbitControls />
      </Canvas>
      {/* )} */}
    </Suspense>
  );
};

export default HouseWireframe3D;
