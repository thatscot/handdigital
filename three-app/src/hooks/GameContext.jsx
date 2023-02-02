import { createContext, useContext, useState } from "react";
import { GAME_STATE } from "../utils/constants";
import { useEffect } from "react";

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [gameState, setIsGameState] = useState(GAME_STATE.LOADED);
  const [timer, setTimer] = useState({});

  function initialiseTimer(newResetFn) {
    setTimer({ reset: newResetFn });
  }

  function startGame() {
    setIsGameState(GAME_STATE.STARTED);
  }

  function endGame() {
    setIsGameState(GAME_STATE.GAME_OVER);
  }

  function completeGame() {
    setIsGameState(GAME_STATE.COMPLETED);
  }

  function resetGame() {
    timer.reset(0);
    setIsGameState(GAME_STATE.LOADED);
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        endGame,
        completeGame,
        resetGame,
        initialiseTimer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
