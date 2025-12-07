import React, { useState } from 'react';
import axios from 'axios';

function VerifyStudent() {
  const [form, setForm] = useState({ name: '', studentId: '', gsuiteEmail: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1049/api/verify/student', form);
      setResult(res.data);
    } catch (err) {
      setResult(err.response?.data || { success: false, message: 'Error connecting to server' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Verify Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          name="gsuiteEmail"
          placeholder="G-Suite Email"
          value={form.gsuiteEmail}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Verify</button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Verification Result:</h3>
          <p>Status: {result.success ? '✅ Verified' : '❌ Not Verified'}</p>
          {result.reason && <p>Reason: {result.reason}</p>}
          <pre>{JSON.stringify(result.details || result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default VerifyStudent;

