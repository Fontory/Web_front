import React from 'react';

const dummyBackgrounds = [
  { id: 1, image: '/images/notebook_bg1.png' },
  { id: 2, image: '/images/notebook_bg2.png' },
];

const NotebookBackgroundManagement = () => {
  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: '16px' }}>연습장 배경 관리</h3>

      <div style={styles.grid}>
        {dummyBackgrounds.map((bg) => (
          <img
            key={bg.id}
            src={bg.image}
            alt="배경"
            style={styles.image}
          />
        ))}

        <div style={styles.addBox}>＋</div>
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