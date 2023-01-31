const PADDING = 5;

const drawLandmarks = (ctx, result) => {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = 'white';
  result.landmarks.forEach((landmark) => {
    landmark.forEach((pos) => {
      const { x, y } = pos;
      ctx.fillRect(width * x, height * y, 5, 5);
    });
  });
};

const drawBoundingBox = (ctx, result) => {
  const { width, height } = ctx.canvas;
  ctx.strokeStyle = '#646cff';

  result.landmarks.forEach((landmarks) => {
    const { minX, minY, maxX, maxY } = landmarks.reduce(
      (acc, { x, y }) => {
        if (x < acc.minX) acc.minX = x;
        if (x > acc.maxX) acc.maxX = x;
        if (y < acc.minY) acc.minY = y;
        if (y > acc.maxY) acc.maxY = y;
        return acc;
      },
      { minX: 1, minY: 1, maxX: 0, maxY: 0 }
    );

    const boxWidth = maxX - minX;
    const boxHeight = maxY - minY;

    const adjustedMinX = width * minX - PADDING;
    const adjustedMinY = height * minY - PADDING;

    const adjustedBoxWidth = width * boxWidth + PADDING * 2;
    const adjustedBoxHeight = height * boxHeight + PADDING * 2;

    ctx.strokeRect(adjustedMinX, adjustedMinY, adjustedBoxWidth, adjustedBoxHeight);
  });
};

async function predictWebcam({
  gestureRecogniser,
  video,
  canvasCtx,
  handleNewCommand,
  previousCommand
}) {
  let nowInMs = Date.now();
  const results = await gestureRecogniser.recognizeForVideo(video, nowInMs);
  const newCommand = results.gestures?.[0]?.[0];
  const commandName = newCommand?.categoryName ?? 'None';
  handleNewCommand(previousCommand, commandName);

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

  drawLandmarks(canvasCtx, results);
  drawBoundingBox(canvasCtx, results);

  const animationHandleID = window.requestAnimationFrame(() =>
    predictWebcam({
      gestureRecogniser,
      video,
      canvasCtx,
      previousCommand: commandName,
      handleNewCommand
    })
  );

  return animationHandleID;
}

function formatLabel(term) {
  return term.split('_').join(' ');
}

export { drawBoundingBox, drawLandmarks, predictWebcam, formatLabel };
