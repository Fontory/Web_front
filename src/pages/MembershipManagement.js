import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EditMemberModal from './EditMemberModal';

const dummyData = [
  { id: 1, name: '홍길동', username: 'abc123', email: 'abc123@gmail.com', phone: '010-0000-0000' },
  { id: 2, name: '강부장', username: 'gang123', email: 'gang123@gmail.com', phone: '010-0000-0000' },
];

const MembershipManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [members, setMembers] = useState(dummyData);
  const [editingMember, setEditingMember] = useState(null); // ✅ 모달 상태

  const handleEdit = (id) => {
    const member = members.find((m) => m.id === id);
    setEditingMember(member);
  };

  const handleSave = (updatedMember) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
    setEditingMember(null); // 모달 닫기
  };

  const handleDelete = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div style={styles.wrapper}>
      {/* ✅ 탭 통일 */}
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

      <div style={styles.searchBar}>
        <select style={styles.select}>
          <option>전체</option>
        </select>
        <input type="text" placeholder="검색명 입력" style={styles.searchInput} />
        <button style={styles.searchButton}>검색</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>번호</th>
            <th style={styles.th}>이름</th>
            <th style={styles.th}>아이디</th>
            <th style={styles.th}>이메일</th>
            <th style={styles.th}>전화번호</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{member.name}</td>
              <td style={styles.td}><strong>{member.username}</strong></td>
              <td style={styles.td}>{member.email}</td>
              <td style={styles.td}>{member.phone}</td>
              <td style={{ ...styles.td, ...styles.buttonCell }}>
                <button style={styles.editBtn} onClick={() => handleEdit(member.id)}>수정</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(member.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>1</div>

      {/* ✅ 수정 모달 렌더링 */}
      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
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
  searchBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    alignItems: 'center',
  },
  select: {
    padding: '6px 10px',
    borderRadius: '4px',
  },
  searchInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  searchButton: {
    background: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 16px',
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
    verticalAlign: 'middle',
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
};

export default MembershipManagement;
