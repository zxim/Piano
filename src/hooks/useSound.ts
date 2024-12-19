import { useCallback } from 'react';

const useSound = (url: string) => {
  const play = useCallback(() => {
    const audio = new Audio(url);
    audio.play();
  }, [url]);

  return play;
};

export default useSound;
