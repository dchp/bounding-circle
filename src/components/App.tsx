import { useEffect, useState } from "react";
import { Point } from "../types/Point";
import PointList from "./PointList";
import DrawBoard from "./DrawBoard";
import { DefaultCircle } from "../types/Circle";
import { getBoundingCircle } from "../utils/geometry";

const App = () => {
  const [points, setPoints] = useState([] as Point[]);
  const [boundingCircle, setBoundingCircle] = useState(DefaultCircle);
  const [hoveredPointIndex, setHoveredPointIndex] = useState(-1);
  useEffect(() => setBoundingCircle(getBoundingCircle(points)), [points]);

  return (
    <div id="mainContent">
      <h1>Bounding circle</h1>
      <DrawBoard
        points={points}
        setPoints={setPoints}
        hoveredPointIndex={hoveredPointIndex}
        setHoveredPointIndex={setHoveredPointIndex}
        boundingCircle={boundingCircle}
      />
      <PointList
        points={points}
        setPoints={setPoints}
        hoveredPointIndex={hoveredPointIndex}
        setHoveredPointIndex={setHoveredPointIndex}
      />
    </div>
  );
};

export default App;
