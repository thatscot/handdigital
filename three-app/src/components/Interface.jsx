import { useEffect } from "react";
import { useGameContext } from "../hooks";
import { GAME_STATE } from "../utils/constants";

export const Interface = () => {
  const { gameState, startGame, resetGame } = useGameContext();

  const shouldDisplayButton = [
    GAME_STATE.LOADED,
    GAME_STATE.COMPLETED,
  ].includes(gameState);

  if (!shouldDisplayButton) return <div />;

  let text, action;

  switch (gameState) {
    case GAME_STATE.LOADED: {
      text = "START";
      action = startGame;
      break;
    }
    case GAME_STATE.COMPLETED: {
      text = "RESTART";
      action = resetGame;
      break;
    }
  }

  useEffect(() => {
    window.onkeydown = (e) => {
      if (!e.repeat && e.code === "Space") {
        action();
      }
    };
  });

  return (
    <div className="interface">
      <div className="menu" onClick={action}>
        {text}
      </div>
    </div>
  );
};
