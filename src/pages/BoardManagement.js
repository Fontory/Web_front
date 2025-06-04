import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const SERVER_URL = 'http://ceprj.gachon.ac.kr:60023';

const BoardManagement = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/admin/posts?page=0&size=100');
      setPosts(res.data.content);
    } catch (err) {
      console.error('❌ 게시물 목록 불러오기 실패:', err);
    }
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditContent(post.content);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setEditContent('');
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/admin/posts/${selectedPost.postId}`, {
        postType: selectedPost.postType || 'GENERAL',
        content: editContent,
      });
      alert('✅ 게시물 수정 완료!');
      closeModal();
      fetchPosts();
    } catch (err) {
      console.error('❌ 게시물 수정 실패:', err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: '16px' }}>게시판 관리</h3>
      <div style={styles.grid}>
        {posts.map((post) => (
          <div key={post.postId} style={styles.card}>
            <img
              src={`${SERVER_URL}/post/${post.imageUrl.split('/').pop()}`}
              alt="post"
              style={styles.image}
            />
            <div style={styles.content}>{post.content}</div>
            <div style={styles.editIcon} onClick={() => openEditModal(post)}>✎</div>
          </div>
        ))}
      </div>

      {/* 수정 모달 */}
      {selectedPost && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h4>게시물 수정</h4>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              style={{ width: '100%', minHeight: '80px', marginBottom: '12px' }}
            />
            <div style={{ textAlign: 'right' }}>
              <button onClick={handleUpdate} style={styles.modalBtn}>수정</button>
              <button onClick={closeModal} style={{ ...styles.modalBtn, backgroundColor: '#aaa' }}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: { padding: '30px', backgroundColor: '#fafafa' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  content: {
    fontSize: '14px',
    color: '#333',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  editIcon: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#666',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    width: '400px',
  },
  modalBtn: {
    padding: '8px 16px',
    marginLeft: '10px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#333',
    color: 'white',
    cursor: 'pointer',
  },
};

export default BoardManagement;
