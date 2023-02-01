import { createContext, useContext, useState } from "react";
import { GAME_STATE } from "../utils/constants";

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [lifeCount, setLifeCount] = useState(3);
  const [gameState, setIsGameState] = useState(GAME_STATE.LOADED);
  const [resetTimer, setIsResetTimer] = useState();


  function initialiseTimer(timer) {
    setIsResetTimer(timer);
  }

  function startGame() {
    setIsGameState(GAME_STATE.STARTED);
  };

  function endGame() {
    setIsGameState(GAME_STATE.GAME_OVER);
  };

  function completeGame() {
    setIsGameState(GAME_STATE.COMPLETED);

  };

  function resetGame() {
    setLifeCount(3);
    resetTimer?.();
    setIsGameState(GAME_STATE.LOADED);
  };

  function deductLife() {
    setLifeCount((prevCount) => {
      if (prevCount === 0) {
        endGame();
        return 0;
      }
      return prevCount - 1;
    });
  };

  return (
    <GameContext.Provider
      value={{ lifeCount, deductLife, gameState, startGame, endGame, completeGame, resetGame, initialiseTimer }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
