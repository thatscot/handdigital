import React from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, OrbitControls } from '@react-three/drei';
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
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['KeyW'] },
            { name: 'back', keys: ['KeyS'] },
            { name: 'left', keys: ['KeyA'] },
            { name: 'right', keys: ['KeyD'] },
            { name: 'up', keys: ['ArrowUp'] },
            { name: 'down', keys: ['ArrowDown'] },
          ]}
        >
          <Player />
        </KeyboardControls>
        <OrbitControls useDefault/>
        <Debug />
      </Physics>
    </Canvas>
  );
}
