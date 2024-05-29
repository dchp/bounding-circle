import { Sphere, BoundingSphere, DefaultSphere } from "../types/Sphere";
import { OriginPoint, Point } from "../types/Point";
import * as _ from "../types/Point";

const RadiusEpsilon = 1.00001;

export function getBoundingSphere(points: Point[]): BoundingSphere {
  const boundingSphere = {
    sphere: { center: OriginPoint, radius: 0 } as Sphere,
    touchPoints: [],
  } as BoundingSphere;

  calculateWelzl([...points], points.length, 0, boundingSphere);

  return boundingSphere;
}

/*
 * Welzl's algorithm
 * https://en.wikipedia.org/wiki/Bounding_sphere
 * https://unitycoder.com/blog/2013/01/15/bounding-sphere-for-3d-points/
 */
function calculateWelzl(
  points: Point[],
  length: number,
  index: number,
  boundingSphere: BoundingSphere
) {
  switch (index) {
    case 0:
    case 1:
      boundingSphere.sphere = DefaultSphere;
      break;
    case 2:
      setBoundingSphereFor2Points(
        points[index - 1],
        points[index - 2],
        boundingSphere
      );
      break;
    case 3:
      setBoundingSphereFor3Points(
        points[index - 1],
        points[index - 2],
        points[index - 3],
        boundingSphere
      );
      break;
    // TODO: case 4
  }
  boundingSphere.touchPoints = getTouchPoints(points, index);

  for (let i = 0; i < length; i++) {
    const comp = points[i + index];
    const distSqr = _.sqrMagnitude(
      _.subtractPoints(comp, boundingSphere.sphere.center)
    );

    if (distSqr - boundingSphere.sphere.radius ** 2 > RadiusEpsilon - 1) {
      for (let j = i; j > 0; j--) {
        const a = points[j + index];
        const b = points[j - 1 + index];
        points[j + index] = b;
        points[j - 1 + index] = a;
      }
      calculateWelzl(points, i, index + 1, boundingSphere);
    }
  }
}

function setBoundingSphereFor2Points(
  O: Point,
  A: Point,
  boundingSphere: BoundingSphere
) {
  const radius =
    Math.sqrt(((A.x - O.x) ** 2 + (A.y - O.y) ** 2 + (A.z - O.z) ** 2) / 4) +
    RadiusEpsilon -
    1;

  boundingSphere.sphere = {
    center: _.center(O, A),
    radius: radius,
  };
}

function setBoundingSphereFor3Points(
  O: Point,
  A: Point,
  B: Point,
  boundingSphere: BoundingSphere
) {
  const a = _.subtractPoints(A, O);
  const b = _.subtractPoints(B, O);
  const aCrossB = _.cross(a, b);
  const denom = 2 * _.dot(aCrossB, aCrossB);
  if (denom === 0) {
    return;
  }

  const o = _.divideVectorByScalar(
    _.add(
      _.multiplyVectorByScalar(_.cross(aCrossB, a), _.sqrMagnitude(b)),
      _.multiplyVectorByScalar(_.cross(b, aCrossB), _.sqrMagnitude(a))
    ),
    denom
  );
  boundingSphere.sphere.radius = _.magnitude(o) * RadiusEpsilon;
  boundingSphere.sphere.center = _.add(O, o);
}

function getTouchPoints(points: Point[], index: number): Point[] {
  if (index < 2) {
    return [];
  }

  const touchPoints = [points[index - 1], points[index - 2]];

  if (index >= 3) {
    touchPoints.push(points[index - 3]);
  }

  return touchPoints;
}
