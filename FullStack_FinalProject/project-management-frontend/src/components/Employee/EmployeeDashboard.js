import React, { useEffect, useState } from 'react';
import { getProjectsByEmployee, updateProjectStatus } from '../../services/projectService';

function EmployeeDashboard(){
  const employee = JSON.parse(localStorage.getItem('user'));
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    if(employee) load();
  },[]);

  const load = ()=>{
    getProjectsByEmployee(employee.id).then(res=>setProjects(res.data)).catch(()=>{});
  };

  const handleChange = async (projectId, status)=>{
    try{
      await updateProjectStatus(projectId, status);
      alert('Status updated');
      load();
    }catch(err){ alert('Failed'); }
  };

  return (
    <div className="center">
      <div className="card">
        <h3>My Projects</h3>
        <table className="table">
          <thead><tr><th>Project</th><th>Manager</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {projects.length? projects.map(p=>(
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.assignedManager}</td>
                <td>{p.status}</td>
                <td>
                  <select value={p.status} onChange={(e)=>handleChange(p.id, e.target.value)} className="form-control">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            )) : <tr><td colSpan="4">No projects assigned</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
