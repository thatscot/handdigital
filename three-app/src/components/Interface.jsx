import { useElapsedTime } from 'use-elapsed-time';

export const Interface = () => {

    const { elapsedTime } = useElapsedTime({ isPlaying: true })

    return <div className="interface">
        <div className="time"> {Math.floor(elapsedTime * 100) / 100} </div>
    </div>;
};