import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const SERVER_URL = 'http://ceprj.gachon.ac.kr:60023';

const NotebookManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sheets, setSheets] = useState([]);

  const fetchSheets = async () => {
    try {
      const res = await axiosInstance.get('/admin/practice-sheets', {
        params: {
          keyword: searchTerm,
          page: 0,
          size: 20,
        },
      });
      console.log('📦 연습장 목록 불러오기 성공:', res.data.content);
      setSheets(res.data.content);
    } catch (err) {
      console.error('❌ 연습장 목록 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchSheets();
  }, []);

  const handleSearch = () => {
    fetchSheets();
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#fafafa' }}>
      <h2 style={{ marginBottom: '20px' }}>연습장 관리</h2>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="문구 또는 사용자 검색"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '220px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {sheets.map((sheet) => (
          <div key={sheet.sheetId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '160px' }}>
            <img
              src={`${SERVER_URL}${sheet.imageUrl}`}
              alt={sheet.phrase}
              style={{ width: '120px', height: '160px', objectFit: 'cover', border: '1px solid #ccc', marginBottom: '8px' }}
            />
            <p>{sheet.phrase}</p>
            <p>작성자: {sheet.nickname}</p>
            <a
              href={`${SERVER_URL}${sheet.imageUrl}`}
              style={{
                textDecoration: 'none',
                padding: '4px 8px',
                backgroundColor: '#222',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                marginTop: '4px',
              }}
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

export default NotebookManagement;
