// src/pages/AiModelManagement.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AiModelManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [models, setModels] = useState([]);
  const [newVersion, setNewVersion] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    axios.get('http://ceprj.gachon.ac.kr:60023/admin/ai-versions')
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.id - b.id); // 🔽 오래된 → 최신 순
        setModels(sorted);
      })
      .catch((err) => {
        console.error('❌ 버전 목록 불러오기 실패:', err);
      });
  }, []);


  const handleAdd = () => {
    if (!newVersion || !newDesc) return;

    const newModel = {
      versionName: newVersion,
      description: newDesc,
      isCurrentVersion: true
    };

    axios.post('http://ceprj.gachon.ac.kr:60023/admin/ai-versions', newModel)
      .then(() => {
        return axios.get('http://ceprj.gachon.ac.kr:60023/admin/ai-versions');
      })
      .then((res) => {
        // ✅ id 오름차순 (최근 등록 항목이 아래로)
        const sorted = res.data.sort((a, b) => a.id - b.id);
        setModels(sorted);
        setNewVersion('');
        setNewDesc('');
      })
      .catch((err) => {
        console.error('❌ 등록 실패:', err);
        alert('등록에 실패했습니다.');
      });
  };





  return (
    <div style={styles.wrapper}>
      <div style={styles.tabs}>
        <button
          style={location.pathname === '/ai' ? styles.tabActive : styles.tab}
          onClick={() => navigate('/ai')}
        >
          AI 모델 버전 관리
        </button>
        <button
          style={location.pathname === '/font-accuracy' ? styles.tabActive : styles.tab}
          onClick={() => navigate('/font-accuracy')}
        >
          폰트 정확도 관리
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>버전</th>
            <th style={styles.th}>설명</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m, i) => (
            <tr key={i}>
              <td style={styles.td}>{m.versionName}</td>
              <td style={styles.td}>{m.description}</td>
            </tr>
          ))}
          <tr>
            <td style={styles.td}>
              <input
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                style={styles.input}
              />
            </td>
            <td style={styles.td}>
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAdd} style={styles.addBtn}>등록</button>
            </td>
          </tr>
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
  tabs: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
  },
  tab: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#888',
    cursor: 'pointer',
    paddingBottom: '8px',
  },
  tabActive: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: '8px',
    borderBottom: '2px solid black',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  th: {
    textAlign: 'center',
    padding: '12px 16px',
    fontWeight: 'bold',
    verticalAlign: 'middle',
  },
  td: {
    textAlign: 'center',
    padding: '12px 16px',
    verticalAlign: 'middle',
    wordBreak: 'break-word',
  },
  input: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginRight: '10px',
    width: '60%',
  },
  addBtn: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default AiModelManagement;
