// src/pages/NotebookManagement.js
import React, { useState } from 'react';

const dummyNotebooks = [
  { id: 1, image: '/images/notebook1.png' },
  { id: 2, image: '/images/notebook2.png' },
];

const NotebookManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    alert(`'${searchTerm}' 내용으로 연습장 검색!`);
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: '16px' }}>연습장 관리</h3>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="연습장 내용에서 찾기"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button style={styles.searchButton} onClick={handleSearch}>검색</button>
      </div>

      <div style={styles.imageContainer}>
        {dummyNotebooks.map((notebook) => (
          <img
            key={notebook.id}
            src={notebook.image}
            alt="노트북 이미지"
            style={styles.image}
          />
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
  searchBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    alignItems: 'center',
  },
  input: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '220px',
  },
  searchButton: {
    background: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  imageContainer: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  image: {
    width: '120px',
    height: '160px',
    objectFit: 'cover',
    border: '1px solid #ccc',
  },
};

export default NotebookManagement;
