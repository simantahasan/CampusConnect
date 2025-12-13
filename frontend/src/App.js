import React from 'react';
import Feed from './pages/Feed';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ background: '#f5f5f5', padding: '10px', textAlign: 'center' }}>
        <h1>CampusConnect – Post Sorting Feature</h1>
        <p>Latest & Popular Posts</p>
      </header>

      <main style={{ padding: '20px' }}>
        <Feed />
      </main>
    </div>
  );
}

export default App;

