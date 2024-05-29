interface ClearAllPointsButtonProps {
  pointsLength: number;
  clearAllPoints: () => void;
}

const ClearAllPointsButton = ({
  pointsLength,
  clearAllPoints,
}: ClearAllPointsButtonProps) => {
  return (
    <button
      id="clearAllPointsButton"
      onClick={() => {
        clearAllPoints();
      }}
      disabled={pointsLength === 0}
    >
      Clear all points
    </button>
  );
};

export default ClearAllPointsButton;
