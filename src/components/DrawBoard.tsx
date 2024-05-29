import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import type { BoundingSphere, Sphere } from "../types/Sphere";
import type { Point } from "../types/Point";
import ClearAllPointsButton from "./ClearAllPointsButton";
import Cube from "./Cube";

interface DrawBoardProps {
  boundingSphere: BoundingSphere | undefined;
  points: Point[];
  setPoints: (points: Point[]) => void;
  hoveredPointIndex: number;
}

const DrawBoard = ({
  boundingSphere,
  points,
  setPoints,
  hoveredPointIndex,
}: DrawBoardProps) => {
  const [plannedPoint, setPlannedPoint] = useState(
    undefined as Vector3 | undefined
  );
  return (
    <div id="drawBoard">
      <Canvas
        camera={{
          position: [100, 20, 70],
          fov: 50,
        }}
      >
        <Cube
          points={points}
          contactPoints={boundingSphere?.touchPoints || []}
          hoveredPointIndex={hoveredPointIndex}
          setPoints={setPoints}
          setPlannedPoint={setPlannedPoint}
          plannedPoint={plannedPoint}
        />
        {boundingSphere && <SphereDraw sphere={boundingSphere.sphere} />}
        <OrbitControls />
      </Canvas>

      <ClearAllPointsButton
        pointsLength={points.length}
        clearAllPoints={() => {
          setPoints([]);
          setPlannedPoint(undefined);
        }}
      />
    </div>
  );
};

const SphereDraw = ({ sphere }: { sphere: Sphere }) => (
  <mesh position={[sphere.center.x, sphere.center.y, sphere.center.z]}>
    <sphereGeometry args={[sphere.radius, 12, 12]} />
    <meshBasicMaterial wireframe />
  </mesh>
);

export default DrawBoard;
