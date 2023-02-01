import { useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';
import { useGameContext } from "../hooks";
import { GAME_STATE } from '../utils/constants';

export const Interface = () => {

    const { gameState, startGame, resetGame } = useGameContext();

    const { elapsedTime } = useElapsedTime({ isPlaying: gameState === GAME_STATE.STARTED });


    return <div className="interface">
        {gameState === GAME_STATE.LOADED ? <div className="menu" onClick={() => startGame()}>START</div> : null}
        {gameState === GAME_STATE.COMPLETED ? <div className="menu" onClick={() => resetGame()}>RESTART</div> : null}
        <div className="time"> {elapsedTime.toFixed(1)} </div>
    </div>;
};