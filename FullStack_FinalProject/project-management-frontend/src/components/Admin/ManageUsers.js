import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/authService';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    getAllUsers().then(res=>setUsers(res.data)).catch(()=>{});
  },[]);

  return (
    <div className="card">
      <h4>Users</h4>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>{users.map(u=>(<tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>))}</tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
