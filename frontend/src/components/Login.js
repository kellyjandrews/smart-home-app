import React, { useState } from 'react';
import { useAuth } from '../context/firebase';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    return login(email, password);
  }

  return (
    <form className="form-group" onSubmit={handleSubmit} >
      <input
        className="form-input"
        type="text"
        id="username"
        placeholder="Username"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-primary input-group-btn" type="submit">Login</button>
    </form>
  )
}

export default Login;