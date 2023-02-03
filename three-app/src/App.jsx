import React from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Lights } from "./components/Lights";
import { Level } from "./components/Level";
import { Player } from "./components/Player";
import { Statistics } from "./components/Statistics";
import { Interface } from "./components/Interface";
import { XR, VRButton } from "@react-three/xr";
import { GameProvider } from "./hooks";
export default function App() {
  return (
    <GameProvider>
      <VRButton />
      <Canvas shadows camera={{ fov: 45 }}>
        <XR>
          <Physics gravity={[0, 0, 0]}>
            <Lights />
            <Level />
            <Player />
          </Physics>
        </XR>
      </Canvas>
      <Interface />
      <Statistics />
    </GameProvider>
  );
}
