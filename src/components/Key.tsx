import React, { useEffect, useState } from 'react';
import '../styles/Piano.css';

interface KeyProps {
  note: string;
  keyLabel: string;
  isBlack: boolean;
  relativePosition?: number;
}

const Key: React.FC<KeyProps> = ({ note, keyLabel, isBlack, relativePosition }) => {
  const [isPressed, setIsPressed] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);
  const audioBufferRef = React.useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const response = await fetch(`/src/assets/sounds/${note}.mp3`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
    };

    loadAudio().catch((err) => console.error(`Failed to load audio for ${note}:`, err));
  }, [note]);

  const playSound = () => {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    const audioContext = audioContextRef.current;
    const gainNode = audioContext.createGain();
    const source = audioContext.createBufferSource();

    source.buffer = audioBufferRef.current;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);

    source.start();
    gainNodeRef.current = gainNode;

    source.onended = () => {
      gainNode.disconnect();
    };
  };

  const stopSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const audioContext = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

    setTimeout(() => {
      gainNode.disconnect();
      gainNodeRef.current = null; 
    }, 1500); 
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keyLabel.match(/\((.*?)\)/)?.[1];
      if (e.key.toUpperCase() === key?.toUpperCase() && !isPressed) {
        setIsPressed(true);
        playSound();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = keyLabel.match(/\((.*?)\)/)?.[1];
      if (e.key.toUpperCase() === key?.toUpperCase()) {
        setIsPressed(false);
        stopSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyLabel, isPressed]);

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
      onMouseDown={() => {
        if (!isPressed) {
          setIsPressed(true);
          playSound();
        }
      }}
      onMouseUp={() => {
        setIsPressed(false);
        stopSound();
      }}
      onMouseLeave={() => {
        setIsPressed(false);
        stopSound();
      }}
    >
      <span className="key-label">{keyLabel}</span>
    </div>
  );
};

export default Key;
