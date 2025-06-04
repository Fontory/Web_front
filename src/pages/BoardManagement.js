// src/pages/BoardManagement.js
import React, { useState } from 'react';

const SERVER_URL = 'http://ceprj.gachon.ac.kr:60023';

const BoardManagement = () => {
  const [posts, setPosts] = useState([
    {
      postId: 38,
      imageUrl: '/post/7b67b199-75c4-4ca6-9d08-301d0508a26b.jpg',
      content: '감정을 정리하고 싶을 때, 나는 필사합니다',
    },
    {
      postId: 39,
      imageUrl: '/post/3bfce662-4f94-4f2b-8b3d-1177855af06e.jpg',
      content: '기록하며 성장하는 중!',
    },
    {
      postId: 40,
      imageUrl: '/post/6441ec1c-547c-4c07-81e4-aff08c11d5f8.jpg',
      content: '저 오늘 우울해서 다꾸했어용',
    },
    {
      postId: 41,
      imageUrl: '/post/66281675-4a5a-4407-be3c-9f9058b19a6f.jpg',
      content: '필사할 문장 추천합니다!',
    },
    {
      postId: 42,
      imageUrl: '/post/cc8e38d2-5860-4f32-85f9-00e313c6ab8b.jpg',
      content: '매일 10분씩 필사하고 있습니다 챌린지 같이 도전해요~~',
    },
    {
      postId: 43,
      imageUrl: '/post/f53df192-5849-408a-9e67-b0c90bcbfd27.jpg',
      content: '올 여름 읽을 책 추천합니다~! 저장하고 꼭 읽어보세요 ㅎㅎ',
    },
    {
      postId: 44,
      imageUrl: '/post/c236e98f-eaf9-4720-8d1c-2e71b0cccd86.jpg',
      content: '반복되는 하루에 회의감이 들 때, 자꾸만 남과 비교하게 될 때 읽으면 좋을 책!',
    },
    {
      postId: 45,
      imageUrl: '/post/8132de1d-ea62-4b9e-8b58-4afb1f5b6cde.jpg',
      content: '행복한 6월이기를!',
    },
    {
      postId: 46,
      imageUrl: '/post/98af8cb7-7577-4ec1-8991-c680314c2d14.jpg',
      content: '아름다워서 가지고 온 문장입니다',
    },
    {
      postId: 47,
      imageUrl: '/post/19d1f6e6-cdf8-4105-b68d-06710e8936bf.jpg',
      content: '생각이 많아지면 글을 써보세요 간단하지만 생각정리에 큰 도움이 된답니다',
    },
  ]);

  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: '16px' }}>게시판 관리</h3>
      <div style={styles.grid}>
        {posts.map((post) => (
          <div key={post.postId} style={styles.card}>
            <img
              src={`${SERVER_URL}${post.imageUrl}`}
              alt="post"
              style={styles.image}
            />
            <div style={styles.content}>{post.content}</div>
            <div style={styles.editIcon}>✎</div>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
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
};

export default BoardManagement;
