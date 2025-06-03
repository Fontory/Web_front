import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const ICON_OPTIONS = ['🌱', '🙂', '📖', '✏️', '🏆'];

const LevelInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [levels, setLevels] = useState([]);
  const [editingLevel, setEditingLevel] = useState(null);

  const ICON_MAP = {
    1: '🌱',
    2: '🙂',
    3: '📖',
    4: '✏️',
    5: '🏆',
  };

  useEffect(() => {
    axiosInstance.get('/admin/badges')
      .then(res => {
        console.log('📦 뱃지 목록:', res.data);
        setLevels(res.data);
      })
      .catch(err => {
        console.error('🛑 뱃지 불러오기 실패', err);
      });
  }, []);

  const handleEdit = (badgeId) => {
    const level = levels.find((l) => l.badgeId === badgeId);
    setEditingLevel(level);
  };

  const handleSave = (updatedLevel) => {
    axiosInstance.put(`/admin/badges/${updatedLevel.badgeId}`, updatedLevel)
      .then(() => {
        setLevels((prev) =>
          prev.map((l) => (l.badgeId === updatedLevel.badgeId ? updatedLevel : l))
        );
        setEditingLevel(null);
      })
      .catch(err => {
        console.error('🛑 뱃지 수정 실패', err);
      });
  };

  return (
    <div style={styles.wrapper}>
      {/* 🔽 탭 메뉴 */}
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
            <tr key={level.badgeId}>
              <td style={styles.td}>{`Level ${level.badgeId}`}</td>
              <td style={styles.td}>{level.name}</td>
              <td style={styles.td}>{ICON_MAP[level.badgeId] || '❔'}</td>
              <td style={styles.td}>{level.description}</td>
              <td style={{ ...styles.td, ...styles.buttonCell }}>
                <button style={styles.editBtn} onClick={() => handleEdit(level.badgeId)}>수정</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingLevel && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>레벨 수정</h2>

            <label>레벨명</label>
            <input
              type="text"
              value={editingLevel.name}
              onChange={(e) => setEditingLevel({ ...editingLevel, name: e.target.value })}
              style={modalStyles.input}
            />

            <label>아이콘</label>
            <div style={modalStyles.iconList}>
              {ICON_OPTIONS.map((icon) => (
                <span
                  key={icon}
                  style={{
                    ...modalStyles.iconOption,
                    border: editingLevel.iconUrl === icon ? '2px solid #000' : '1px solid #ccc',
                  }}
                  onClick={() => setEditingLevel({ ...editingLevel, iconUrl: icon })}
                >
                  {icon}
                </span>
              ))}
            </div>

            <label>기준</label>
            <input
              type="text"
              value={editingLevel.description}
              onChange={(e) => setEditingLevel({ ...editingLevel, description: e.target.value })}
              style={modalStyles.input}
            />

            <div style={modalStyles.btnGroup}>
              <button onClick={() => setEditingLevel(null)} style={modalStyles.cancelBtn}>취소</button>
              <button onClick={() => handleSave(editingLevel)} style={modalStyles.saveBtn}>저장</button>
            </div>
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
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '8px 0 16px',
    fontSize: '14px',
  },
  iconList: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
  },
  iconOption: {
    fontSize: '24px',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  cancelBtn: {
    padding: '6px 12px',
    backgroundColor: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '6px 12px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default LevelInfo;
