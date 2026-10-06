import { Component } from 'react';
import axios from 'axios';

export class FetchPostForm extends Component {
  state = {
    user: '',
    email: '',
    status: ''
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ status: 'Sending request...' });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: this.state.user,
          email: this.state.email
        })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      const postedData = await response.json();
      console.log('User data posted:', postedData);
      this.setState({ status: 'Posted data logged to the console.' });
    } catch (error) {
      console.error('Unable to post user data:', error);
      this.setState({ status: `Request failed: ${error.message}` });
    }
  };

  render() {
    const { user, email, status } = this.state;

    return (
      <section className="exercise-section" aria-labelledby="fetch-post-heading">
        <h2 id="fetch-post-heading">POST JSON with Fetch</h2>
        <form className="row g-3" onSubmit={this.handleSubmit}>
          <div className="col-12 col-md-5">
            <label className="form-label" htmlFor="fetch-user">
              User
            </label>
            <input
              className="form-control"
              id="fetch-user"
              type="text"
              name="user"
              placeholder="User"
              value={user}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-5">
            <label className="form-label" htmlFor="fetch-email">
              Email
            </label>
            <input
              className="form-control"
              id="fetch-email"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-2 d-flex align-items-end">
            <button className="btn btn-primary w-100" type="submit">
              Submit
            </button>
          </div>
        </form>
        {status && <p className="mt-2" role="status">{status}</p>}
      </section>
    );
  }
}

export class AxiosPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      title: '',
      body: '',
      status: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ status: 'Sending request...' });

    const { userId, title, body } = this.state;

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        { userId: Number(userId), title, body },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Post data posted:', response.data);
      this.setState({ status: 'Posted data logged to the console.' });
    } catch (error) {
      console.error('Unable to post data with Axios:', error);
      this.setState({ status: `Request failed: ${error.message}` });
    }
  };

  render() {
    const { userId, title, body, status } = this.state;

    return (
      <section className="exercise-section" aria-labelledby="axios-post-heading">
        <h2 id="axios-post-heading">POST JSON with Axios</h2>
        <form className="row g-3" onSubmit={this.handleSubmit}>
          <div className="col-12 col-md-4">
            <label className="form-label" htmlFor="axios-user-id">
              User ID
            </label>
            <input
              className="form-control"
              id="axios-user-id"
              type="number"
              placeholder="User ID"
              name="userId"
              value={userId}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="axios-title">
              Title
            </label>
            <input
              className="form-control"
              id="axios-title"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="axios-body">
              Body
            </label>
            <textarea
              className="form-control"
              id="axios-body"
              placeholder="Body"
              name="body"
              value={body}
              onChange={this.handleChange}
              rows="3"
              required
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
        {status && <p className="mt-2" role="status">{status}</p>}
      </section>
    );
  }
}