// EditData.js
import React, { useState } from 'react';

const EditDataModal = ({ font, onClose, onSave }) => {
  const [form, setForm] = useState({
    fontName: font.fontName,
    userId: font.userId,
    fontUrl: font.fontUrl,
    image: font.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onSave({ ...font, ...form });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>폰트 정보 수정</h3>
        <label>폰트이름</label>
        <input
          name="fontName"
          value={form.fontName}
          onChange={handleChange}
          style={styles.input}
        />

        <label>유저ID</label>
        <input
          name="userId"
          value={form.userId}
          onChange={handleChange}
          style={styles.input}
        />

        <label>폰트파일(URL)</label>
        <input
          name="fontUrl"
          value={form.fontUrl}
          onChange={handleChange}
          style={styles.input}
        />

        <label>원본 이미지(URL)</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.buttons}>
          <button onClick={handleSubmit} style={styles.saveBtn}>저장</button>
          <button onClick={onClose} style={styles.cancelBtn}>취소</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttons: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  saveBtn: {
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#aaa',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default EditDataModal;
