// src/pages/QuoteManagement.js
import React, { useState } from 'react';

const dummyQuotes = [
  { id: 1, text: '존재하는 것을 변화시키는 것은 성숙하게 만드는 것이다.' },
  { id: 2, text: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다.' },
];

const QuoteManagement = () => {
  const [quotes, setQuotes] = useState(dummyQuotes);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    alert(`'${searchTerm}' 검색`);
  };

  const handleEdit = (id) => {
    alert(`${id}번 문구 수정하기`);
  };

  const handleAdd = () => {
    alert('문구 추가하기');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.controls}>
        <button style={styles.addButton} onClick={handleAdd}>추가하기</button>
        <div style={styles.searchGroup}>
          <input
            type="text"
            placeholder="문구 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>검색</button>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>번호</th>
            <th style={styles.th}>문구</th>
            <th style={styles.th}>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q, index) => (
            <tr key={q.id}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{q.text}</td>
              <td style={styles.td}>
                <button style={styles.editBtn} onClick={() => handleEdit(q.id)}>수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>1</div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#fafafa',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  addButton: {
    background: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 20px',
    cursor: 'pointer',
  },
  searchGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    padding: '8px',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  searchBtn: {
    background: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  th: {
    textAlign: 'center',
    padding: '12px 16px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
  td: {
    textAlign: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
  },
  editBtn: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default QuoteManagement;
