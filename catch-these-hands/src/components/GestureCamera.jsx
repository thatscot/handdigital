import React, { useRef, useEffect } from "react";
import { VID_DIMENSIONS } from "../constants";
import { CONTROL_MAP } from "../constants";
import { predictWebcam } from "../utils";
import { memo } from "react";
import { useSocket, useGestureRecogniser } from "../hooks";

const GestureCamera = memo(
  ({ stream, setActiveCommand, recogniserEnabled }) => {
    const videoElement = useRef(null);
    const canvasElement = useRef(null);
    const canvasCtx = canvasElement.current?.getContext("2d");
    const { sendCommand, isConnected, error } = useSocket();
    const { gestureRecogniser, isLoading } = useGestureRecogniser();

    const handleNewCommand = (prevCommand, command) => {
      if (isConnected && !error.message) {
        if (command !== prevCommand) {
          if (prevCommand) {
            sendCommand({
              name: CONTROL_MAP.get(prevCommand),
              lifecycle: "end",
            });
          }
          sendCommand({ name: CONTROL_MAP.get(command), lifecycle: "start" });
          setActiveCommand(command);
        }
      } else {
        if (error.message) console.log({ error });
      }
    };

    useEffect(() => {
      videoElement.current.srcObject = stream;
    }, []);

    useEffect(() => {
      if (!isLoading && gestureRecogniser && recogniserEnabled) {
        predictWebcam({
          gestureRecogniser,
          video: videoElement.current,
          canvasCtx,
          handleNewCommand,
        });
      }
    }, [
      gestureRecogniser,
      videoElement,
      canvasCtx,
      handleNewCommand,
      recogniserEnabled,
    ]);

    return (
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
    );
  }
);

export { GestureCamera };
