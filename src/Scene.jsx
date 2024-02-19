/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import "./App.css";
import {
  Environment,
  KeyboardControls,
  OrbitControls,
} from "@react-three/drei";
import { Ground } from "./components/Ground";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { Ninja } from "./components/Ninja";
import Enemies from "./components/Enemies";
import { Suspense, useEffect, useRef } from "react";
import { Vector3 } from "yuka";
import { useNavMesh } from "@ssethsara/react-three-npc";

export default function Scene() {
  const controllerRigidBody = useRef();
  const actions = useNavMesh((state) => state.actions);
  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  // Prepare character model url
  const characterURL = "./characters/Ninja.glb";

  const animationSet = {
    idle: "Idle",
    walk: "Walk",
    run: "Run",
    jump: "Jump",
    jumpIdle: "Jump_Idle",
    jumpLand: "Jump_Land",
    fall: "Jump_Idle", // This is for falling from high sky
    action1: "Wave",
    action2: "Punch",
    action3: "HitReact",
    action4: "Weapon",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const playerPosition = controllerRigidBody.current.translation();
      //Optimize this
      actions.setPosition(
        new Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ambientLight intensity={5} />
      <Environment files={"./hdri/animestyle.hdr"} background={true} />
      <OrbitControls />
      <Physics debug>
        <Enemies />
        <Suspense>
          <KeyboardControls map={keyboardMap}>
            {/* Character Control */}
            <Ecctrl
              ref={controllerRigidBody}
              name={"Player"}
              animated
              floatHeight={0.1}
              jumpVel={5.76}
            >
              <EcctrlAnimation
                characterURL={characterURL} // Must have property
                animationSet={animationSet} // Must have property
              >
                <Ninja scale={0.5} position-y={-0.7} />
              </EcctrlAnimation>
            </Ecctrl>
          </KeyboardControls>
          <RigidBody type="fixed" colliders="trimesh">
            <Ground />
          </RigidBody>
        </Suspense>
      </Physics>
    </>
  );
}
