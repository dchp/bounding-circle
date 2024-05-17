import { Circle, DefaultCircle } from "../types/Circle";
import { Point } from "../types/Point";

/*
 * Compute smallest bounding circle by Welzl's algorithm.
 */
export function getBoundingCircle(
  unprocessedPoints: Point[],
  boundaryPoints: Point[] = []
): Circle {
  if (unprocessedPoints.length === 0 || boundaryPoints.length === 3) {
    return getTrivialCircle(boundaryPoints);
  }

  const selectedPoint = unprocessedPoints[unprocessedPoints.length - 1];
  unprocessedPoints = unprocessedPoints.slice(0, -1);

  const circle = getBoundingCircle(unprocessedPoints, boundaryPoints);

  if (isPointInCircle(selectedPoint, circle)) {
    return circle;
  }

  return getBoundingCircle(unprocessedPoints, [
    ...boundaryPoints,
    selectedPoint,
  ]);
}

function isPointInCircle(selectedPoint: Point, circle: Circle) {
  const distance = Math.sqrt(
    (selectedPoint.x - circle.center.x) ** 2 +
      (selectedPoint.y - circle.center.y) ** 2
  );
  return distance <= circle.radius;
}

function getTrivialCircle(points: Point[]): Circle {
  if (points.length <= 1 || points.length > 3) {
    return DefaultCircle;
  }

  const A = points[0];
  const B = points[1];
  if (points.length === 2) {
    const center: Point = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const radius = Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2) / 2;
    return { center, radius };
  }

  const C = points[2];
  const diametr =
    2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const center: Point = {
    x:
      ((A.x * A.x + A.y * A.y) * (B.y - C.y) +
        (B.x * B.x + B.y * B.y) * (C.y - A.y) +
        (C.x * C.x + C.y * C.y) * (A.y - B.y)) /
      diametr,
    y:
      ((A.x * A.x + A.y * A.y) * (C.x - B.x) +
        (B.x * B.x + B.y * B.y) * (A.x - C.x) +
        (C.x * C.x + C.y * C.y) * (B.x - A.x)) /
      diametr,
  };
  const radius = Math.sqrt((center.x - A.x) ** 2 + (center.y - A.y) ** 2);
  return { center, radius };
}
