// src/pages/BoardManagement.js
import React from 'react';

const dummyPosts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  content: '오늘은 필사를 했다..',
}));

const BoardManagement = () => {
  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: '16px' }}>게시판 관리</h3>
      <div style={styles.grid}>
        {dummyPosts.map((post) => (
          <div key={post.id} style={styles.card}>
            <div style={styles.image}></div>
            <div style={styles.content}>{post.content}</div>
            <div style={styles.editIcon}>✎</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#fafafa',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100px',
    backgroundColor: '#ccc',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  content: {
    fontSize: '14px',
    color: '#333',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  editIcon: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#666',
  },
};

export default BoardManagement;
