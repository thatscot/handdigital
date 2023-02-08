import { useGameContext } from "../hooks";
import { GAME_STATE } from "../utils/constants";

export const Interface = () => {
  const { gameState, startGame, resetGame } = useGameContext();

  return (
    <div className="interface">
      {gameState === GAME_STATE.LOADED ? (
        <div className="menu" onClick={() => startGame()}>
          START
        </div>
      ) : null}
      {gameState === GAME_STATE.COMPLETED ? (
        <div className="menu" onClick={() => resetGame()}>
          RESTART
        </div>
      ) : null}
    </div>
  );
};
