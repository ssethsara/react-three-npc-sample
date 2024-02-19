/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useMemo, useState } from "react";
import { Vector3 } from "three";
import { Manager } from "@ssethsara/react-three-npc";
import { NavMeshConvex } from "./NavMeshConvex";
import { NavMeshAgent } from "@ssethsara/react-three-npc";
import { Box } from "@react-three/drei";

const Enemy = ({ enemy }) => (
  <NavMeshAgent
    key={enemy.agentId}
    name={enemy.name}
    agentId={enemy.agentId}
    position={enemy.position}
    navPoints={enemy.navPoints}
    maxForce={enemy.maxForce}
    maxSpeed={enemy.maxSpeed}
    removed={enemy.removed}
    // isPlayerDetected={true}
  >
    <group position={[0, 1, 0]}>
      <Box scale={0.5} position={[0, 0, 0.5]}>
        <meshBasicMaterial color={"red"}></meshBasicMaterial>
      </Box>
      <Box>
        <meshBasicMaterial color={"blue"}></meshBasicMaterial>
      </Box>
    </group>
  </NavMeshAgent>
);

export default function Enemies() {
  const [enemies, setEnemies] = useState([
    {
      name: "Enemy",
      agentId: "e1",
      position: [10, 2, 20],
      navPoints: [
        new Vector3(10, 2, 10),
        new Vector3(50, 2, 60),
        new Vector3(90, 2, 30),
      ],
      maxForce: 20,
      maxSpeed: 5,
      color: "red",
      removed: false,
      blastVisible: false,
    },
    {
      name: "Enemy",
      agentId: "e2",
      position: [-10, 2, -10],
      navPoints: [
        new Vector3(-10, 2, -10),
        new Vector3(50, 2, 60),
        new Vector3(-30, 2, -60),
      ],
      maxForce: 10,
      maxSpeed: 5,
      color: "blue",
      removed: false,
      blastVisible: false,
    },
  ]);

  const enemiesMemo = useMemo(() => {
    return enemies;
  }, [enemies]);

  const enemiesList = enemiesMemo.map((enemy) => (
    <Enemy
      key={enemy.agentId}
      enemy={enemy}
      // onFireTriggers={onFireTriggers}
    />
  ));

  return (
    <>
      <Manager key="manager">
        {enemiesList}
        <group position={[0, 0, 0]} scale={1}>
          <NavMeshConvex visible={false} />
        </group>
      </Manager>
    </>
  );
}
