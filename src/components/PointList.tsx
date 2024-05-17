import HoveredPointIndexProps from "../interfaces/HoveredPointIndexProps";
import PointsProps from "../interfaces/PointsProps";

const PointList = ({
  points,
  setPoints,
  hoveredPointIndex,
  setHoveredPointIndex,
}: PointsProps & HoveredPointIndexProps) => {
  return (
    <div className="pointList">
      {points.map((point, index) => (
        <div
          className={`point ${hoveredPointIndex === index ? "hovered" : ""}`}
          key={index}
          onClick={() => {
            setPoints(points.filter((_, i) => i !== index));
          }}
          onMouseEnter={() => {
            setHoveredPointIndex(index);
          }}
          onMouseLeave={() => {
            setHoveredPointIndex(-1);
          }}
          title="Remove point"
        >
          ({point.x}, {point.y})
        </div>
      ))}
    </div>
  );
};

export default PointList;
