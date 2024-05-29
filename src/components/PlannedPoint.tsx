import { Vector3 } from "three";
import { Line } from "@react-three/drei";
import DrawPoint from "./DrawPoint";

const PlannedPoint = ({ point }: { point: Vector3 }) => {
  const pointWithoutY = new Vector3(point.x, 0, point.z);
  const pointWithY =
    point.y >= 0 ? new Vector3(point.x, point.y, point.z) : undefined;

  return (
    <>
      {pointWithY && <DrawPoint point={point} color="black" />}
      <DrawPoint point={pointWithoutY} color={"gray"} />
      {pointWithY && (
        <Line
          points={[pointWithoutY, pointWithY]}
          color="gray"
          lineWidth={1}
          dashed
          dashSize={0.5}
          gapSize={0.5}
        />
      )}
    </>
  );
};

export default PlannedPoint;
