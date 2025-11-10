import React from 'react';
import AddProject from './AddProject';
import ViewProjects from './ViewProjects';

function AdminDashboard() {
  return (
    <div className="center">
      <div style={{display:'flex', gap:20}}>
        <div style={{flex:1}}><AddProject /></div>
        <div style={{flex:1}}><ViewProjects /></div>
      </div>
    </div>
  );
}

export default AdminDashboard;
