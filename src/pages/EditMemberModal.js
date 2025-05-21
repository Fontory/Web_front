import React, { useState, useEffect } from 'react';

const EditMemberModal = ({ member, onClose, onSave }) => {
  const [edited, setEdited] = useState({ ...member });

  useEffect(() => {
    setEdited({ ...member });
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(edited);
    onClose();
  };

  if (!member) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>회원 정보 수정</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" value={edited.name} onChange={handleChange} placeholder="이름" style={styles.input} />
          <input name="username" value={edited.username} onChange={handleChange} placeholder="아이디" style={styles.input} />
          <input name="email" value={edited.email} onChange={handleChange} placeholder="이메일" style={styles.input} />
          <input name="phone" value={edited.phone} onChange={handleChange} placeholder="전화번호" style={styles.input} />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveBtn}>저장</button>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  saveBtn: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    color: '#000',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default EditMemberModal;
