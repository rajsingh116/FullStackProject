import React, { useState } from 'react';
import { addProject } from '../../services/projectService';

function AddProject() {
  const [p, setP] = useState({ name:'', description:'', deadline:'', assignedManager:'', assignedEmployee:'' });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await addProject(p);
      alert('Project added');
    } catch (err) {
      alert('Failed to add project');
    }
  };

  return (
    <div className="card">
      <h4>Add Project</h4>
      <form onSubmit={handleAdd}>
        <input className="form-control" placeholder="Project name" value={p.name} onChange={(e)=>setP({...p,name:e.target.value})} required />
        <textarea className="form-control" placeholder="Description" value={p.description} onChange={(e)=>setP({...p,description:e.target.value})} required />
        <input className="form-control" type="date" value={p.deadline} onChange={(e)=>setP({...p,deadline:e.target.value})} required />
        <input className="form-control" placeholder="Assign Manager (email)" value={p.assignedManager} onChange={(e)=>setP({...p,assignedManager:e.target.value})} required />
        <input className="form-control" placeholder="Assign Employee (email)" value={p.assignedEmployee} onChange={(e)=>setP({...p,assignedEmployee:e.target.value})} required />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProject;
