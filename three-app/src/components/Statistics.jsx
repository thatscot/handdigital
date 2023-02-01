import { useEffect } from 'react';
import { useElapsedTime } from 'use-elapsed-time';
import { useGameContext } from "../hooks";
import { GAME_STATE } from "../utils/constants";

const Statistics = () => {
  const { lifeCount, gameState, initialiseTimer } = useGameContext();

  const { elapsedTime, reset } = useElapsedTime({ isPlaying: gameState === GAME_STATE.STARTED });

  useEffect(() => {
    initialiseTimer(() => reset(0));
  }, []);

  return (
    <div className="game-stats">
      <div className="time"> {elapsedTime.toFixed(1)} </div>
      {Array.from({ length: lifeCount }).map(() => (
        <span className="heart-symbol">❤️</span>
      ))}
    </div>
  );
};

export { Statistics };
