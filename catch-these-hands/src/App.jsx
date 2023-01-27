import { useEffect, useRef, useState } from "react";
import { useGestureRecogniser } from "./hooks/useGestureRecogniser";
import { useGetUserMedia } from "./hooks/useGetUserMedia";
import { predictWebcam } from "./utils";
import "./App.css";
import { useSocket } from "./hooks/useSocket";

const VID_WIDTH = 1280;
const VID_HEIGHT = 720;

const constraints = {
  video: { width: VID_WIDTH, height: VID_HEIGHT },
};

function App() {
  const videoElement = useRef(null);
  const canvasElement = useRef(null);
  const canvasCtx = canvasElement.current?.getContext("2d");

  const { sendCommand, isConnected, error } = useSocket();

  const handleNewCommand = (prevCommand, command) => {
    if (isConnected && !error.message) {
      if (command !== prevCommand) {
        if (prevCommand) sendCommand(`${prevCommand}_end`);
        sendCommand(`${command}_start`);
      }
    } else {
      if (error.message) console.log({ error });
    }
  };

  const { gestureRecogniser, isLoading: isGestureRecogniserLoading } =
    useGestureRecogniser();

  // window.onkeydown = (event) => {
  //   if (!event.repeat) {
  //     console.log("KEYDOWN", event.key);
  //   }
  // };
  // window.onkeyup = (event) => console.log("KEYUP", event.key);

  const {
    stream,
    isLoading: isUserMediaLoading,
    isError,
  } = useGetUserMedia({ constraints });

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
      <div className="camera-container">
        <canvas width={VID_WIDTH} height={VID_HEIGHT} ref={canvasElement} />
        <video
          width={VID_WIDTH}
          height={VID_HEIGHT}
          ref={videoElement}
          autoPlay={true}
        />
      </div>
    </div>
  );
}

export default App;
