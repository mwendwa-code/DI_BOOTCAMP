import { useState } from "react";

const operations = {
  add: { label: "Addition", symbol: "+", calculate: (first, second) => first + second },
  subtract: {
    label: "Subtraction",
    symbol: "−",
    calculate: (first, second) => first - second,
  },
  multiply: {
    label: "Multiplication",
    symbol: "×",
    calculate: (first, second) => first * second,
  },
  divide: {
    label: "Division",
    symbol: "÷",
    calculate: (first, second) => first / second,
  },
};

const styles = `
  .calculator,
  .calculator * {
    box-sizing: border-box;
  }

  .calculator {
    display: grid;
    min-height: 100vh;
    min-height: 100svh;
    place-items: center;
    padding: 32px 20px;
    background: #f2f5fb;
    color: #182235;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .calculator-card {
    width: min(100%, 480px);
    padding: clamp(26px, 6vw, 42px);
    border: 1px solid #e5eaf2;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 20px 55px rgb(28 46 78 / 10%);
  }

  .calculator-eyebrow {
    margin: 0 0 8px;
    color: #5a6dd1;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .calculator-title {
    margin: 0;
    font-size: clamp(1.8rem, 6vw, 2.25rem);
    letter-spacing: -0.05em;
  }

  .calculator-description {
    margin: 10px 0 26px;
    color: #68758a;
    line-height: 1.55;
  }

  .calculator-fields {
    display: grid;
    gap: 16px;
  }

  .calculator-label {
    display: grid;
    gap: 7px;
    color: #39455a;
    font-size: 0.9rem;
    font-weight: 650;
  }

  .calculator-input,
  .calculator-select {
    width: 100%;
    min-height: 48px;
    padding: 10px 13px;
    border: 1px solid #d8deea;
    border-radius: 10px;
    background: #fff;
    color: #182235;
    font: inherit;
  }

  .calculator-input:focus,
  .calculator-select:focus {
    border-color: #5a6dd1;
    outline: 3px solid rgb(90 109 209 / 17%);
  }

  .calculator-button {
    width: 100%;
    min-height: 50px;
    margin-top: 22px;
    border: 0;
    border-radius: 10px;
    background: #4c5fc4;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-weight: 750;
    transition: background-color 150ms ease, transform 150ms ease;
  }

  .calculator-button:hover {
    transform: translateY(-1px);
    background: #3d4fae;
  }

  .calculator-button:focus-visible {
    outline: 3px solid #182235;
    outline-offset: 3px;
  }

  .calculator-error {
    margin: 16px 0 0;
    color: #b42335;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .calculator-result {
    margin-top: 22px;
    padding: 17px;
    border-radius: 12px;
    background: #f0f2ff;
    text-align: center;
  }

  .calculator-result-label {
    display: block;
    margin-bottom: 4px;
    color: #5d6682;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .calculator-result output {
    color: #394ba9;
    font-size: clamp(1.8rem, 7vw, 2.4rem);
    font-weight: 800;
    overflow-wrap: anywhere;
  }
`;

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function calculate(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (firstNumber.trim() === "" || secondNumber.trim() === "") {
      setError("Enter both numbers to calculate a result.");
      return;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setError("Enter valid numbers in both fields.");
      return;
    }

    if (operation === "divide" && second === 0) {
      setError("You can't divide by zero.");
      return;
    }

    const nextResult = operations[operation].calculate(first, second);
    if (!Number.isFinite(nextResult)) {
      setError("The result is outside the range of supported numbers.");
      return;
    }

    setResult(nextResult);
  }

  return (
    <main className="calculator">
      <style>{styles}</style>
      <section className="calculator-card" aria-labelledby="calculator-title">
        <p className="calculator-eyebrow">Quick calculation</p>
        <h1 className="calculator-title" id="calculator-title">
          Calculator
        </h1>
        <p className="calculator-description">
          Enter two numbers, choose an operation, and see the result.
        </p>

        <form onSubmit={calculate} noValidate>
          <div className="calculator-fields">
            <label className="calculator-label" htmlFor="calculator-first">
              First number
              <input
                className="calculator-input"
                id="calculator-first"
                inputMode="decimal"
                onChange={(event) => {
                  setFirstNumber(event.target.value);
                  setResult(null);
                  setError("");
                }}
                type="number"
                step="any"
                value={firstNumber}
              />
            </label>

            <label className="calculator-label" htmlFor="calculator-operation">
              Operation
              <select
                className="calculator-select"
                id="calculator-operation"
                onChange={(event) => {
                  setOperation(event.target.value);
                  setResult(null);
                  setError("");
                }}
                value={operation}
              >
                {Object.entries(operations).map(([value, item]) => (
                  <option key={value} value={value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="calculator-label" htmlFor="calculator-second">
              Second number
              <input
                className="calculator-input"
                id="calculator-second"
                inputMode="decimal"
                onChange={(event) => {
                  setSecondNumber(event.target.value);
                  setResult(null);
                  setError("");
                }}
                type="number"
                step="any"
                value={secondNumber}
              />
            </label>
          </div>

          <button className="calculator-button" type="submit">
            {operation === "add" ? "Add Them" : "Calculate"}
          </button>

          {error && (
            <p className="calculator-error" role="alert">
              {error}
            </p>
          )}

          {result !== null && (
            <div className="calculator-result" aria-live="polite">
              <span className="calculator-result-label">
                Result · {operations[operation].symbol}
              </span>
              <output>{result}</output>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}