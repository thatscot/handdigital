import { createContext, useContext, useState } from "react";

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [lifeCount, setLifeCount] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  function startGame() {
    setIsGameStarted(true);
  };

  function completeGame() {
    setIsGameCompleted(true);
  };

  function resetGame() {
    setLifeCount(3);
    setIsGameOver(false);
    setIsGameStarted(false);
    setIsGameCompleted(false);
  };

  function deductLife() {
    setLifeCount((prevCount) => {
      if (prevCount === 0) {
        setIsGameOver(true);
        return 0;
      }
      return prevCount - 1;
    });
  };

  return (
    <GameContext.Provider
      value={{ lifeCount, deductLife, isGameOver, resetGame, isGameStarted, startGame, isGameCompleted, completeGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
