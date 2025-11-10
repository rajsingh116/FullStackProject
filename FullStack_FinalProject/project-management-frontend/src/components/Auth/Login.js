import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'ADMIN') navigate('/admin-dashboard');
      else if (user.role === 'MANAGER') navigate('/manager-dashboard');
      else navigate('/employee-dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials or server error');
    }
  };

  return (
    <div className="center">
      <div className="card" style={{marginTop:30, maxWidth:540}}>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <input className="form-control" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
        <p style={{marginTop:10}}>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
