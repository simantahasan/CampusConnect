import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [gsuiteEmail, setGsuiteEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1049/api/auth/register', {
        name, studentId, gsuiteEmail, password
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="email" placeholder="G-Suite Email" value={gsuiteEmail} onChange={e => setGsuiteEmail(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
