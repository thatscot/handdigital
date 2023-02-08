import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import { useState, useEffect } from 'react';

const MODEL_PATH = new URL('../assets/gesture_recognizer.task', import.meta.url);
1;
const useGestureRecogniser = ({ numHands = 1, runningMode = 'video' } = {}) => {
  const [gestureRecogniser, setGestureRecogniser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getGestureRecogniser() {
      setIsLoading(true);
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-3/wasm'
      );
      const gestureRecogniser = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_PATH
        },
        numHands,
        runningMode
      });
      setGestureRecogniser(gestureRecogniser);
      setIsLoading(false);
    }
    getGestureRecogniser();
  }, []);

  return { gestureRecogniser, isLoading };
};

export { useGestureRecogniser };
