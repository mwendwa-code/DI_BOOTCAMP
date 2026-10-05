import { Component, createRef } from 'react';
import ErrorBoundary from './ErrorBoundary.js';

class ModalExercise extends Component {
  errorBoundary = createRef();

  render() {
    return (
      <div className="demo-card modal-exercise">
        <p>Click the button to simulate an error and display it in a modal.</p>
        <ErrorBoundary displayModal ref={this.errorBoundary}>
          <button
            className="button button-primary"
            onClick={() => this.errorBoundary.current.occurError()}
          >
            Show error modal
          </button>
        </ErrorBoundary>
      </div>
    );
  }
}

export default ModalExercise;