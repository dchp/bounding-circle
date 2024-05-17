import { useEffect, useRef, useState } from "react";

interface ClearAllPointsButtonProps {
  pointsLength: number;
  clearAllPoints: () => void;
}

const ClearAllPointsButton = ({
  pointsLength,
  clearAllPoints,
}: ClearAllPointsButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef(null);
  const [lastRemovedPointsCount, setLastRemovedPointsCount] = useState(0);

  useEffect(() => {
    const handleClickOutsideDialog = (event: MouseEvent) => {
      if (
        showDialog &&
        dialogRef.current &&
        !(dialogRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowDialog(false);
        document.body.classList.remove("modalOpened");
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDialog);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDialog);
    };
  }, [showDialog]);

  return (
    <>
      <button
        id="clearAllPointsButton"
        onClick={() => {
          setLastRemovedPointsCount(pointsLength);
          setShowDialog(true);
          document.body.classList.add("modalOpened");
          clearAllPoints();
        }}
        disabled={pointsLength === 0}
      >
        Clear all points
      </button>

      {showDialog && (
        <div ref={dialogRef} id="infoDialog">
          All {lastRemovedPointsCount} points was removed.
        </div>
      )}
    </>
  );
};

export default ClearAllPointsButton;
