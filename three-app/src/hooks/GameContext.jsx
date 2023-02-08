import { createContext, useContext, useState } from "react";
import { GAME_STATE } from "../utils/constants";
import { useElapsedTime } from "./useElapsedTime";
import { emitTime } from "../utils/sockets";
const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [gameState, setIsGameState] = useState(GAME_STATE.LOADED);
  const [bestTime, setBestTime] = useState();

  const { elapsedTime, reset, start, stop } = useElapsedTime();

  function startGame() {
    start();
    setIsGameState(GAME_STATE.STARTED);
  }

  function completeGame() {
    stop();
    setIsGameState(GAME_STATE.COMPLETED);
  }

  function resetGame() {
    if (gameState === GAME_STATE.COMPLETED) {
      emitTime(elapsedTime);
    }
    reset();
    setIsGameState(GAME_STATE.LOADED);
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        completeGame,
        resetGame,
        elapsedTime,
        setBestTime,
        bestTime,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
