import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useGestureRecogniser } from "./hooks/useGestureRecogniser";
import {
  drawBoundingBox,
  drawLandmarks,
  predictWebcam,
} from "./assets/models/utils";

function App() {
  const videoElement = useRef(null);
  const [result, setResult] = useState(undefined);
  const canvasElement = useRef(null);
  let canvasCtx;

  const { gestureRecogniser, isLoading } = useGestureRecogniser();

  // useEffect(() => {
  //   if (!isLoading && videoElement.current && gestureRecogniser) {
  //     let nowInMs = Date.now();
  //     setResult(
  //       gestureRecogniser.recognizeForVideo(videoElement.current, nowInMs)
  //     );
  //   }
  // }, [isLoading, videoElement, gestureRecogniser]);

  // useEffect(() => {
  //   console.log({ result });

  //   canvasCtx = canvasElement.current?.getContext("2d");
  //   if (result && canvasCtx) {
  //     canvasCtx.save();
  //     canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  //     drawLandmarks(canvasCtx, result);
  //     drawBoundingBox(canvasCtx, result);
  //   }
  // }, [canvasElement, result]);

  useEffect(() => {
    canvasCtx = canvasElement.current.getContext("2d");
    if (!isLoading && gestureRecogniser && videoElement.current) {
      predictWebcam({
        gestureRecogniser,
        video: videoElement.current,
        canvasCtx,
      });
    }
  }, [isLoading, videoElement, canvasElement, gestureRecogniser]);

  return (
    <div className="App">
      <div className="camera-container">
        <canvas width={1280} height={720} color="red" ref={canvasElement} />
        <video
          width={1280}
          height={720}
          ref={videoElement}
          controls
          autoPlay="true"
        >
          <source src="ted-talk-advert.mov" type="video/mp4" />
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
