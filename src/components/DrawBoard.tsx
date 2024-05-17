import { useEffect, useState } from "react";
import { Point, pointToString } from "../types/Point";
import { Circle } from "../types/Circle";
import ClearAllPointsButton from "./ClearAllPointsButton";
import PointsProps from "../interfaces/PointsProps";
import HoveredPointIndexProps from "../interfaces/HoveredPointIndexProps";

const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 500;
const POINT_RADIUS = 4;
const LEFT_MOUSE_BUTTON = 0;
const RIGHT_MOUSE_BUTTON = 2;

interface BoardProps {
  boundingCircle: Circle | undefined;
}

const DrawBoard = ({
  points,
  setPoints,
  boundingCircle,
  hoveredPointIndex,
  setHoveredPointIndex,
}: PointsProps & BoardProps & HoveredPointIndexProps) => {
  const [selectedPointIndex, setSelectedPointIndex] = useState(-1);
  useEffect(() => {}, [points]);

  return (
    <>
      {points.length < 2 ? (
        <div>Create at least two points by click to blank area:</div>
      ) : (
        boundingCircle && (
          <div>
            Circle has center point {pointToString(boundingCircle.center)} and
            radius {Math.round(boundingCircle.radius)}.
          </div>
        )
      )}

      <div id="drawBoard">
        <svg
          className={hoveredPointIndex > -1 ? "movingByPoint" : ""}
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={(event) => {
            const nearestPoint = getNeareastPoint(event);

            switch (event.button) {
              case LEFT_MOUSE_BUTTON:
                if (nearestPoint) {
                  setSelectedPointIndex(
                    points.findIndex(
                      (p) => p.x === nearestPoint.x && p.y === nearestPoint.y
                    )
                  );
                  return;
                }

                setPoints([...points, getPoint(event)]);
                setSelectedPointIndex(points.length);
                return;
              case RIGHT_MOUSE_BUTTON:
                if (nearestPoint) {
                  setPoints(
                    points.filter(
                      (p) => !(p.x === nearestPoint.x && p.y === nearestPoint.y)
                    )
                  );
                }
                return;
            }
          }}
          onMouseUp={() => {
            setSelectedPointIndex(-1);
          }}
          onContextMenu={(event) => {
            event.preventDefault();
          }}
          onMouseMove={(event) => {
            if (selectedPointIndex !== -1) {
              setPoints(
                points.map((point, index) =>
                  index === selectedPointIndex ? getPoint(event) : point
                )
              );
            }
          }}
        >
          {boundingCircle && (
            <circle
              id="circumscribedCircle"
              cx={boundingCircle.center.x}
              cy={boundingCircle.center.y}
              r={boundingCircle.radius}
            />
          )}

          {points.map((point, index) => (
            <circle
              cx={point.x}
              cy={point.y}
              r={`${POINT_RADIUS}`}
              fill="gray"
              key={index}
              className={`point ${
                selectedPointIndex === index
                  ? "selected"
                  : hoveredPointIndex === index
                  ? "hovered"
                  : ""
              }`}
              onMouseEnter={() => {
                setHoveredPointIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredPointIndex(-1);
              }}
            />
          ))}
        </svg>

        <ClearAllPointsButton
          pointsLength={points.length}
          clearAllPoints={() => setPoints([])}
        />
      </div>
    </>
  );

  function getPoint(event: React.MouseEvent<SVGElement>): Point {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    return {
      x: Math.round(event.clientX - rect.left),
      y: Math.round(event.clientY - rect.top),
    };
  }

  function getNeareastPoint(
    event: React.MouseEvent<SVGElement>
  ): Point | undefined {
    const clikcPoint = getPoint(event);
    return points.find(
      (point) =>
        Math.abs(clikcPoint.x - point.x) <= POINT_RADIUS &&
        Math.abs(clikcPoint.y - point.y) <= POINT_RADIUS
    );
  }
};

export default DrawBoard;
