import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="card error-fallback" role="alert">
        <div className="error-icon" aria-hidden="true">!</div>
        <h3>This part of the page ran into an error</h3>
        <p>The rest of the app is still available.</p>
        <details>
          <summary>Show error details</summary>
          <pre>
            {this.state.error?.toString()}
            {'\n'}
            {this.state.errorInfo?.componentStack}
          </pre>
        </details>
        <button
          className="button button-secondary"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
