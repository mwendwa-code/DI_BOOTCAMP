import { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutoCompletedText from './AutoCompletedText.js';
import ErrorBoundary from './ErrorBoundary.js';
import Example1 from './Example1.js';
import Example2 from './Example2.js';
import Example3 from './Example3.js';
import BackendData from './Exercise xp ninja.jsx';
import PostList, { UsersList } from './Mini project/users and post.js';
import { AxiosPostForm, FetchPostForm } from './exercise xp gold.js';

function HomeScreen() {
  return <h1>Home</h1>;
}

function ProfileScreen() {
  return <h1>Profile</h1>;
}

function ShopScreen() {
  throw new Error('The shop is currently unavailable.');
}

function WebhookForm() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [status, setStatus] = useState('');

  const sendData = async (event) => {
    event.preventDefault();
    setStatus('Sending request...');

    try {
      const response = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key1: 'myusername',
          email: 'mymail@gmail.com',
          name: 'Isaac',
          lastname: 'Doe',
          age: 27
        })
      });
      const responseBody = await response.text();

      console.log('Webhook response:', {
        status: response.status,
        body: responseBody
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}.`);
      }

      setStatus('Response logged to the console.');
    } catch (error) {
      console.error('Unable to send data to the webhook:', error);
      setStatus(`Request failed: ${error.message}`);
    }
  };

  return (
    <section className="exercise-section" aria-labelledby="post-json-heading">
      <h2 id="post-json-heading">Post JSON data</h2>
      <p>
        Paste your webhook.site unique URL below after enabling CORS on the
        webhook page.
      </p>
      <form className="row g-2" onSubmit={sendData}>
        <div className="col-12 col-md-9">
          <label className="visually-hidden" htmlFor="webhook-url">
            Webhook URL
          </label>
          <input
            className="form-control"
            id="webhook-url"
            type="url"
            placeholder="https://webhook.site/your-unique-url"
            value={webhookUrl}
            onChange={(event) => setWebhookUrl(event.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md-3">
          <button className="btn btn-primary w-100" type="submit">
            Send JSON
          </button>
        </div>
      </form>
      {status && (
        <p className="mt-2" role="status">
          {status}
        </p>
      )}
    </section>
  );
}

function App() {
  const navLinkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active-nav-link' : ''}`;

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">React Exercises</span>
          <div className="navbar-nav">
            <NavLink className={navLinkClass} end to="/">
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/profile">
              Profile
            </NavLink>
            <NavLink className={navLinkClass} to="/shop">
              Shop
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container app-content py-4">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
        </Routes>

        <section className="exercise-section" aria-labelledby="posts-heading">
          <h2 id="posts-heading">Posts</h2>
          <PostList />
        </section>

        <section className="exercise-section" aria-labelledby="users-heading">
          <h2 id="users-heading">Users</h2>
          <UsersList />
        </section>

        <AutoCompletedText />

        <BackendData />

        <section className="exercise-section" aria-labelledby="json-data-heading">
          <h2 id="json-data-heading">Parsed JSON data</h2>
          <Example1 />
          <Example2 />
          <Example3 />
        </section>

        <WebhookForm />
        <FetchPostForm />
        <AxiosPostForm />
      </main>
    </BrowserRouter>
  );
}

export default App;
