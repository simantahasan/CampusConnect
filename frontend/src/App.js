import React from 'react';
import VerifyStudent from './pages/VerifyStudent';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ background: '#f5f5f5', padding: '10px', textAlign: 'center' }}>
        <h1>CampusConnect - Student Verification</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <VerifyStudent />
      </main>
    </div>
  );
}

export default App;
