import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import MembershipManagement from '../pages/MembershipManagement';
import LevelInfo from '../pages/LevelInfo';
import DataManagement from '../pages/DataManagement';
import NotebookManagement from '../pages/NotebookManagement';
import NotebookBackgroundManagement from '../pages/NotebookBackgroundManagement';

const MainLayout = () => {
  const location = useLocation();

  const getDefaultMenu = (pathname) => {
    if (pathname.startsWith('/data')) return '데이터 관리';
    if (pathname.startsWith('/notebook')) return '데이터 관리';
    if (pathname.startsWith('/levelinfo')) return '회원 관리';
    if (pathname.startsWith('/members')) return '회원 관리';
    if (pathname.startsWith('/ai')) return 'AI 성능 관리';
    return '회원 관리'; // fallback
  };

  const [activeMenu, setActiveMenu] = useState(getDefaultMenu(location.pathname));

  return (
    <div style={{ display: 'flex', backgroundColor: '#eee', minHeight: '100vh' }}>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/members" element={<MembershipManagement />} />
          <Route path="/levelinfo" element={<LevelInfo />} />
          <Route path="/data" element={<DataManagement />} />
          <Route path="/notebook" element={<NotebookManagement />} />
          <Route path="/background" element={<NotebookBackgroundManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
