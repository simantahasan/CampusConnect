import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1049/api/auth/login', { studentId, password });
      setMessage('Login successful!');
      setUser(res.data.user);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
      setUser(null);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      {user && (
        <div style={{ marginTop: '20px' }}>
          <h4>User Info:</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
