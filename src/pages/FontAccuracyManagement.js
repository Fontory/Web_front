// src/pages/FontAccuracyManagement.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FontAccuracyManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fontData = [
    { id: 1, name: '성실체', userId: 'abc123', accuracy: 70, rating: 5 },
    { id: 2, name: '강부장님체', userId: 'gang123', accuracy: 63, rating: 4 },
  ];

  const avgAccuracy =
    fontData.reduce((sum, item) => sum + item.accuracy, 0) / fontData.length;

  const avgRating =
    fontData.reduce((sum, item) => sum + item.rating, 0) / fontData.length;

  return (
    <div style={styles.wrapper}>
      <div style={styles.tabs}>
        <button
          style={location.pathname === '/ai' ? styles.tab : styles.tab}
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

      <div style={styles.metrics}>
        <div style={styles.metricCardBlue}>
          <div>평균 정확도(%)</div>
          <div style={styles.metricValue}>{avgAccuracy.toFixed(1)}</div>
        </div>
        <div style={styles.metricCardBlue}>
          <div>평균 별점(1~5)</div>
          <div style={styles.metricValue}>{avgRating.toFixed(1)}</div>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>번호</th>
            <th style={styles.th}>폰트ID</th>
            <th style={styles.th}>폰트이름</th>
            <th style={styles.th}>유저 ID</th>
            <th style={styles.th}>폰트 정확도(%)</th>
            <th style={styles.th}>사용자 별점</th>
          </tr>
        </thead>
        <tbody>
          {fontData.map((item, index) => (
            <tr key={item.id}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.userId}</td>
              <td style={styles.td}>{item.accuracy}</td>
              <td style={styles.td}>{item.rating}</td>
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
  metrics: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  metricCardBlue: {
    backgroundColor: '#f5f8ff', // 💙 원래 색상 복원
    flex: 1,
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  metricValue: {
    fontSize: '28px',
    marginTop: '10px',
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
};

export default FontAccuracyManagement;
