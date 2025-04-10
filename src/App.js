import { useState } from 'react';
import './App.css';
import * as math from "mathjs";

function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [result, setResult] = useState("");
  const [isEqualClicked, setIsEqualClicked] = useState(false);

  const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', 'C', '0', '=', '/',
  ];

  const handleClick = (btn) => {
    if (btn === '=') {
      if (currentInput === "") {
        setResult("Error");
      }

      if (currentInput === "0/0") {
        setResult("NaN");
      }


      if (
        currentInput.includes("+") ||
        currentInput.includes("-") ||
        currentInput.includes("*") ||
        currentInput.includes("/")
      ) {
        try {
          const evaluatedResult = math.evaluate(currentInput);
          setResult(evaluatedResult);
        } catch (err) {
          setResult("Infinity");
        }
      }
      setIsEqualClicked(true);
    } else if (btn === 'C') {
      setCurrentInput("");
      setResult("");
      setIsEqualClicked(false);
    } else {
      setCurrentInput((prev) => prev + btn);
      setIsEqualClicked(false);
    }
  };

  const renderedButtons = buttons.map((item) => {
    return <button key={item} className='grid-item' onClick={() => handleClick(item)}>{item}</button>
  });

  return (
    <div className="container">
      <h1>React Calculator</h1>
      <input className='input' type="text" value={currentInput} readOnly></input>
      {isEqualClicked ? <div className="output">{result}</div> : null}
      <div className="grid-container">
        {renderedButtons}
      </div>
    </div>

  );
}

export default App;
