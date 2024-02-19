/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useNavMesh } from "@ssethsara/react-three-npc";

import Scene from "./Scene";
import { Suspense } from "react";

function App() {
  const actions = useNavMesh((state) => state.actions);

  return (
    <>
      <Canvas
        onCreated={() => {
          actions.loadNavMesh("./models/navmesh.glb");
        }}
      >
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
