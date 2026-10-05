import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { error, errorInfo, onClose } = this.props;

    return (
      <div className="modal-background">
        <section
          className="modal-body"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <h2 id="modal-title">An error occurred</h2>
          <p>{error?.message || 'Something went wrong.'}</p>
          {errorInfo?.componentStack && (
            <details>
              <summary>Error details</summary>
              <pre>{errorInfo.componentStack}</pre>
            </details>
          )}
          <button className="button button-primary" onClick={onClose} autoFocus>
            Close
          </button>
        </section>
      </div>
    );
  }
}

export default Modal;
