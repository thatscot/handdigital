import React, { useRef, useState, useLayoutEffect } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import {
  useGLTF,
  Sky,
  useTexture,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider, Debug } from "@react-three/rapier";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  toggleKeyboardKey,
  useKeyboardControls,
} from "./hooks/useKeyboardControls";

import grass from "./assets/grass.png";

const Ground = (props) => {
  const texture = useTexture(grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[240, 240]}
          color="green"
        />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
};

const firstPersonCamera = new THREE.PerspectiveCamera(60, 1.2, 1, 1000);
const thirdPersonCamera = new THREE.PerspectiveCamera(60, 1.2, 1, 1000);

const Drone = (props) => {
  const gltf = useLoader(GLTFLoader, "/file-1592658408798.glb");
  const droneRef = useRef(null);

  const { moveBackward, moveForward, moveLeft, moveRight, moveUp, moveDown } =
    useKeyboardControls();

  const { changeCamera } = toggleKeyboardKey();

  useFrame((state, delta) => {
    droneRef.current.position.x += moveRight ? 0.2 : moveLeft ? -0.2 : 0;
    droneRef.current.position.z += moveForward ? -0.2 : moveBackward ? +0.2 : 0;
    droneRef.current.position.y += moveDown ? -0.2 : moveUp ? +0.2 : 0;

    // third person offset, to position behind and slightly above the drone
    thirdPersonCamera.position.x = droneRef.current.position.x; // left/right
    thirdPersonCamera.position.y = droneRef.current.position.y + 1.5; // up/down
    thirdPersonCamera.position.z = droneRef.current.position.z + 3; // forward/back

    // first person offset, to position behind and slightly above the drone
    firstPersonCamera.position.copy(droneRef.current.position); // forward/back

    if (changeCamera) {
      state.set({ camera: firstPersonCamera });
    } else {
      state.set({ camera: thirdPersonCamera });
    }
  });

  return (
    <>
      <group ref={droneRef}>
        <primitive {...props} object={gltf.scene} scale={1} />
      </group>
    </>
  );
};

export default function App() {
  return (
    <>
      <VRButton />
      <Canvas shadows camera={thirdPersonCamera}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <pointLight position={[10, 10, 10]} />
        <XR>
          <Physics>
            <Ground />
            <Debug />
            <Drone position={[0, 1, 0]} />
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

useGLTF.preload("/file-1592658408798.glb");
