import {
  AdditiveBlending,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from "three";

const DrawPoint = ({ point, color }: { point: Vector3; color: string }) => {
  return (
    <mesh
      geometry={new SphereGeometry(0.7, 14, 14)}
      material={
        new MeshBasicMaterial({
          color: color,
          blending: AdditiveBlending,
        })
      }
      position={point}
    />
  );
};

export default DrawPoint;
