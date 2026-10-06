import { Component } from 'react';

class BackendData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      customers: [],
      usersLoaded: false,
      customersLoaded: false,
      usersError: '',
      customersError: ''
    };
  }

  componentDidMount() {
    this.loadUsers();
    this.loadCustomers();
  }

  loadUsers = async () => {
    try {
      const response = await fetch('/users');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }
      const users = await response.json();
      this.setState({ users, usersLoaded: true });
    } catch (error) {
      this.setState({ usersError: error.message, usersLoaded: true });
    }
  };

  loadCustomers = async () => {
    try {
      const response = await fetch('/api/customers/');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }
      const customers = await response.json();
      this.setState({ customers, customersLoaded: true });
    } catch (error) {
      this.setState({ customersError: error.message, customersLoaded: true });
    }
  };

  renderUsers() {
    const { users, usersLoaded, usersError } = this.state;

    if (!usersLoaded) {
      return <p role="status">Loading users...</p>;
    }

    if (usersError) {
      return <p className="text-danger" role="alert">Unable to load users: {usersError}</p>;
    }

    return (
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    );
  }

  renderCustomers() {
    const { customers, customersLoaded, customersError } = this.state;

    if (!customersLoaded) {
      return <p role="status">Loading customers...</p>;
    }

    if (customersError) {
      return (
        <p className="text-danger" role="alert">
          Unable to load customers: {customersError}
        </p>
      );
    }

    return (
      <div className="row g-3">
        {customers.map((customer) => (
          <div className="col-12 col-sm-6 col-md-4" key={customer.id}>
            <article className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5">
                  {customer.firstName} {customer.lastName}
                </h3>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <>
        <section className="exercise-section" aria-labelledby="backend-users-heading">
          <h2 id="backend-users-heading">Users from Express</h2>
          {this.renderUsers()}
        </section>
        <section
          className="exercise-section"
          aria-labelledby="backend-customers-heading"
        >
          <h2 id="backend-customers-heading">Customers from Express</h2>
          {this.renderCustomers()}
        </section>
      </>
    );
  }
}

export default BackendData;