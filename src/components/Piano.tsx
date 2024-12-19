import React from 'react';
import Key from './Key';
import '../styles/Piano.css';

// 흰 건반과 검은 건반 정의
const notes = [
  { note: 'C', key: '도(A)', isBlack: false },
  { note: 'C샵', key: '도#(W)', isBlack: true, relativePosition: 1 },
  { note: 'D', key: '레(S)', isBlack: false },
  { note: 'D샵', key: '레#(E)', isBlack: true, relativePosition: 2 },
  { note: 'E', key: '미(D)', isBlack: false },
  { note: 'F', key: '파(F)', isBlack: false },
  { note: 'F샵', key: '파#(T)', isBlack: true, relativePosition: 4.1 },
  { note: 'G', key: '솔(G)', isBlack: false },
  { note: 'G샵', key: '솔#(Y)', isBlack: true, relativePosition: 5.1 },
  { note: 'A', key: '라(H)', isBlack: false },
  { note: 'A샵', key: '라#(U)', isBlack: true, relativePosition: 6.15 },
  { note: 'B', key: '시(J)', isBlack: false },
  { note: 'C-2', key: '도(k)', isBlack: false },
];

const Piano: React.FC = () => {
  return (
    <div className="piano">
      {notes.map((n, index) => (
        <Key
          key={index}
          note={n.note}
          keyLabel={n.key}
          isBlack={n.isBlack}
          relativePosition={n.relativePosition}
        />
      ))}
    </div>
  );
};

export default Piano;
