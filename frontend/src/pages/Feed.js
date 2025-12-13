import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('latest');

  const fetchPosts = async (type) => {
    try {
      const res = await axios.get(
        `http://localhost:1049/api/posts?sort=${type}`
      );
      setPosts(res.data);
      setSortType(type);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts('latest');
  }, []);

  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      
      {/* SORT BUTTONS */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={() => fetchPosts('latest')}>Latest</button>
        <button onClick={() => fetchPosts('popular')} style={{ marginLeft: '10px' }}>
          Popular
        </button>
      </div>

      {/* POSTS */}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}
        >
          <p><strong>Post:</strong> {post.content}</p>
          <p>👍 Likes: {post.likesCount}</p>
          <p>
            🕒 Updated:{' '}
            {new Date(post.updatedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
