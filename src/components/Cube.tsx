import { Dispatch, SetStateAction } from "react";
import { BoxGeometry, Vector3 } from "three";
import type { Point } from "../types/Point";
import { useThree } from "@react-three/fiber";
import PlannedPoint from "./PlannedPoint";
import Grid from "./Grid";
import DrawPoint from "./DrawPoint";

const CUBE_SIZE = 45;

const Cube = ({
  points,
  contactPoints,
  hoveredPointIndex,
  plannedPoint,
  setPlannedPoint,
  setPoints,
}: {
  plannedPoint: Vector3 | undefined;
  points: Point[];
  contactPoints: Point[];
  hoveredPointIndex: number;
  setPlannedPoint: Dispatch<SetStateAction<Vector3 | undefined>>;
  setPoints: (points: Point[]) => void;
}) => {
  const { gl } = useThree();
  return (
    <>
      {plannedPoint && <PlannedPoint point={plannedPoint} />}
      {points.map((point, index) => (
        <DrawPoint
          key={index}
          point={new Vector3(point.x, point.y, point.z)}
          color={
            index === hoveredPointIndex
              ? "black"
              : contactPoints.some(
                  (p) => p.x === point.x && p.y === point.y && p.z === point.z
                )
              ? "red"
              : "blue"
          }
        />
      ))}

      <mesh
        onPointerMove={(event) => {
          if (!plannedPoint || plannedPoint.y < 0) {
            return;
          }
          gl.domElement.style.cursor = "ns-resize";
          setPlannedPoint(
            new Vector3(plannedPoint.x, event.point.y, plannedPoint.z)
          );
        }}
        onPointerDown={(event) => {
          if (!plannedPoint || plannedPoint.y < 0) {
            return;
          }

          gl.domElement.style.cursor = "pointer";
          setPoints([
            ...points,
            new Vector3(
              plannedPoint.x,
              Math.round(event.point.y),
              plannedPoint.z
            ),
          ]);
          setPlannedPoint(undefined);
        }}
        onPointerOut={() => {
          gl.domElement.style.cursor = "default";
        }}
        geometry={new BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE)}
        position={[CUBE_SIZE / 2, CUBE_SIZE / 2, CUBE_SIZE / 2]}
      >
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        <meshBasicMaterial opacity={0} wireframe />
        <Grid
          setPlannedPoint={setPlannedPoint}
          plannedPoint={plannedPoint}
          showHelp={points.length < 1}
          size={CUBE_SIZE}
        />
      </mesh>
    </>
  );
};

export default Cube;
