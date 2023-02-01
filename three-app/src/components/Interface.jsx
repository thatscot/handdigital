import { useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';
import { useGameContext } from "../hooks";
import { GAME_STATE } from '../utils/constants';

export const Interface = () => {

    const { gameState, startGame, resetGame } = useGameContext();

    // const { elapsedTime } = useElapsedTime({ isPlaying: isGameStarted && !isGameCompleted });


    return <div className="interface">
        {gameState === GAME_STATE.LOADED ? <div className="hud" onClick={() => startGame()}>START</div> : null}
        {/* {isGameStarted ? <div className="hud"> {elapsedTime.toFixed(1)} </div> : null} */}
        {gameState === GAME_STATE.COMPLETED ? <div className="hud" onClick={() => resetGame()}>RESTART</div> : null}
    </div>;
};