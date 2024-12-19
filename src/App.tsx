import React from 'react';
import Piano from './components/Piano';
import './styles/Piano.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Virtual Piano</h1>
      <Piano />
    </div>
  );
};

export default App;
