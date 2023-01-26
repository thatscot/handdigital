import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Level } from './components/Level';
import Lights from './components/Lights';

export default function App() {
  return (
    <Canvas shadows camera={{ fov: 45 }}>
      <Physics>
        <Lights />
        <Level />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
};