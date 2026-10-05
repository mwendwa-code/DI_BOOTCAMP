import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary.js';

export const ColumnRight = () => {
  const crashValue = { function: 'I live to crash' };
  const [text, setText] = useState(JSON.stringify(crashValue));

  const eventHandler = () => {
    throw new Error('Event handler error');
  };

  return (
    <div className="right-content">
      <p className="column-label">Error demonstrations</p>
      <h2>Right column</h2>

      <p>
        This app demonstrates two kinds of errors: a rendering error and a regular
        JavaScript error from an event handler.
      </p>

      <hr />

      <ErrorBoundary>
        <p>
          Clicking the first button replaces the <code>stringified</code> object,{' '}
          <code>{text}</code>, with a plain JavaScript object. React cannot render
          that object, so this paragraph is caught by the error boundary.
        </p>
      </ErrorBoundary>

      <button
        className="button button-danger"
        onClick={() => setText(crashValue)}
      >
        Replace string with object
      </button>

      <hr />

      <p>
        The second button throws inside an event handler. Error boundaries do not
        catch event-handler errors, so the error is reported in the developer console.
      </p>

      <button className="button button-danger" onClick={eventHandler}>
        Invoke event handler
      </button>
    </div>
  );
};
