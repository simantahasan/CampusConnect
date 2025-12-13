import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  const fetchPosts = async (sort = 'latest') => {
    try {
      const res = await axios.get(`http://localhost:1049/api/posts?sort=${sort}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts(); // default fetch latest posts
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Community Feed</h2>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={() => fetchPosts('latest')}>Latest</button>
        <button onClick={() => fetchPosts('popular')} style={{ marginLeft: '10px' }}>
          Popular
        </button>
      </div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <p>{post.content}</p>
            <small>
              Likes: {post.likesCount} | Comments: {post.commentsCount}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;

