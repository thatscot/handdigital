import React, { useRef, useEffect } from 'react';
import { VID_DIMENSIONS } from '../constants';
import { CONTROL_MAP } from '../constants';
import { predictWebcam } from '../utils';
import { memo } from 'react';
import { useSocket, useGestureRecogniser } from '../hooks';

const GestureCamera = memo(({ stream, setActiveCommand }) => {
  const videoElement = useRef(null);
  const canvasElement = useRef(null);
  const canvasCtx = canvasElement.current?.getContext('2d');
  const { sendCommand, isConnected, error } = useSocket();
  const { gestureRecogniser, isLoading } = useGestureRecogniser();
  const authCode = sessionStorage.getItem('game-code');

  const handleNewCommand = (prevCommand, command) => {
    if (isConnected && !error.message) {
      if (command !== prevCommand) {
        if (prevCommand) {
          sendCommand({
            name: CONTROL_MAP.get(prevCommand),
            lifecycle: 'end',
            uuid: authCode
          });
        }
        sendCommand({ name: CONTROL_MAP.get(command), lifecycle: 'start', uuid: authCode });
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
    if (!isLoading && gestureRecogniser) {
      predictWebcam({
        gestureRecogniser,
        video: videoElement.current,
        canvasCtx,
        handleNewCommand
      });
    }
  }, [gestureRecogniser, videoElement, canvasCtx, handleNewCommand]);

  return (
    <div className="camera-container">
      <canvas width={VID_DIMENSIONS.WIDTH} height={VID_DIMENSIONS.HEIGHT} ref={canvasElement} />
      <video
        width={VID_DIMENSIONS.WIDTH}
        height={VID_DIMENSIONS.HEIGHT}
        ref={videoElement}
        autoPlay={true}
      />
    </div>
  );
});

GestureCamera.displayName = 'GestureCamera';

export { GestureCamera };
