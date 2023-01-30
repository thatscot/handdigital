import { useEffect, useRef, useState } from "react";
import { useGestureRecogniser } from "./hooks/useGestureRecogniser";
import { useGetUserMedia } from "./hooks/useGetUserMedia";
import { formatLabel, predictWebcam } from "./utils";
import { useSocket } from "./hooks/useSocket";
import { CONTROL_MAP } from "./constants";
import "./App.css";

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

  // window.onkeydown = (event) => {
  //   if (!event.repeat) {
  //     console.log("KEYDOWN", event.key);
  //     if (event.key === "ArrowDown") {
  //       sendCommand("down");
  //     }
  //     if (event.key === "ArrowUp") {
  //       sendCommand("up");
  //     }
  //     if (event.key === "ArrowLeft") {
  //       sendCommand("left");
  //     }
  //     if (event.key === "ArrowRight") {
  //       sendCommand("right");
  //     }
  //     if (event.key === "/") {
  //       sendCommand("stop");
  //     }
  //   }
  // };
  // window.onkeyup = (event) => {
  //   console.log("KEYUP", event.key);
  // };

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
      <h1>Control center</h1>
      <div className="camera-container">
        <canvas width={VID_WIDTH} height={VID_HEIGHT} ref={canvasElement} />
        <video
          width={VID_WIDTH}
          height={VID_HEIGHT}
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
