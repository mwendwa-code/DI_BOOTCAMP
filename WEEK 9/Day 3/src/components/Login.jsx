import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Exercise xp gold.js';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(loginUser({ name: name.trim(), email: email.trim() }));
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="login-name">Name</label>
      <input
        id="login-name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        required
      />

      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
      />

      <button className="login-button" type="submit">
        Sign in
      </button>
      <p className="auth-note">Demo only: this form does not verify credentials.</p>
    </form>
  );
}
