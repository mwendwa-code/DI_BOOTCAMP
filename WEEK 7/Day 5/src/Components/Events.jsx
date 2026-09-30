import { useState } from 'react';

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => window.alert('I was clicked');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.alert(event.currentTarget.value);
    }
  };

  const toggleState = () => setIsToggleOn((currentValue) => !currentValue);

  return (
    <div className="demo-grid">
      <div className="demo-control">
        <p className="control-label">Click event</p>
        <button className="action-button" onClick={clickMe} type="button">
          Click me
        </button>
      </div>
      <div className="demo-control">
        <label className="control-label" htmlFor="enter-message">Press Enter to alert</label>
        <input
          id="enter-message"
          className="text-input"
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          type="text"
        />
      </div>
      <div className="demo-control">
        <p className="control-label">Toggle state</p>
        <button
          aria-pressed={isToggleOn}
          className="action-button toggle-button"
          onClick={toggleState}
          type="button"
        >
          {isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}

export default Events;