// src/pages/AiModelManagement.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AiModelManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [models, setModels] = useState([
    { version: '0.5v', description: '학습 데이터 추가' },
    { version: '0.7v', description: '학습 데이터 추가' },
  ]);
  const [newVersion, setNewVersion] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAdd = () => {
    if (!newVersion || !newDesc) return;
    setModels([...models, { version: newVersion, description: newDesc }]);
    setNewVersion('');
    setNewDesc('');
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
              <td style={styles.td}>{m.version}</td>
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
