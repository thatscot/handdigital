import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useGestureRecogniser } from "./hooks/useGestureRecogniser";
import { useGetUserMedia } from "./hooks/useGetUserMedia";
import { predictWebcam } from "./utils";

const VID_WIDTH = 1280;
const VID_HEIGHT = 720;

const constraints = {
  video: { width: VID_WIDTH, height: VID_HEIGHT },
};

function App() {
  const videoElement = useRef(null);
  const canvasElement = useRef(null);
  const canvasCtx = canvasElement.current?.getContext("2d");

  const [commandQueue, setCommandQueue] = useState([]);

  function addToQueue(newCommand) {
    // console.log("Adding command to queue", newCommand);
    setCommandQueue((prevCommandQueue) => prevCommandQueue.unshift(newCommand));
  }

  function getLastCommand() {
    return commandQueue[commandQueue - 1] || undefined;
  }

  const { gestureRecogniser, isLoading: isGestureRecogniserLoading } =
    useGestureRecogniser();
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
        previousCommand: getLastCommand(),
        addToQueue,
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
        >
          {/* <source src="ted-talk-advert.mov" type="video/mp4" /> */}
        </video>
      </div>
    </div>
  );
}

export default App;
