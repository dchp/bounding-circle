import { OriginPoint, Point } from "./Point";

export type Circle = {
  center: Point;
  radius: number;
};

export const DefaultCircle: Circle = Object.freeze({
  center: OriginPoint,
  radius: 0,
});
