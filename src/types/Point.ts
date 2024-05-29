export type Point = {
  x: number;
  y: number;
  z: number;
};

export const OriginPoint: Point = Object.freeze({ x: 0, y: 0, z: 0 });

export function pointToString(point: Point): string {
  return `(${Math.round(point.x)}, ${Math.round(point.z)}, ${Math.round(
    point.y
  )})`;
}

export function divideVectorByScalar(vector: Point, scalar: number): Point {
  return {
    x: vector.x / scalar,
    y: vector.y / scalar,
    z: vector.z / scalar,
  };
}

export function multiplyVectorByScalar(vector: Point, scalar: number): Point {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar,
  };
}

export function sqrMagnitude(vector: Point): number {
  return vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
}

export function add(v1: Point, v2: Point) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z,
  };
}

export function dot(a: Point, b: Point) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function magnitude(vector: Point) {
  return Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
  );
}

export function subtractPoints(p1: Point, p2: Point): Point {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
    z: p1.z - p2.z,
  };
}

export function cross(a: Point, b: Point): Point {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function center(a: Point, b: Point): Point {
  return {
    x: (a.x + b.x) * 0.5,
    y: (a.y + b.y) * 0.5,
    z: (a.z + b.z) * 0.5,
  };
}
