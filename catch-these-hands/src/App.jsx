import { useState } from 'react';
import { useGetUserMedia } from './hooks';
import { formatLabel } from './utils';
import { CONTROL_MAP, EMOJI_MAP, VID_DIMENSIONS } from './constants';
import './App.css';
import { GestureCamera } from './components/GestureCamera';

function App() {
  const [activeGesture, setActiveGesture] = useState('None');

  const {
    stream,
    isLoading: isUserMediaLoading,
    isError
  } = useGetUserMedia({
    constraints: {
      video: { width: VID_DIMENSIONS.WIDTH, height: VID_DIMENSIONS.HEIGHT }
    }
  });

  const displayUserMedia = stream && !isUserMediaLoading && !isError;

  return (
    <div className="App">
      <h1>Control center</h1>
      <div className="view-container">
        <div className="video-view">
          {displayUserMedia && (
            <GestureCamera stream={stream} setActiveCommand={setActiveGesture} />
          )}
          <div className="gesture-display">{formatLabel(activeGesture)}</div>
        </div>
        <div className="controls">
          <fieldset>
            <legend>Controls</legend>
            {[...CONTROL_MAP.entries()].map(
              ([key, value]) =>
                value !== 'none' && (
                  <>
                    <span>{EMOJI_MAP.get(key)}</span>
                    <span>{value}</span>
                  </>
                )
            )}
          </fieldset>
          <fieldset>
            <legend>Settings</legend>
            <input id="flip" type="checkbox" defaultChecked />
            <label htmlFor="flip">Flip video</label>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default App;
