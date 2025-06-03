import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NotebookManagement = () => {
  const [sheets, setSheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSheets = async () => {
    try {
      const response = await axios.get(
        `http://ceprj.gachon.ac.kr:60023/admin/practice-sheets`,
        {
          params: {
            
            page: 0,
            size: 10,
          },
        }
      );
      setSheets(response.data.content); // content 배열에 연습장 목록 있음
    } catch (error) {
      console.error('❌ 연습장 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchSheets(); // 컴포넌트 초기 로딩 시 실행
  }, []);

  const handleSearch = () => {
    fetchSheets(); // 검색 버튼 누를 때도 다시 조회
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={{ marginBottom: '20px' }}>연습장 관리</h2>

      <div style={styles.searchBar}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="문구 또는 사용자 검색"
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.searchButton}>검색</button>
      </div>

      <div style={styles.imageContainer}>
        {sheets.map((sheet) => (
          <div key={sheet.sheetId} style={styles.item}>
            <img
              src={`http://ceprj.gachon.ac.kr:60023${sheet.imageUrl}`}
              alt={sheet.phrase}
              style={styles.image}
            />
            <p>{sheet.phrase}</p>
            <p>작성자: {sheet.nickname}</p>
            <a
              href={`http://ceprj.gachon.ac.kr:60023/practice-sheets/${sheet.sheetId}/download`}
              style={styles.downloadButton}
              download
            >
              다운로드
            </a>
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
  searchBar: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '220px',
  },
  searchButton: {
    background: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  imageContainer: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '160px',
  },
  image: {
    width: '120px',
    height: '160px',
    objectFit: 'cover',
    border: '1px solid #ccc',
    marginBottom: '8px',
  },
  downloadButton: {
    textDecoration: 'none',
    padding: '4px 8px',
    backgroundColor: '#222',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    marginTop: '4px',
  },
};

export default NotebookManagement;
