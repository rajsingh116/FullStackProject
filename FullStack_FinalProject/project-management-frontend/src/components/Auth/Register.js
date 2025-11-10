import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({ name:'', email:'', password:'', role:'EMPLOYEE' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      console.error('Register error', err);
      alert('Registration failed');
    }
  };

  return (
    <div className="center">
      <div className="card" style={{marginTop:30, maxWidth:600}}>
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control" placeholder="Name" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} required />
          <input className="form-control" type="email" placeholder="Email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} required />
          <input className="form-control" type="password" placeholder="Password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} required />
          <select className="form-control" value={user.role} onChange={(e)=>setUser({...user,role:e.target.value})}>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
          <button className="btn btn-primary" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
