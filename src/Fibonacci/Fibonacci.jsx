import React, { useState } from "react";

function Fibonacci() {
  const [fibonacciResult, setFibonacciResult] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fibonacci = (x) => {
    let fibSequence = [0, 1];
    for (let i = 2; i < x; i++) {
      fibSequence[i] = fibSequence[i - 1] + fibSequence[i - 2];
    }
    return fibSequence;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFibonacci = () => {
    const inputNumber = parseInt(inputValue);
    if (!isNaN(inputNumber) && inputNumber > 0) {
      setFibonacciResult(fibonacci(inputNumber));
    } else {
      setFibonacciResult([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <label htmlFor="fibInput" className="mb-2 font-semibold">
        Enter a number:
      </label>
      <input
        type="number"
        id="fibInput"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={{border:'none'}}
        className="rounded border border-gray-400 px-2 py-1 mb-2"
      />
      <button
        onClick={handleFibonacci}
        className="bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Calculate Fibonacci
      </button>
      {fibonacciResult.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">Fibonacci Sequence:</p>
          <ul className="list-disc pl-6">
            {fibonacciResult.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Fibonacci;
