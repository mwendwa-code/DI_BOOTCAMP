import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="alert alert-danger" role="alert">
          <h1 className="h4">Something went wrong.</h1>
          <p className="mb-0">This page could not be displayed.</p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
