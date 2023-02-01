import { useElapsedTime } from 'use-elapsed-time';
import { useGameContext } from "../hooks";

export const Interface = () => {

    const { isGameStarted, startGame, isGameCompleted, resetGame } = useGameContext();
    
    let timer = 0;

    if (isGameStarted) {
        const { elapsedTime } = useElapsedTime({ isPlaying: true });
        timer = elapsedTime;
    };

    return <div className="interface">
        { isGameStarted ? <div className="hud"> {timer.toFixed(1)} </div> : null }
        { !isGameStarted ? <div className="hud" onClick={() => startGame()}>START</div> : null }
        { isGameCompleted ? <div className="hud" onClick={() => resetGame()}>RESTART</div> : null }
    </div>;
};