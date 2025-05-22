// src/pages/AdminService.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ navigate 추가

const AdminService = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // ✅ 토큰 삭제
    navigate('/login'); // ✅ 로그인 페이지로 이동
  };

  return (
    <div style={styles.wrapper}>
      {/* ✅ 상단 탭 메뉴 (하나만) */}
      <div style={styles.tabs}>
        <button
          style={location.pathname === '/admin' ? styles.tabActive : styles.tab}
        >
          로그아웃
        </button>
      </div>

      {/* 중앙 버튼 */}
      <div style={styles.content}>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  tabs: {
    display: 'flex',
    gap: '20px',
    marginBottom: '60px',
  },
  tab: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#888',
    cursor: 'default',
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
    cursor: 'default',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#222',
    color: '#fff',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '24px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default AdminService;
