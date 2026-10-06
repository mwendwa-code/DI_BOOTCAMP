import { Component } from 'react';

export class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: '',
      isLoaded: false
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      const posts = await response.json();
      this.setState({ posts, isLoaded: true });
    } catch (error) {
      this.setState({ errorMsg: error.message, isLoaded: true });
    }
  }

  render() {
    const { posts, errorMsg, isLoaded } = this.state;

    if (!isLoaded) {
      return <p role="status">Loading posts...</p>;
    }

    if (errorMsg) {
      return <p className="text-danger" role="alert">Unable to load posts: {errorMsg}</p>;
    }

    return (
      <div className="row g-3">
        {posts.map((post) => (
          <div className="col-12 col-md-6" key={post.id}>
            <article className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5">{post.title}</h3>
                <p className="card-text">{post.body}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  }
}

export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      errorMsg: ''
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      const users = await response.json();
      this.setState({ users, isLoaded: true });
    } catch (error) {
      this.setState({ errorMsg: error.message, isLoaded: true });
    }
  }

  render() {
    const { users, isLoaded, errorMsg } = this.state;

    if (!isLoaded) {
      return <p role="status">Loading users...</p>;
    }

    if (errorMsg) {
      return <p className="text-danger" role="alert">Unable to load users: {errorMsg}</p>;
    }

    return (
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex flex-column flex-sm-row justify-content-between gap-1"
            key={user.id}
          >
            <span className="fw-semibold">{user.name}</span>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </li>
        ))}
      </ul>
    );
  }
}

export default PostList;