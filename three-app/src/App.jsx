import React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Sky, useTexture, OrbitControls } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Cube } from './components/Cube';

import grass from './assets/grass.png';

const Ground = () => {
  const texture = useTexture(grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <RigidBody colliders='cuboid'>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[240, 240]}
          color="green"
        />
      </mesh>
    </RigidBody>
  );
};

export default function App() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics>
        <Cube />
        <Ground />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
};