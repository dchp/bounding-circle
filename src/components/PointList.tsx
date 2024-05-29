import HoveredPointIndexProps from "../interfaces/HoveredPointIndexProps";
import { pointToString } from "../types/Point";
import PointProps from "../interfaces/PointProps";
import PointsProps from "../interfaces/PointsProps";
const PointList = ({
  points,
  setPoints,
  hoveredPointIndex,
  setHoveredPointIndex,
}: PointsProps & HoveredPointIndexProps) => {
  return (
    <div className="pointList">
      {[...points].map((point, index) => (
        <Point
          point={point}
          key={index}
          index={index}
          removePoint={() => {
            setPoints(points.filter((_, i) => i !== index));
          }}
          hoveredPointIndex={hoveredPointIndex}
          setHoveredPointIndex={setHoveredPointIndex}
        />
      ))}
    </div>
  );
};

const Point = ({
  point,
  index,
  removePoint,
  hoveredPointIndex,
  setHoveredPointIndex,
}: PointProps & HoveredPointIndexProps) => {
  return (
    <div
      className={`point ${hoveredPointIndex === index ? "hovered" : ""}`}
      key={index}
      onClick={() => {
        removePoint();
      }}
      onMouseEnter={() => {
        setHoveredPointIndex(index);
      }}
      onMouseLeave={() => {
        setHoveredPointIndex(-1);
      }}
      title="Remove point"
    >
      {pointToString(point)}
    </div>
  );
};

export default PointList;
