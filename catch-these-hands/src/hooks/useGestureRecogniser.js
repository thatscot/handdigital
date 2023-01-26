import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { useState, useEffect } from "react";

const MODEL_PATH = "src/assets/models/gesture_recognizer.task";

const useGestureRecogniser = ({ numHands = 2, runningMode = "video" } = {}) => {
  const [gestureRecogniser, setGestureRecogniser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getGestureRecogniser() {
      setIsLoading(true);
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const gestureRecogniser = await GestureRecognizer.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: MODEL_PATH,
          },
          numHands,
          runningMode,
        }
      );
      setGestureRecogniser(gestureRecogniser);
      setIsLoading(false);
    }
    getGestureRecogniser();
  }, []);

  return { gestureRecogniser, isLoading };
};

export { useGestureRecogniser };
