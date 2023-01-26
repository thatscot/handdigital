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

  if (!isGestureRecogniserLoading) {
    predictWebcam({
      gestureRecogniser,
      video: videoElement.current,
      canvasCtx,
    });
  }

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
        {/* <img
          width={1280}
          height={720}
          ref={imageElement}
          src="simon-cowell-2012.jpeg"
          crossOrigin="anonymous"
        /> */}
      </div>
    </div>
  );
}

export default App;
