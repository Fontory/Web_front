import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const NotebookBackgroundManagement = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const fetchBackgrounds = () => {
    axios.get('http://ceprj.gachon.ac.kr:60023/backgrounds')
      .then(res => setBackgrounds(res.data))
      .catch(err => console.error('❌ 배경 이미지 목록 불러오기 실패:', err));
  };

  const handleAddClick = () => {
    fileInputRef.current.click(); // input 클릭 트리거
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post('http://ceprj.gachon.ac.kr:60023/backgrounds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ 배경 이미지 업로드 성공!');
      fetchBackgrounds(); // 목록 다시 불러오기
    } catch (err) {
      console.error('❌ 배경 이미지 업로드 실패:', err);
      alert('업로드 중 오류 발생');
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: '16px' }}>연습장 배경 관리</h3>

      <div style={styles.grid}>
        {backgrounds.map(bg => (
          <img
            key={bg.backgroundId}
            src={`http://ceprj.gachon.ac.kr:60023${bg.imageUrl}`}
            alt={bg.name}
            style={styles.image}
          />
        ))}

        <div style={styles.addBox} onClick={handleAddClick}>＋</div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#fafafa',
  },
  grid: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  image: {
    width: '120px',
    height: '160px',
    objectFit: 'cover',
    border: '1px solid #ccc',
  },
  addBox: {
    width: '120px',
    height: '160px',
    border: '1px dashed #ccc',
    backgroundColor: '#f0f0f0',
    fontSize: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#555',
  },
};

export default NotebookBackgroundManagement;
