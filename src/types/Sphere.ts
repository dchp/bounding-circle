import { Point } from "./Point";

export type Sphere = {
  center: Point;
  radius: number;
};

export type BoundingSphere = {
  sphere: Sphere;
  touchPoints: Point[];
};

export const DefaultSphere: Sphere = Object.freeze({
  center: { x: 0, y: 0, z: 0 },
  radius: 0,
});
