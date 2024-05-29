import { Dispatch, SetStateAction, useState } from "react";
import { Euler, Vector3 } from "three";
import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Grid = ({
  plannedPoint,
  setPlannedPoint,
  showHelp,
  size,
}: {
  plannedPoint: Vector3 | undefined;
  setPlannedPoint: Dispatch<SetStateAction<Vector3 | undefined>>;
  showHelp: boolean;
  size: number;
}) => {
  const { gl } = useThree();
  const [visibleGrid, setVisibleGrid] = useState(false);

  return (
    <Plane
      args={[size, size]}
      position={new Vector3(0, -size / 2, 0)}
      rotation={new Euler(-Math.PI / 2, 0, 0)}
      onPointerOver={(event) => {
        event.stopPropagation();
        if (plannedPoint && plannedPoint.y >= 0) {
          gl.domElement.style.cursor = "ns-resize";
          return;
        }
        gl.domElement.style.cursor = "pointer";
        setVisibleGrid(true);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        if (plannedPoint && plannedPoint.y > 0) {
          return;
        }
        gl.domElement.style.cursor = "ns-resize";
        setPlannedPoint(
          new Vector3(Math.round(event.point.x), 0, Math.round(event.point.z))
        );
        setVisibleGrid(false);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setVisibleGrid(false);
        if (plannedPoint && plannedPoint.y < 0) {
          setPlannedPoint(undefined);
        }
        gl.domElement.style.cursor = "default";
      }}
      onPointerMove={(event) => {
        event.stopPropagation();
        if (plannedPoint && plannedPoint.y >= 0) {
          return;
        }
        setPlannedPoint(
          new Vector3(Math.round(event.point.x), -1, Math.round(event.point.z))
        );
      }}
    >
      <meshBasicMaterial
        attach="material"
        transparent
        color={showHelp ? "lightgray" : "transparent"}
        opacity={showHelp && !visibleGrid && !plannedPoint ? 100 : 0}
      />
      {visibleGrid && (
        <gridHelper
          args={[size, 10, "#D3D3D3", "#D3D3D3"]}
          rotation={new Euler(Math.PI / 2, 0, 0)}
        />
      )}
    </Plane>
  );
};

export default Grid;
