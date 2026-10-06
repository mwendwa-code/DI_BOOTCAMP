import { Component } from 'react';

class App extends Component {
  state = {
    helloMessage: '',
    inputValue: '',
    responseMessage: '',
    errorMessage: '',
    isSubmitting: false
  };

  async componentDidMount() {
    try {
      const response = await fetch('/api/hello');

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      const data = await response.json();
      this.setState({ helloMessage: data.message });
    } catch (error) {
      this.setState({ errorMessage: `Unable to load greeting: ${error.message}` });
    }
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: '',
      responseMessage: '',
      isSubmitting: true
    });

    try {
      const response = await fetch('/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: this.state.inputValue })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}.`);
      }

      this.setState({ responseMessage: data.message });
    } catch (error) {
      this.setState({ errorMessage: `Unable to send message: ${error.message}` });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const {
      helloMessage,
      inputValue,
      responseMessage,
      errorMessage,
      isSubmitting
    } = this.state;

    return (
      <main className="app">
        {helloMessage && <h1>{helloMessage}</h1>}
        {!helloMessage && !errorMessage && <p role="status">Loading greeting...</p>}

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="message">Send a message to the server</label>
          <input
            id="message"
            name="message"
            type="text"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Type something..."
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>

        {responseMessage && <p className="response" role="status">{responseMessage}</p>}
        {errorMessage && <p className="error" role="alert">{errorMessage}</p>}
      </main>
    );
  }
}

export default App;
