import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';

const MembershipManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  const getProfileImageSrc = (path) => {
    if (!path || path.trim() === '') return null;

    // 외부 URL 형식인 경우 그대로 사용
    if (path.startsWith('http://') || path.startsWith('https://')) return path;

    // '/uploads/profiles/abcd.png' 같이 온 경우 → '/profiles/abcd.png' 로 매핑
    if (path.startsWith('/uploads/profiles/')) {
      return `http://ceprj.gachon.ac.kr:60023${path.replace('/uploads', '')}`;
    }

    // 파일명만 온 경우
    return `http://ceprj.gachon.ac.kr:60023/profiles/${path}`;
  };
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    axios.get('/admin/users')
      .then(res => {
        setMembers(res.data.content);
      })
      .catch(err => {
        console.error('❌ 회원 목록 불러오기 실패:', err);
        if (err.response?.status === 401) {
          alert('인증이 만료되었거나 유효하지 않습니다.');
          localStorage.removeItem('adminToken');
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleEdit = (userId) => {
    const member = members.find((m) => m.userId === userId);
    setEditingMember(member);
  };

  const handleSave = (updatedMember) => {
    axios.put(`/admin/users/${updatedMember.userId}`, updatedMember)
      .then(() => {
        setMembers((prev) =>
          prev.map((m) => (m.userId === updatedMember.userId ? updatedMember : m))
        );
        setEditingMember(null);
      })
      .catch(err => {
        console.error('❌ 회원 수정 실패:', err);
      });
  };

  const handleDelete = (userId) => {
    axios.delete(`/admin/users/${userId}`)
      .then(() => {
        setMembers(members.filter((member) => member.userId !== userId));
      })
      .catch(err => {
        console.error('❌ 회원 삭제 실패:', err);
      });
  };

  return (
    <div style={styles.wrapper}>
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
            <th style={styles.th}>번호</th>
            <th style={styles.th}>프로필</th>
            <th style={styles.th}>이름</th>
            <th style={styles.th}>아이디</th>
            <th style={styles.th}>이메일</th>
            <th style={styles.th}>전화번호</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.userId}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>
                {(() => {
                  const imageSrc = getProfileImageSrc(member.profileImage);
                  console.log(`🖼️ 유저 ${member.userId} 이미지 경로:`, imageSrc);

                  return imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="프로필"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#ddd'
                      }}
                    />
                  );
                })()}
              </td>
              <td style={styles.td}>{member.name}</td>
              <td style={{ ...styles.td, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <strong>{member.userId}</strong>
              </td>
              <td style={{ ...styles.td, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.email}</td>
              <td style={{ ...styles.td, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.phone}</td>
              <td style={{ ...styles.td, ...styles.buttonCell }}>
                <button style={styles.editBtn} onClick={() => handleEdit(member.userId)}>수정</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(member.userId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingMember && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>회원 정보 수정</h2>

            <label>이름</label>
            <input
              type="text"
              value={editingMember.name}
              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
              style={modalStyles.input}
            />

            {getProfileImageSrc(editingMember.profileImage) ? (
              <img
                src={getProfileImageSrc(editingMember.profileImage)}
                alt="프로필"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '16px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#ddd',
                  marginBottom: '16px',
                }}
              />
            )}

            <label>아이디</label>
            <input
              type="text"
              value={editingMember.userId}
              readOnly
              style={{ ...modalStyles.input, backgroundColor: '#eee' }}
            />

            <label>이메일</label>
            <input
              type="email"
              value={editingMember.email}
              onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
              style={modalStyles.input}
            />

            <label>전화번호</label>
            <input
              type="text"
              value={editingMember.phone}
              onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
              style={modalStyles.input}
            />

            <div style={modalStyles.btnGroup}>
              <button onClick={() => setEditingMember(null)} style={modalStyles.cancelBtn}>취소</button>
              <button onClick={() => handleSave(editingMember)} style={modalStyles.saveBtn}>저장</button>
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


export default MembershipManagement;
