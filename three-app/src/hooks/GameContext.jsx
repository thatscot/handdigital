import { createContext, useContext, useState } from 'react';
import { GAME_STATE } from '../utils/constants';
import { useElapsedTime } from './useElapsedTime';
import { emitTime } from '../utils/sockets';
import { useEffect } from 'react';
import { generateOTP } from '../utils/utils';
const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [gameState, setIsGameState] = useState(GAME_STATE.LOADED);
  const [bestTime, setBestTime] = useState();
  const [otpCode, setOtpCode] = useState(sessionStorage.getItem('game-code'));

  const { elapsedTime, reset, start, stop } = useElapsedTime();

  useEffect(() => {
    const gameCode = sessionStorage.getItem('game-code');
    if (!gameCode) {
      const newCode = generateOTP();
      setOtpCode(newCode);
      sessionStorage.setItem('game-code', newCode);
    }
  }, []);

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
        otpCode
      }}>
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
