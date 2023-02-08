import { useGameContext } from '../hooks';

const Statistics = () => {
  const { elapsedTime, bestTime } = useGameContext();

  return (
    <div className="game-stats">
      {bestTime && (
        <div className="time bestTime"> 👑 {bestTime.toFixed(1)} </div>
      )}
      <div className="time elapsedTime"> {elapsedTime.toFixed(1)} </div>
    </div>
  );
};

export { Statistics };
