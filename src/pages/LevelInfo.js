import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EditLevelModal from './EditLevelModal';

const LEVELS = [
  { id: 1, levelName: '새싹', icon: '🌱', condition: '어플 가입' },
  { id: 2, levelName: '연습생', icon: '🙂', condition: '게시글 1회 작성' },
  { id: 3, levelName: '필사러', icon: '📖', condition: '게시글 3회 작성' },
  { id: 4, levelName: '디자이너', icon: '✏️', condition: '글꼴 1회 생성' },
  { id: 5, levelName: '마스터', icon: '🏆', condition: '글꼴 5회 생성' },
];

const LevelInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [levels, setLevels] = useState(LEVELS);
  const [editingLevel, setEditingLevel] = useState(null);

    const handleEdit = (id) => {
    const level = levels.find((l) => l.id === id);
    setEditingLevel(level);
    };

  const handleDelete = (id) => {
    setLevels(levels.filter((level) => level.id !== id));
  };

  const handleSave = (updatedLevel) => {
    setLevels((prev) =>
        prev.map((l) => (l.id === updatedLevel.id ? updatedLevel : l))
    );
    setEditingLevel(null);
    };

  return (
    <div style={styles.wrapper}>
      {/* 🔽 탭 메뉴 영역 */}
      <div style={styles.tabs}>
        <button
          style={location.pathname === '/members' ? styles.tabActive : styles.tab}
          onClick={() => navigate('/members')}
        >
          회원 관리
        </button>
        <button
          style={location.pathname === '/levelinfo' ? styles.tabActive : styles.tab}
          onClick={() => navigate('/levelinfo')}
        >
          뱃지 관리
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>레벨번호</th>
            <th style={styles.th}>레벨명</th>
            <th style={styles.th}>아이콘</th>
            <th style={styles.th}>기준</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level.id}>
              <td style={styles.td}>{`Level ${level.id}`}</td>
              <td style={styles.td}>{level.levelName}</td>
              <td style={styles.td}>{level.icon}</td>
              <td style={styles.td}>{level.condition}</td>
              <td style={{ ...styles.td, ...styles.buttonCell }}>
                <button style={styles.editBtn} onClick={() => handleEdit(level.id)}>수정</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(level.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingLevel && (
        <EditLevelModal
            level={editingLevel}
            onClose={() => setEditingLevel(null)}
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
    borderSpacing: 0,
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
  },
  buttonCell: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
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
};

export default LevelInfo;
