import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import NotebookManagement from './NotebookManagement';
import BackgroundManagement from './NotebookBackgroundManagement';
import QuoteManagement from './QuoteManagement';
import BoardManagement from './BoardManagement';

const SERVER_URL = 'http://ceprj.gachon.ac.kr:60023';

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('font');
  const [fonts, setFonts] = useState([]);
  const [editingFont, setEditingFont] = useState(null);
  const [ttfFile, setTtfFile] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchFonts = async () => {
    try {
      const res = await axiosInstance.get('/admin/fonts', {
        params: {
          keyword: searchKeyword,
          page: 0,
          size: 10,
        },
      });
      console.log('📦 서버에서 받은 폰트 목록:', res.data.content);
      setFonts(res.data.content);
    } catch (err) {
      console.error('❌ 폰트 목록 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'font') {
      fetchFonts();
    }
  }, [activeTab]);

  const handleEdit = (font) => setEditingFont(font);

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axiosInstance.delete(`/admin/fonts/${id}`);
        setFonts((prev) => prev.filter((f) => f.fontId !== id));
      } catch (err) {
        console.error('❌ 폰트 삭제 실패:', err);
      }
    }
  };

  const handleSave = async (updatedFont) => {
    try {
      const res = await axiosInstance.put(`/admin/fonts/${updatedFont.fontId}`, updatedFont);
      console.log('✅ 폰트 수정 완료:', res.data);
      setFonts((prev) =>
        prev.map((f) => (f.fontId === updatedFont.fontId ? updatedFont : f))
      );
      setEditingFont(null);
    } catch (err) {
      console.error('❌ 폰트 수정 실패:', err);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  const renderContent = () => {
    if (activeTab === 'note') return <NotebookManagement />;
    if (activeTab === 'background') return <BackgroundManagement />;
    if (activeTab === 'quote') return <QuoteManagement />;
    if (activeTab === 'board') return <BoardManagement />;

    if (activeTab === 'font') {
      return (
        <>
          {/* 검색창 */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="폰트 이름 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ padding: '8px', width: '200px', marginRight: '8px' }}
            />
            <button onClick={fetchFonts} style={styles.editBtn}>검색</button>
          </div>

          {/* TTF 업로드 UI */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="file"
              accept=".ttf"
              onChange={(e) => setTtfFile(e.target.files[0])}
            />
            {ttfFile && (
              <span style={{ marginLeft: '12px' }}>
                📁 선택한 파일: {ttfFile.name}
              </span>
            )}
          </div>

          {/* 폰트 테이블 */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>번호</th>
                <th style={styles.th}>폰트이름</th>
                <th style={styles.th}>유저ID</th>
                <th style={styles.th}>TTF 파일</th>
                <th style={styles.th}>원본 이미지</th>
                <th style={styles.th}>생성일</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {fonts.map((font, index) => (
                <tr key={font.fontId}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{font.name}</td>
                  <td style={styles.td}><strong>{font.userId}</strong></td>
                  <td style={styles.td}>{font.ttfUrl}</td>
                  <td style={styles.td}>
                    <img
                      src={`${SERVER_URL}${font.originalImageUrl}`}
                      alt="원본"
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td style={styles.td}>{new Date(font.createdAt).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, ...styles.buttonCell }}>
                    <button style={styles.editBtn} onClick={() => handleEdit(font)}>수정</button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(font.fontId)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    return <p style={styles.message}>준비 중입니다...</p>;
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tabs}>
        {['font', 'note', 'background', 'quote', 'board'].map((tabKey, i) => {
          const tabNames = [
            '폰트 관리',
            '연습장 관리',
            '연습장 배경 관리',
            '필사 문구 관리',
            '게시판 관리',
          ];
          return (
            <button
              key={tabKey}
              style={activeTab === tabKey ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab(tabKey)}
            >
              {tabNames[i]}
            </button>
          );
        })}
      </div>

      {renderContent()}

      {editingFont && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.modal}>
            <h3>폰트 수정</h3>
            <label>폰트 이름</label>
            <input
              value={editingFont.name}
              onChange={(e) => setEditingFont({ ...editingFont, name: e.target.value })}
              style={modalStyle.input}
            />

            <label>TTF 파일 경로</label>
            <input
              value={editingFont.ttfUrl}
              onChange={(e) => setEditingFont({ ...editingFont, ttfUrl: e.target.value })}
              style={modalStyle.input}
            />

            <label>원본 이미지 경로</label>
            <input
              value={editingFont.originalImageUrl}
              onChange={(e) => setEditingFont({ ...editingFont, originalImageUrl: e.target.value })}
              style={modalStyle.input}
            />

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <button onClick={() => handleSave(editingFont)} style={modalStyle.saveBtn}>저장</button>
              <button onClick={() => setEditingFont(null)} style={modalStyle.cancelBtn}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 💅 스타일
const styles = {
  wrapper: { padding: '30px', backgroundColor: '#fafafa' },
  tabs: { display: 'flex', gap: '20px', marginBottom: '24px' },
  tab: {
    background: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',   // 👈 충돌 안 나도록 명시적
    fontSize: '16px',
    color: '#888',
    cursor: 'pointer',
    paddingBottom: '8px',
  },
  tabActive: {
    background: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '2px solid black',  // 👈 강조만 여기서
    fontSize: '16px',
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: '8px',
    cursor: 'pointer',
  },

  table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0', background: '#fff', borderRadius: '12px', overflow: 'hidden', tableLayout: 'fixed' },
  th: { textAlign: 'center', padding: '12px 16px', fontWeight: 'bold' },
  td: { textAlign: 'center', padding: '12px 16px', verticalAlign: 'middle', wordBreak: 'break-word' },
  buttonCell: { display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' },
  editBtn: { backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '20px', padding: '6px 12px', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '20px', padding: '6px 12px', cursor: 'pointer' },
  message: { fontSize: '16px', color: '#111', marginTop: '20px', paddingLeft: '10px' },
};

const modalStyle = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: '8px', padding: '24px', width: '400px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' },
  input: { width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc' },
  saveBtn: { padding: '8px 16px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', marginRight: '8px', cursor: 'pointer' },
  cancelBtn: { padding: '8px 16px', backgroundColor: '#888', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default DataManagement;
