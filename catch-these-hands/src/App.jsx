import { useState } from "react";
import { useGetUserMedia } from "./hooks";
import { formatLabel } from "./utils";
import { CONTROL_MAP, VID_DIMENSIONS } from "./constants";
import "./App.css";
import { GestureCamera } from "./components/GestureCamera";

function App() {
  const [recogniserEnabled, setRecogniserEnabled] = useState(true);
  const [activeGesture, setActiveGesture] = useState("None");

  const toggleRecogniser = () => {
    setRecogniserEnabled((prevRecogniserEnabled) => !prevRecogniserEnabled);
  };

  // Get webcam
  const {
    stream,
    isLoading: isUserMediaLoading,
    isError,
  } = useGetUserMedia({
    constraints: {
      video: { width: VID_DIMENSIONS.WIDTH, height: VID_DIMENSIONS.HEIGHT },
    },
  });

  const displayUserMedia = stream && !isUserMediaLoading && !isError;

  return (
    <div className="App">
      <h1>Control center</h1>
      <div className="video-view">
        {displayUserMedia && (
          <GestureCamera
            stream={stream}
            setActiveCommand={setActiveGesture}
            recogniserEnabled={recogniserEnabled}
          />
        )}
        <div className="gesture-display">{activeGesture}</div>
      </div>
      <fieldset>
        <legend>Controls</legend>
        {[...CONTROL_MAP.entries()].map(([key, value]) => (
          <>
            <span>{formatLabel(key)}: </span>
            <span>{value}</span>
          </>
        ))}
      </fieldset>
      <fieldset>
        <legend>Settings</legend>
        <input id="flip" type="checkbox" />
        <label htmlFor="flip">Flip video</label>
        <input
          id="toggle-recogniser"
          onChange={toggleRecogniser}
          checked={recogniserEnabled}
          type="checkbox"
        />
        <label htmlFor="toggle-recogniser">Recogniser on</label>
      </fieldset>
    </div>
  );
}

export default App;
