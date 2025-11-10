import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../services/projectService';

function ViewProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    getAllProjects().then(res=>setProjects(res.data)).catch(()=>{});
  },[]);

  return (
    <div className="card">
      <h4>All Projects</h4>
      <table className="table">
        <thead><tr><th>Name</th><th>Manager</th><th>Employee</th><th>Status</th></tr></thead>
        <tbody>
          {projects.map(p=>(
            <tr key={p.id}><td>{p.name}</td><td>{p.assignedManager}</td><td>{p.assignedEmployee}</td><td>{p.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProjects;
