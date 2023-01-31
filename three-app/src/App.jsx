import React from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier';
import { Lights } from './components/Lights';
import { Level } from './components/Level';
import { Player } from './components/Player';

export default function App() {
  return (
    <Canvas shadows camera={{ fov: 45 }}>
      <Physics gravity={[0, 0, 0]}>
        <Lights />
        <Level />
        <Player />
        <Debug />
      </Physics>
    </Canvas>
  );
}
