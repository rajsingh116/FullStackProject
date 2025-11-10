import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../../services/userService';
import { addProject, getProjectsByManager } from '../../services/projectService';

function ManagerDashboard() {
  const manager = JSON.parse(localStorage.getItem('user'));
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name:'', description:'', deadline:'', assignedEmployee:'' });

  useEffect(()=>{
    fetchEmployees().then(res=>{
      setEmployees(res.data.filter(u=>u.role==='EMPLOYEE'));
    }).catch(()=>{});
    if (manager) loadProjects();
  },[]);

  const loadProjects = ()=>{
    if(!manager) return;
    getProjectsByManager(manager.id).then(res=>setProjects(res.data)).catch(()=>{});
  };

  const handleAssign = async (e)=>{
    e.preventDefault();
    try{
      const payload = {...newProject, assignedManager: manager.email, managerId: manager.id};
      await addProject(payload);
      alert('Assigned');
      setNewProject({ name:'', description:'', deadline:'', assignedEmployee:'' });
      loadProjects();
    }catch(err){
      alert('Failed to assign');
    }
  };

  return (
    <div className="center">
      <div className="card" style={{padding:20}}>
        <h3>Manager Dashboard</h3>
        <div style={{display:'flex', gap:20}}>
          <div style={{flex:1}}>
            <h4>Assign Project</h4>
            <form onSubmit={handleAssign}>
              <input className="form-control" placeholder="Project name" value={newProject.name} onChange={(e)=>setNewProject({...newProject,name:e.target.value})} required />
              <textarea className="form-control" placeholder="Description" value={newProject.description} onChange={(e)=>setNewProject({...newProject,description:e.target.value})} required />
              <input className="form-control" type="date" value={newProject.deadline} onChange={(e)=>setNewProject({...newProject,deadline:e.target.value})} required />
              <select className="form-control" value={newProject.assignedEmployee} onChange={(e)=>setNewProject({...newProject,assignedEmployee:e.target.value})} required>
                <option value="">Select Employee</option>
                {employees.map(emp=>(<option key={emp.id} value={emp.email}>{emp.name} ({emp.email})</option>))}
              </select>
              <button className="btn btn-primary" type="submit">Assign</button>
            </form>
          </div>
          <div style={{flex:1}}>
            <h4>My Projects</h4>
            <table className="table">
              <thead><tr><th>Name</th><th>Employee</th><th>Status</th></tr></thead>
              <tbody>{projects.map(p=>(<tr key={p.id}><td>{p.name}</td><td>{p.assignedEmployee}</td><td>{p.status}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
