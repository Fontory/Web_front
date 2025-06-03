import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditDataModal from './EditData';
import NotebookManagement from './NotebookManagement';
import BackgroundManagement from './NotebookBackgroundManagement';
import QuoteManagement from './QuoteManagement';
import BoardManagement from './BoardManagement';

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('font');
  const [fonts, setFonts] = useState([]);
  const [editingFont, setEditingFont] = useState(null);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          alert('관리자 인증 토큰이 없습니다.');
          return;
        }

        const response = await axios.get(
          'http://ceprj.gachon.ac.kr:60023/admin/fonts',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('📦 폰트 데이터:', response.data);
        setFonts(response.data);
      } catch (error) {
        console.error('❌ 폰트 불러오기 실패:', error);
        alert('폰트 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchFonts();
  }, []);

  const handleEdit = (font) => {
    setEditingFont(font);
  };

  const handleDelete = (id) => {
    setFonts(fonts.filter((f) => f.id !== id));
  };

  const handleSave = (updatedFont) => {
    setFonts((prev) =>
      prev.map((f) => (f.id === updatedFont.id ? updatedFont : f))
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
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>번호</th>
              <th style={styles.th}>폰트이름</th>
              <th style={styles.th}>유저ID</th>
              <th style={styles.th}>폰트파일(url)</th>
              <th style={styles.th}>원본 이미지</th>
              <th style={styles.th}>생성일</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {fonts.map((font, index) => (
              <tr key={font.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{font.fontName}</td>
                <td style={styles.td}><strong>{font.userId}</strong></td>
                <td style={styles.td}>{font.fontUrl}</td>
                <td style={styles.td}>
                  <img src={font.image} alt="원본" style={{ width: '100px' }} />
                </td>
                <td style={styles.td}>{new Date(font.createdAt).toLocaleDateString()}</td>
                <td style={{ ...styles.td, ...styles.buttonCell }}>
                  <button style={styles.editBtn} onClick={() => handleEdit(font)}>수정</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(font.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p style={styles.message}>준비 중입니다...</p>;
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tabs}>
        {['font', 'note', 'background', 'quote', 'board'].map((tabKey, i) => {
          const tabNames = ['폰트 관리', '연습장 관리', '연습장 배경 관리', '필사 문구 관리', '게시판 관리'];
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
