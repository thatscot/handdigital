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

const drawBoundingBox = (ctx, result) => {
  const { width, height } = ctx.canvas;

  result.landmarks.forEach((landmarks, index) => {
    ctx.strokeStyle = "#2d2d2d";
    ctx.fillStyle = "#2d2d2d";
    let minx = 1,
      maxx = 0;
    for (const i of landmarks) {
      if (i.x > maxx) {
        maxx = i.x;
      }
      if (i.x < minx) {
        minx = i.x;
      }
    }

    let miny = 1,
      maxy = 0;
    for (const i of landmarks) {
      if (i.y > maxy) {
        maxy = i.y;
      }
      if (i.y < miny) {
        miny = i.y;
      }
    }

    console.log({ minx, maxx, miny, maxy });

    let boxWidth = maxx - minx;
    let boxHeight = maxy - miny;

    const adjustedMinX = width * minx - 5;
    const adjustedMinY = height * miny - 5;

    const adjustedBoxWidth = width * boxWidth + 10;
    const adjustedBoxHeight = height * boxHeight + 10;

    const adjustedMaxY = height * maxy + 5;

    console.log(
      width * minx,
      height * miny,
      width * boxWidth,
      height * boxHeight
    );

    ctx.strokeRect(
      adjustedMinX,
      adjustedMinY,
      adjustedBoxWidth,
      adjustedBoxHeight
    );

    ctx.font = "15px sans-serif";

    ctx.fillRect(adjustedMinX, adjustedMaxY, adjustedBoxWidth, 20);

    ctx.fillStyle = "white";
    ctx.fillText(
      result.gestures[index][0].categoryName,
      adjustedMinX + 5,
      adjustedMaxY + 15
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
