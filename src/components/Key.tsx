import React, { useEffect, useState } from 'react';
import useSound from '../hooks/useSound';
import '../styles/Piano.css';

interface KeyProps {
  note: string;
  keyLabel: string;
  isBlack: boolean;
  relativePosition?: number;
}

const Key: React.FC<KeyProps> = ({ note, keyLabel, isBlack, relativePosition }) => {
  const [isPressed, setIsPressed] = useState(false);
  const playSound = useSound(`/src/assets/sounds/${note}.mp3`); // 음계와 같은 이름의 MP3 파일

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keyLabel.match(/\((.*?)\)/)?.[1];
      if (e.key.toUpperCase() === key?.toUpperCase()) {
        setIsPressed(true);
        playSound();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = keyLabel.match(/\((.*?)\)/)?.[1];
      if (e.key.toUpperCase() === key?.toUpperCase()) {
        setIsPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyLabel, playSound]);

  return (
    <div
      className={`key ${isBlack ? 'black-key' : 'white-key'} ${
        isPressed ? 'pressed' : ''
      }`}
      style={
        isBlack
          ? { left: `${relativePosition ? relativePosition * 60 - 20 : 0}px` }
          : {}
      }
      onClick={playSound}
    >
      <span className="key-label">{keyLabel}</span>
    </div>
  );
};

export default Key;
