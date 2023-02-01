import { createContext, useContext, useState } from "react";

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [lifeCount, setLifeCount] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);

  function resetGame() {
    setLifeCount(3);
    setIsGameOver(false);
  }

  function deductLife() {
    setLifeCount((prevCount) => {
      if (prevCount === 0) {
        setIsGameOver(true);
        return 0;
      }
      return prevCount - 1;
    });
  }

  return (
    <GameContext.Provider
      value={{ deductLife, lifeCount, isGameOver, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
