export type Point = {
  x: number;
  y: number;
};

export const OriginPoint: Point = Object.freeze({ x: 0, y: 0 });

export function pointToString(point: Point): string {
  return `(${Math.round(point.x)}, ${Math.round(point.y)})`;
}
