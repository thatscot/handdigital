import { useEffect, useRef } from "react";
import { useGestureRecogniser } from "./hooks/useGestureRecogniser";
import { useGetUserMedia } from "./hooks/useGetUserMedia";
import { formatLabel, predictWebcam } from "./utils";
import { useSocket } from "./hooks/useSocket";
import { CONTROL_MAP, VID_DIMENSIONS } from "./constants";
import "./App.css";

function App() {
  const videoElement = useRef(null);
  const canvasElement = useRef(null);
  const canvasCtx = canvasElement.current?.getContext("2d");

  const { sendCommand, isConnected, error } = useSocket();

  const handleNewCommand = (prevCommand, command) => {
    if (isConnected && !error.message) {
      if (command !== prevCommand) {
        if (prevCommand)
          sendCommand({ name: CONTROL_MAP.get(prevCommand), lifecycle: "end" });
        sendCommand({ name: CONTROL_MAP.get(command), lifecycle: "start" });
      }
    } else {
      if (error.message) console.log({ error });
    }
  };

  const { gestureRecogniser, isLoading: isGestureRecogniserLoading } =
    useGestureRecogniser();

  const {
    stream,
    isLoading: isUserMediaLoading,
    isError,
  } = useGetUserMedia({
    constraints: {
      video: { width: VID_DIMENSIONS.WIDTH, height: VID_DIMENSIONS.HEIGHT },
    },
  });

  if (!isError && !isUserMediaLoading && videoElement.current) {
    videoElement.current.srcObject = stream;
  }

  useEffect(() => {
    if (!isGestureRecogniserLoading) {
      predictWebcam({
        gestureRecogniser,
        video: videoElement.current,
        canvasCtx,
        handleNewCommand,
      });
    }
  }, [isGestureRecogniserLoading, gestureRecogniser, videoElement, canvasCtx]);

  return (
    <div className="App">
      <h1>Control center</h1>
      <div className="camera-container">
        <canvas
          width={VID_DIMENSIONS.WIDTH}
          height={VID_DIMENSIONS.HEIGHT}
          ref={canvasElement}
        />
        <video
          width={VID_DIMENSIONS.WIDTH}
          height={VID_DIMENSIONS.HEIGHT}
          ref={videoElement}
          autoPlay={true}
        />
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
    </div>
  );
}

export default App;
