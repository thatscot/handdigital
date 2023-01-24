import React, { useRef, useState, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

function Drone(props) {
  const gltf = useLoader(GLTFLoader, '/file-1592658408798.glb');
  return (
    <>
      <primitive {...props} object={gltf.scene} scale={1} />
    </>
  );
}

function Box(props) {
  const mesh = useRef(null);
  return (
    <mesh {...props} ref={mesh} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}

export default function App() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Drone position={[1, 0, 3]} />
          <Box position={[5, 0, 0]} />
          <Box position={[10, 0, 0]} />
        </XR>
      </Canvas>
    </>
  );
}

useGLTF.preload('/file-1592658408798.glb');
