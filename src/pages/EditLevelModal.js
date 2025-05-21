import React, { useState, useEffect } from 'react';

const EditLevelModal = ({ level, onClose, onSave }) => {
  const [edited, setEdited] = useState({ ...level });

  useEffect(() => {
    setEdited({ ...level });
  }, [level]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(edited);
    onClose();
  };

  if (!level) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>레벨 정보 수정</h3>
        <form onSubmit={handleSubmit}>
          <input name="id" value={edited.id} onChange={handleChange} placeholder="레벨번호" style={styles.input} />
          <input name="levelName" value={edited.levelName} onChange={handleChange} placeholder="레벨명" style={styles.input} />
          <input name="icon" value={edited.icon} onChange={handleChange} placeholder="아이콘" style={styles.input} />
          <input name="condition" value={edited.condition} onChange={handleChange} placeholder="기준" style={styles.input} />
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

export default EditLevelModal;
