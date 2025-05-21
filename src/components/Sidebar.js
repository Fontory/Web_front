import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: '회원 관리', route: '/members' },
    { label: 'AI 성능 관리' }, 
    { label: '데이터 관리', route: '/data' },
    { label: '관리자 서비스' },
  ];

  const handleClick = (item) => {
    setActiveMenu(item.label);
    if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>Fontory</div>
      <ul style={styles.menuList}>
        {menuItems.map((item) => (
          <li
            key={item.label}
            onClick={() => handleClick(item)}
            style={{
              ...styles.menuItem,
              ...(activeMenu === item.label ? styles.activeMenuItem : {}),
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    borderRight: '1px solid #ddd',
    padding: '30px 20px',
    boxSizing: 'border-box',
  },
  logo: {
    fontFamily: 'cursive',
    fontSize: '24px',
    marginBottom: '40px',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    padding: '12px 16px',
    marginBottom: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#333',
  },
  activeMenuItem: {
    backgroundColor: '#ddd',
    fontWeight: 'bold',
  },
};

export default Sidebar;