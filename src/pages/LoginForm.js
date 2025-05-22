import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://ceprj.gachon.ac.kr:60023/admin/login', {
      userId,
      password
    })
    .then(res => {
      console.log('✅ 로그인 성공:', res.data);

      // 👉 JWT 토큰 저장 (예: localStorage)
      const token = res.data.token || res.data.accessToken;
      if (token) {
        localStorage.setItem('adminToken', token);
        navigate('/members'); // 로그인 후 페이지 이동
      } else {
        alert('토큰이 응답에 없습니다.');
      }
    })
    .catch(err => {
      console.error('❌ 로그인 실패:', err);
      alert('로그인 실패. 아이디와 비밀번호를 확인해주세요.');
    });
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>관리자 로그인</h2>
        <input
          type="text"
          placeholder="ID"
          style={styles.input}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>Log In</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    minWidth: '300px',
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '15px',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#e8e8e8',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: '#222',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default LoginForm;
