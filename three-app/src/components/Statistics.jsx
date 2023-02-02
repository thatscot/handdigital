import { useEffect } from "react";
import { useElapsedTime } from "use-elapsed-time";
import { useGameContext } from "../hooks";
import { GAME_STATE } from "../utils/constants";

const Statistics = () => {
  const { gameState, initialiseTimer } = useGameContext();

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: gameState === GAME_STATE.STARTED,
  });

  useEffect(() => {
    console.log({ reset });
    initialiseTimer(reset);
  }, [reset]);

  return (
    <div className="game-stats">
      <div className="time"> {elapsedTime.toFixed(1)} </div>
    </div>
  );
};

export { Statistics };
