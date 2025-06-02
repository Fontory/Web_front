import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const getTodayString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const FontAccuracyManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fontData, setFontData] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(getTodayString());
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

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
            headers: { Authorization: `Bearer ${token}` },
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

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert('시작일과 종료일을 모두 선택해주세요.');
      return;
    }

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const filtered = fontData
      .filter((font) => {
        const createdAt = new Date(font.createdAt);
        const combinedScore = 0.7 * (font.accuracy || 0) + 0.3 * ((font.rating || 0) / 5);
        return createdAt >= sDate && createdAt <= eDate && combinedScore >= 0.85;
      });

    setFilteredFonts(filtered);
    setShowPopup(true);
  };

  const handleUploadConfirm = () => {
    setShowConfirmPopup(true);
  };

  const handleUploadToServer = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('관리자 인증 토큰이 없습니다.');
        return;
      }

      const payload = filteredFonts.map(({ name, ttfFileName }) => ({
        name,
        ttfFileName,
      }));

      const response = await axios.post(
        'http://ceprj.gachon.ac.kr:60023/admin/aimodel/retrain-copy',
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data);
      setShowConfirmPopup(false);
      setShowPopup(false);
    } catch (error) {
      console.error('학습 데이터 전송 실패:', error);
      alert('학습 데이터 전송 중 오류 발생');
    }
  };

  const calculateScore = (accuracy, rating) => {
    return (0.7 * (accuracy || 0) + 0.3 * ((rating || 0) / 5)).toFixed(3);
  };

  const getScoreColor = (score) => {
    const value = parseFloat(score);
    const red = Math.round(255 * (1 - value));
    const green = Math.round(255 * value);
    return `rgb(${red}, ${green}, 100)`;
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

      <div style={styles.metrics}>
        <div style={styles.metricCardBlue}>
          <div>평균 정확도(%)</div>
          <div style={styles.metricValue}>{(avgAccuracy * 100).toFixed(1)}%</div>
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
            <th style={styles.th}>정확도</th>
            <th style={styles.th}>별점</th>
            <th style={styles.th}>생성일</th>
            <th style={styles.th}>성능 점수</th>
          </tr>
        </thead>
        <tbody>
          {fontData.map((item, index) => {
            const score = calculateScore(item.accuracy, item.rating);
            return (
              <tr key={item.fontId}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item.fontId}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.userId}</td>
                <td style={styles.td}>{(item.accuracy * 100).toFixed(1)}%</td>
                <td style={styles.td}>{item.rating?.toFixed(1)}</td>
                <td style={styles.td}>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.scoreText, color: getScoreColor(score), borderColor: getScoreColor(score) }}>
                    {score}
                  </span>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <label>시작일: </label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label style={{ marginLeft: '16px' }}>종료일: </label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button style={{ marginLeft: '16px' }} onClick={handleFilter}>
          재학습 폰트 데이터 추출
        </button>
      </div>

      {showPopup && (
        <div style={styles.popup}>
          <h3>재학습 대상 폰트 목록</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>폰트ID</th>
                <th style={styles.th}>폰트이름</th>
                <th style={styles.th}>유저 ID</th>
                <th style={styles.th}>정확도</th>
                <th style={styles.th}>별점</th>
                <th style={styles.th}>생성일</th>
                <th style={styles.th}>성능 점수</th>
              </tr>
            </thead>
            <tbody>
              {filteredFonts.map((item) => {
                const score = calculateScore(item.accuracy, item.rating);
                return (
                  <tr key={item.fontId}>
                    <td style={styles.td}>{item.fontId}</td>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>{item.userId}</td>
                    <td style={styles.td}>{(item.accuracy * 100).toFixed(2)}%</td>
                    <td style={styles.td}>{item.rating?.toFixed(2)}</td>
                    <td style={styles.td}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.scoreText, color: getScoreColor(score), borderColor: getScoreColor(score) }}>
                        {score}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button style={{ marginRight: '12px' }} onClick={handleUploadConfirm}>
              학습 데이터 업데이트
            </button>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}

      {showConfirmPopup && (
        <div style={styles.popup}>
          <h3>AI 모델 버전이 다음과 같이 업데이트 됩니다</h3>
          <p style={{ marginTop: '12px' }}>
            ({startDate} ~ {endDate}) 성능 점수 0.85점 이상 학습 데이터 {filteredFonts.length}개 재학습
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button style={{ marginRight: '12px' }} onClick={handleUploadToServer}>확인</button>
            <button onClick={() => setShowConfirmPopup(false)}>취소</button>
          </div>
        </div>
      )}
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
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '24px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    zIndex: 999,
    width: '600px',
  },
  scoreText: {
    border: '1px solid',
    borderRadius: '4px',
    padding: '2px 6px',
    fontWeight: 'bold',
    display: 'inline-block',
  }


};

export default FontAccuracyManagement;
