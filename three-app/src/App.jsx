import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import {
  Interface,
  Statistics,
  Player,
  Level,
  Lights,
  LinkGeneration,
} from "./components";
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
      <LinkGeneration />
    </GameProvider>
  );
}
