import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/members');
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>관리자 로그인</h2>
        <input type="text" placeholder="ID" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
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
