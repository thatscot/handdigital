import { useState, useEffect } from "react";

function useGetUserMedia({ constraints }) {
  const [stream, setStream] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getStream() {
      if (!!navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints);
        const userMedia = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        setStream(userMedia);
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    }
    getStream();
  }, [setStream, setIsLoading, setIsError]);

  return { stream, isLoading, isError };
}
export { useGetUserMedia };
