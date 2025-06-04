// src/pages/QuoteManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance'; // 공통 인스턴스 사용

const QuoteManagement = () => {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuote, setNewQuote] = useState('');

  const fetchQuotes = async () => {
    try {
      const res = await axios.get('/admin/quotes', {
        params: {
          keyword: searchTerm,
          page: 0,
          size: 100,
        },
      });
      setQuotes(res.data.content);
    } catch (err) {
      console.error('❌ 인용구 목록 불러오기 실패:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`/admin/quotes/${id}`);
      fetchQuotes();
    } catch (err) {
      console.error('❌ 인용구 삭제 실패:', err);
    }
  };


  const handleSearch = () => {
    fetchQuotes();
  };

  const handleAdd = async () => {
    if (!newQuote.trim()) return alert('문구를 입력해주세요!');
    try {
      await axios.post('/admin/quotes', { content: newQuote });
      setNewQuote('');
      fetchQuotes();
    } catch (err) {
      console.error('❌ 인용구 추가 실패:', err);
    }
  };

  const handleEdit = async (id, currentText) => {
    const updated = prompt('수정할 문구를 입력하세요:', currentText);
    if (!updated) return;
    try {
      await axios.put(`/admin/quotes/${id}`, { content: updated });
      fetchQuotes();
    } catch (err) {
      console.error('❌ 인용구 수정 실패:', err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.controls}>
        <div style={styles.addGroup}>
          <input
            type="text"
            placeholder="새 인용구 입력"
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            style={styles.input}
          />
          <button style={styles.addButton} onClick={handleAdd}>추가하기</button>
        </div>
        <div style={styles.searchGroup}>
          <input
            type="text"
            placeholder="문구 검색"
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
            <th style={styles.th}>관리</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q, index) => (
            <tr key={q.quoteId}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{q.content}</td>
              <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(q.quoteId, q.content)}>
                    수정
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(q.quoteId)}>
                    삭제
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>총 {quotes.length}개</div>
    </div>
  );
};

const styles = {
  wrapper: { padding: '30px', backgroundColor: '#fafafa' },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  addGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
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
  deleteBtn: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    marginLeft: '8px',
    cursor: 'pointer',
  },

};

export default QuoteManagement;
