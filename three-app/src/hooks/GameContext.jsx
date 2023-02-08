import { createContext, useContext, useState } from 'react';
import { GAME_STATE } from '../utils/constants';
import { useElapsedTime } from 'use-elapsed-time';
import { emitTime } from '../utils/sockets';
const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [gameState, setIsGameState] = useState(GAME_STATE.LOADED);
  const [bestTime, setBestTime] = useState();

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: gameState === GAME_STATE.STARTED,
  });

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
    if (gameState === GAME_STATE.COMPLETED) {
      emitTime(elapsedTime);
    }
    reset(0);
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
