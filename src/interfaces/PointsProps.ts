import { Point } from "../types/Point";

interface pointsProps {
  points: Point[];
  setPoints: (points: Point[]) => void;
  contactPoints: Point[];
}

export default pointsProps;
