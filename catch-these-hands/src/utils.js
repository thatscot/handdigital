const PADDING = 5;

const drawLandmarks = (ctx, result) => {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = "#2d2d2d";
  result.landmarks.forEach((landmark) => {
    landmark.forEach((pos) => {
      const { x, y } = pos;
      ctx.fillRect(width * x, height * y, 5, 5);
    });
  });
};

const resetCtxStyle = (ctx) => {
  ctx.strokeStyle = "#2d2d2d";
  ctx.fillStyle = "#2d2d2d";
  ctx.font = "15px sans-serif";
};

const drawBoundingBox = (ctx, result) => {
  const { width, height } = ctx.canvas;

  result.landmarks.forEach((landmarks, index) => {
    resetCtxStyle(ctx);

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

    const adjustedMaxY = height * maxY + PADDING;
    ctx.strokeRect(
      adjustedMinX,
      adjustedMinY,
      adjustedBoxWidth,
      adjustedBoxHeight
    );

    ctx.fillRect(adjustedMinX, adjustedMaxY, adjustedBoxWidth, 20);
    ctx.fillStyle = "white";
    ctx.fillText(
      result.gestures[index][0].categoryName,
      adjustedMinX + PADDING,
      adjustedMaxY + PADDING * 3
    );
  });
};

async function predictWebcam({ gestureRecogniser, video, canvasCtx }) {
  let nowInMs = Date.now();
  const results = await gestureRecogniser.recognizeForVideo(video, nowInMs);

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

  drawLandmarks(canvasCtx, results);
  drawBoundingBox(canvasCtx, results);

  window.requestAnimationFrame(() =>
    predictWebcam({ gestureRecogniser, video, canvasCtx })
  );
}

export { drawBoundingBox, drawLandmarks, predictWebcam };
