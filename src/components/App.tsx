import { useEffect, useState } from "react";
import PointList from "./PointList";
import DrawBoard from "./DrawBoard";
import { getBoundingSphere } from "../utils/geometry";
import { DefaultSphere, type BoundingSphere } from "../types/Sphere";
import { pointToString, type Point } from "../types/Point";

const App = () => {
  const [points, setPoints] = useState([] as Point[]);
  const [boundingSphere, setBoundingSphere] = useState(
    undefined as BoundingSphere | undefined
  );
  const [hoveredPointIndex, setHoveredPointIndex] = useState(-1);
  useEffect(() => {
    setBoundingSphere(getBoundingSphere(points));
  }, [points]);

  return (
    <div id="mainContent">
      <h1>Bounding sphere</h1>
      <HelpMessage points={points} boundingSphere={boundingSphere} />
      <DrawBoard
        points={points}
        hoveredPointIndex={hoveredPointIndex}
        setPoints={setPoints}
        boundingSphere={boundingSphere}
      />
      <PointList
        points={points}
        setPoints={setPoints}
        contactPoints={boundingSphere?.touchPoints || []}
        hoveredPointIndex={hoveredPointIndex}
        setHoveredPointIndex={setHoveredPointIndex}
      />
    </div>
  );
};

const HelpMessage = ({
  points,
  boundingSphere,
}: {
  points: Point[];
  boundingSphere: BoundingSphere | undefined;
}) => (
  <>
    {boundingSphere && boundingSphere.sphere !== DefaultSphere && (
      <p>
        Sphere has center point {pointToString(boundingSphere.sphere.center)}{" "}
        and radius {Math.round(boundingSphere.sphere.radius)}.
      </p>
    )}
    {points.length < 2 && (
      <p>Create at least two points. Start by click to bottom plane.</p>
    )}
  </>
);

export default App;
