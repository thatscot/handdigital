import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/rapier";
import { Lights } from "./components/Lights";
import { Level } from "./components/Level";
import { Player } from "./components/Player";
import { GameProvider } from "./hooks";
import { Statistics } from "./components/Statistics";
import { Interface } from "./components/Interface";

export default function App() {
  return (
    <GameProvider>
      <Canvas shadows camera={{ fov: 45 }}>
        <Physics gravity={[0, 0, 0]}>
          <Lights />
          <Level />
          <Player />
          <Debug />
        </Physics>
      </Canvas>
      <Interface />
      <Statistics />
    </GameProvider>
  );
}
