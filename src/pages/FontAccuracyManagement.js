import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const FontAccuracyManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fontData, setFontData] = useState([]);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchAccuracyData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          alert('관리자 인증 토큰이 없습니다.');
          return;
        }

        const response = await axios.post(
          'http://ceprj.gachon.ac.kr:60023/admin/aimodel/accuracy',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { fonts, averageAccuracy, averageRating } = response.data;
        setFontData(fonts);
        setAvgAccuracy(averageAccuracy);
        setAvgRating(averageRating);
      } catch (error) {
        console.error('정확도 데이터 가져오기 실패:', error);
        alert('서버와의 연결에 실패했습니다.');
      }
    };

    fetchAccuracyData();
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* 탭 메뉴 */}
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

      {/* 평균 값 카드 */}
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

      {/* 폰트 테이블 */}
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
            <tr key={item.fontId}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{item.fontId}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.userId}</td>
              <td style={styles.td}>{item.accuracy?.toFixed(1)}</td>
              <td style={styles.td}>{item.rating?.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>1</div>
    </div>
  );
};

// 스타일은 기존과 동일
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
    backgroundColor: '#f5f8ff',
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
