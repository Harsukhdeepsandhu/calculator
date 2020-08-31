import React, { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Screen from './components/Screen';

function App() {
  const [userInput, setUserInput] = useState([]);
  const [answer, setAnswer] = useState(0);

  return (
    <div className="calculator-container">
      <Screen
        userInput={userInput}
        answer={answer}
      />
      <Input
        userInput={userInput}
        setUserInput={setUserInput}
        answer={answer}
        setAnswer={setAnswer}
      />
    </div>
  );
}

export default App;
