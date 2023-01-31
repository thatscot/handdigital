import { useGameContext } from "../hooks";

const Statistics = () => {
  const { lifeCount } = useGameContext();
  return (
    <div className="game-stats">
      {Array.from({ length: lifeCount }).map(() => (
        <span className="heart-symbol">❤️</span>
      ))}
    </div>
  );
};

export { Statistics };
