import React, { useState } from 'react';
import EditDataModal from './EditData';
import NotebookManagement from './NotebookManagement';
import BackgroundManagement from './NotebookBackgroundManagement';
import QuoteManagement from './QuoteManagement';
import BoardManagement from './BoardManagement';

const dummyFonts = [
  {
    fontId: 3,
    userId: 'heir001',
    name: '빛의 계승자',
    ttf_url: 'HeirofLightRegular.ttf',
    original_image_url: '/handwritingSample.png',
    created_at: '2025-05-02T22:08:09',
  },
  {
    fontId: 4,
    userId: 'goheung001',
    name: '행복고흥',
    ttf_url: '행복고흥M.ttf',
    original_image_url: '/handwritingSample.png',
    created_at: '2025-05-02T22:08:09',
  },
  {
    fontId: 11,
    userId: 'mother1234',
    name: '딸에게 엄마가',
    ttf_url: '딸에게 엄마가.ttf',
    original_image_url: '/handwritingSample.png',
    created_at: '2025-05-22T22:46:59',
  },
  {
    fontId: 12,
    userId: 'sea1234',
    name: '세아체',
    ttf_url: '세아체.ttf',
    original_image_url: '/handwriting/sus32578/1748542437890/original.png',
    created_at: '2025-05-22T22:46:59',
  },
  {
    fontId: 13,
    userId: 'mugung1234',
    name: '무궁화',
    ttf_url: '무궁화.ttf',
    original_image_url: '/handwritingSample.png',
    created_at: '2025-05-22T22:46:59',
  },
  {
    fontId: 14,
    userId: 'sus32578',
    name: '다행체',
    ttf_url: '다행체.ttf',
    original_image_url: '/handwritingSample.png',
    created_at: '2025-05-23T22:15:58',
  },
  {
    fontId: 15,
    userId: 'sus32578',
    name: '아빠글씨',
    ttf_url: '아빠글씨.ttf',
    original_image_url: '/handwritingSample.png',
    created_at: '2025-05-23T22:39:55',
  },
];

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('font');
  const [fonts, setFonts] = useState(dummyFonts);
  const [editingFont, setEditingFont] = useState(null);
  const [ttfFile, setTtfFile] = useState(null);

  const handleEdit = (font) => {
    setEditingFont(font);
  };

  const handleDelete = (id) => {
    setFonts(fonts.filter((f) => f.fontId !== id));
  };

  const handleSave = (updatedFont) => {
    setFonts((prev) =>
      prev.map((f) => (f.fontId === updatedFont.fontId ? updatedFont : f))
    );
    setEditingFont(null);
  };

  const renderContent = () => {
    if (activeTab === 'note') return <NotebookManagement />;
    if (activeTab === 'background') return <BackgroundManagement />;
    if (activeTab === 'quote') return <QuoteManagement />;
    if (activeTab === 'board') return <BoardManagement />;

    if (activeTab === 'font') {
      return (
        <>
          {/* TTF 파일 업로드 영역 */}
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

          {/* 폰트 목록 테이블 */}
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
                  <td style={styles.td}>
                    <strong>{font.userId}</strong>
                  </td>
                  <td style={styles.td}>{font.ttf_url}</td>
                  <td style={styles.td}>
                    <img
                      src={`http://ceprj.gachon.ac.kr:60023${font.original_image_url}`}
                      alt="원본"
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td style={styles.td}>
                    {new Date(font.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ ...styles.td, ...styles.buttonCell }}>
                    <button
                      style={styles.editBtn}
                      onClick={() => handleEdit(font)}
                    >
                      수정
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(font.fontId)}
                    >
                      삭제
                    </button>
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
      <div style={{ textAlign: 'center', marginTop: '16px' }}>1</div>

      {editingFont && (
        <EditDataModal
          font={editingFont}
          onClose={() => setEditingFont(null)}
          onSave={handleSave}
        />
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
    borderBottom: 'none',
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
  },
  td: {
    textAlign: 'center',
    padding: '12px 16px',
    verticalAlign: 'middle',
    wordBreak: 'break-word',
  },
  buttonCell: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
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
    cursor: 'pointer',
  },
  message: {
    fontSize: '16px',
    color: '#111',
    marginTop: '20px',
    paddingLeft: '10px',
  },
};

export default DataManagement;
