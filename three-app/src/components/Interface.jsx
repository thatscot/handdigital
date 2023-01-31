import { useElapsedTime } from 'use-elapsed-time';

export const Interface = () => {

    const { elapsedTime } = useElapsedTime({ isPlaying: true })

    return <div className="interface">
        <div className="time"> {elapsedTime.toFixed(1)} </div>
    </div>;
};