import { useGameContext } from '../hooks';

const Statistics = () => {
  const { elapsedTime, bestTime } = useGameContext();

  return (
    <div className="game-stats">
      {bestTime && <div className="time bestTime"> 👑 {bestTime} </div>}
      <div className="time elapsedTime"> {elapsedTime} </div>
    </div>
  );
};

export { Statistics };
