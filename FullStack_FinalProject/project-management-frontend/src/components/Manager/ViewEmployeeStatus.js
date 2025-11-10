import React, { useEffect, useState } from 'react';
import { getProjectsByManager } from '../../services/projectService';
function ViewEmployeeStatus(){
  const manager = JSON.parse(localStorage.getItem('user'));
  const [projects, setProjects] = useState([]);
  useEffect(()=>{ if(manager) getProjectsByManager(manager.id).then(res=>setProjects(res.data)).catch(()=>{}); },[]);
  return (
    <div className="card">
      <h4>Employee Project Status</h4>
      <table className="table">
        <thead><tr><th>Project</th><th>Employee</th><th>Status</th></tr></thead>
        <tbody>{projects.map(p=>(<tr key={p.id}><td>{p.name}</td><td>{p.assignedEmployee}</td><td>{p.status}</td></tr>))}</tbody>
      </table>
    </div>
  );
}
export default ViewEmployeeStatus;
