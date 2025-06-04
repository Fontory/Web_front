import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // axiosInstance 경로에 맞게 수정

const NotebookBackgroundManagement = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const fileInputRef = useRef(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const fetchBackgrounds = () => {
    axiosInstance.get('/admin/backgrounds')
      .then(res => {
        console.log('🎨 배경 목록:', res.data);
        setBackgrounds(res.data);
      })
      .catch(err => console.error('❌ 배경 이미지 목록 불러오기 실패:', err));
  };

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !newName.trim()) {
      alert('이미지와 이름을 입력해주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('name', newName);
    formData.append('image', file);

    try {
      await axiosInstance.post('/admin/backgrounds', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ 배경 이미지 업로드 성공!');
      setNewName('');
      fetchBackgrounds();
    } catch (err) {
      console.error('❌ 배경 이미지 업로드 실패:', err);
      alert('업로드 중 오류 발생');
    }
  };

  const handleDelete = async (backgroundId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await axiosInstance.delete(`/admin/backgrounds/${backgroundId}`);
      alert('🗑️ 삭제 완료');
      fetchBackgrounds();
    } catch (err) {
      console.error('❌ 배경 삭제 실패:', err);
      alert('삭제 실패');
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: '16px' }}>연습장 배경 관리</h3>

      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="배경 이름 입력"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={styles.nameInput}
        />
        <button onClick={handleAddClick} style={styles.uploadButton}>＋ 이미지 업로드</button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      <div style={styles.grid}>
        {backgrounds.map(bg => (
          <div key={bg.backgroundId} style={styles.item}>
            <img
              src={`http://ceprj.gachon.ac.kr:60023/backgrounds/${bg.imageUrl}`}
              alt={bg.name}
              style={styles.image}
            />

            <p style={{ margin: '4px 0', fontSize: '14px' }}>{bg.name}</p>
            <button onClick={() => handleDelete(bg.backgroundId)} style={styles.deleteBtn}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#fafafa',
  },
  nameInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  uploadButton: {
    padding: '8px 12px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  grid: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '20px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '140px',
  },
  image: {
    width: '120px',
    height: '160px',
    objectFit: 'cover',
    border: '1px solid #ccc',
    marginBottom: '4px',
  },
  deleteBtn: {
    padding: '4px 8px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

export default NotebookBackgroundManagement;
