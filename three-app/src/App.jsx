import React, { useRef, useState, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr';
import { useGLTF, Sky, useTexture, OrbitControls } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider, Debug } from '@react-three/rapier';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import grass from './assets/grass.png';

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

const Drone = (props) => {
  const gltf = useLoader(GLTFLoader, '/file-1592658408798.glb');
  return (
    <>
      <primitive {...props} object={gltf.scene} scale={1} />
    </>
  );
};

export default function App() {
  return (
    <>
      <VRButton />
      <Canvas shadows camera={{ fov: 45 }}>
        <XR>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <Physics>
            <Ground />
            <Debug />
          </Physics>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Drone position={[1, 0, 3]} />
        </XR>
      </Canvas>
    </>
  );
}

useGLTF.preload('/file-1592658408798.glb');
