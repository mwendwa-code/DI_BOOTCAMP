import { Component } from 'react';
import Modal from './Modal.js';

class ErrorTrigger extends Component {
  render() {
    throw this.props.error;
  }
}

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  occurError = () => {
    this.setState({
      hasError: true,
      error: new Error('A simulated error was triggered.')
    });
  };

  clearError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.displayModal) {
        if (!this.state.errorInfo) {
          return <ErrorTrigger error={this.state.error} />;
        }

        return (
          <Modal
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onClose={this.clearError}
          />
        );
      }

      return (
        <section className="error-fallback" role="alert">
          <h3>Something went wrong.</h3>
          <p>The counter crashed. Its error details are available below.</p>
          <details>
            <summary>Error details</summary>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error.toString()}
              {'\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
