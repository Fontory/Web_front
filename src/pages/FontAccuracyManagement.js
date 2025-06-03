import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

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
  const [avgScore, setAvgScore] = useState(0);
  const [scoreBuckets, setScoreBuckets] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(getTodayString());
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [versionName, setVersionName] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAccuracyData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return alert('관리자 인증 토큰이 없습니다.');

        const { data } = await axios.post(
          'http://ceprj.gachon.ac.kr:60023/admin/aimodel/accuracy',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { fonts, averageAccuracy, averageRating } = data;
        setFontData(fonts);
        setAvgAccuracy(averageAccuracy);
        setAvgRating(averageRating);

        const scores = fonts.map(f => 0.7 * (f.accuracy || 0) + 0.3 * ((f.rating || 0) / 5));
        const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        setAvgScore(avg);

        const buckets = Array.from({ length: 10 }, (_, i) => ({
          range: `${(i * 0.1).toFixed(1)}-${((i + 1) * 0.1).toFixed(1)}`,
          count: 0
        }));
        scores.forEach(score => {
          const index = Math.min(Math.floor(score * 10), 9);
          buckets[index].count++;
        });
        setScoreBuckets(buckets);
      } catch (err) {
        console.error('정확도 데이터 가져오기 실패:', err);
        alert('서버와의 연결에 실패했습니다.');
      }
    };

    fetchAccuracyData();
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) return alert('시작일과 종료일을 모두 선택해주세요.');

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const filtered = fontData.filter(font => {
      const createdAt = new Date(font.createdAt);
      const score = 0.7 * (font.accuracy || 0) + 0.3 * ((font.rating || 0) / 5);
      return createdAt >= sDate && createdAt <= eDate && score >= 0.85;
    });

    setFilteredFonts(filtered);
    setShowPopup(true);
  };

  const handleUploadToServer = async () => {
    if (!versionName.trim()) {
      alert('버전명을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return alert('관리자 인증 토큰이 없습니다.');

      const copyPayload = filteredFonts.map(f => ({ name: f.name, ttfFileName: f.ttfFileName }));

      const copyResponse = await axios.post(
        'http://ceprj.gachon.ac.kr:60023/admin/aimodel/retrain-copy',
        copyPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(copyResponse.data); // ✅ 서버 메시지 출력

      const payload = {
        versionName: versionName.trim(),
        description: `(${startDate} ~ ${endDate}) 성능 점수 0.85 이상 학습 데이터 ${filteredFonts.length}개 재학습`, // ✅ 길이 확장
        isCurrentVersion: true
      };


      console.log("📤 보내는 description:", payload.description);


      await axios.post(
        'http://ceprj.gachon.ac.kr:60023/admin/ai-versions',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert('AI 모델 버전이 저장되었습니다.');
      setShowConfirmPopup(false);
      setShowPopup(false);
    } catch (err) {
      console.error('AI 버전 정보 저장 실패:', err.response?.data || err.message);
      alert('버전 저장 중 오류 발생: ' + (err.response?.data?.message || err.message));
    }
  };

  const calculateScore = (accuracy, rating) => (0.7 * (accuracy || 0) + 0.3 * ((rating || 0) / 5)).toFixed(3);

  const getScoreColor = score => {
    const value = parseFloat(score);
    const red = Math.round(255 * (1 - value));
    const green = Math.round(255 * value);
    return `rgb(${red}, ${green}, 100)`;
  };

  const paginatedFonts = fontData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(fontData.length / itemsPerPage);

  return (
    <div style={{ padding: '30px', backgroundColor: '#fafafa' }}>
      <div style={styles.tabs}>
        <button style={location.pathname === '/ai' ? styles.tabActive : styles.tab} onClick={() => navigate('/ai')}>AI 모델 버전 관리</button>
        <button style={location.pathname === '/font-accuracy' ? styles.tabActive : styles.tab} onClick={() => navigate('/font-accuracy')}>폰트 정확도 관리</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={styles.metricCardBlue}><div>평균 정확도(%)</div><div style={styles.metricValue}>{(avgAccuracy * 100).toFixed(1)}%</div></div>
        <div style={styles.metricCardBlue}><div>평균 별점(1~5)</div><div style={styles.metricValue}>{avgRating.toFixed(1)}</div></div>
        <div style={styles.metricCardBlue}><div>평균 성능 점수</div><div style={styles.metricValue}>{avgScore.toFixed(3)}</div></div>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '12px' }}>성능 점수 분포</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={scoreBuckets}>
            <XAxis dataKey="range" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8"><LabelList dataKey="count" position="top" /></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table style={{ width: '100%', background: '#fff', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>폰트 ID</th>
            <th style={styles.th}>이름</th>
            <th style={styles.th}>사용자</th>
            <th style={styles.th}>정확도</th>
            <th style={styles.th}>별점</th>
            <th style={styles.th}>생성일</th>
            <th style={styles.th}>성능 점수</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFonts.map((font, idx) => {
            const score = calculateScore(font.accuracy, font.rating);
            return (
              <tr key={font.fontId}>
                <td style={styles.td}>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td style={styles.td}>{font.fontId}</td>
                <td style={styles.td}>{font.name}</td>
                <td style={styles.td}>{font.userId}</td>
                <td style={styles.td}>{(font.accuracy * 100).toFixed(1)}%</td>
                <td style={styles.td}>{font.rating?.toFixed(1)}</td>
                <td style={styles.td}>{new Date(font.createdAt).toLocaleDateString()}</td>
                <td style={{ ...styles.td, color: getScoreColor(score), fontWeight: 'bold' }}>{score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <span key={i + 1} onClick={() => setCurrentPage(i + 1)} style={{ margin: '0 6px', cursor: 'pointer', fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}>{i + 1}</span>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label>시작일: </label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <label style={{ marginLeft: '16px' }}>종료일: </label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button style={{ marginLeft: '16px' }} onClick={handleFilter}>재학습 폰트 데이터 추출</button>
      </div>

      {showPopup && (
        <div style={styles.popup}>
          <h3>재학습 대상 폰트 목록</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={styles.th}>폰트 ID</th>
                <th style={styles.th}>이름</th>
                <th style={styles.th}>사용자</th>
                <th style={styles.th}>정확도</th>
                <th style={styles.th}>별점</th>
                <th style={styles.th}>성능 점수</th>
              </tr>
            </thead>
            <tbody>
              {filteredFonts.map(font => {
                const score = calculateScore(font.accuracy, font.rating);
                return (
                  <tr key={font.fontId}>
                    <td style={styles.td}>{font.fontId}</td>
                    <td style={styles.td}>{font.name}</td>
                    <td style={styles.td}>{font.userId}</td>
                    <td style={styles.td}>{(font.accuracy * 100).toFixed(1)}%</td>
                    <td style={styles.td}>{font.rating?.toFixed(1)}</td>
                    <td style={{ ...styles.td, color: getScoreColor(score), fontWeight: 'bold' }}>{score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button style={{ marginRight: '12px' }} onClick={() => setShowConfirmPopup(true)}>학습 데이터 업데이트</button>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}
      {showConfirmPopup && (
        <div style={styles.popup}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>AI 모델 버전이 다음과 같이 업데이트 됩니다</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>버전명</div>
              <input
                type="text"
                placeholder="버전명을 입력하세요"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                style={{ width: '120px', padding: '8px', fontSize: '14px', textAlign: 'center', marginBottom: '4px' }}
              />
            </div>
            <div style={{ flex: 2, textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>설명</div>
              <p style={{ margin: 0 }}>({startDate} ~ {endDate}) 성능 점수 0.85 이상 학습 데이터 {filteredFonts.length}개 재학습</p>
            </div>
          </div>
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
  metricCardBlue: {
    backgroundColor: '#f5f8ff',
    flex: 1,
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  metricValue: { fontSize: '28px', marginTop: '10px' },
  th: { textAlign: 'center', padding: '10px', fontWeight: 'bold' },
  td: { textAlign: 'center', padding: '10px' },
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
};

export default FontAccuracyManagement;
