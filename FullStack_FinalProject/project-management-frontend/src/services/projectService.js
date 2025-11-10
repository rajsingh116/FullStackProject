import axios from 'axios';
const API = 'http://localhost:8080/api/projects/';
export const addProject = (data) => axios.post(API + 'add', data);
export const getProjectsByManager = (managerId) => axios.get(API + `manager/${managerId}`);
export const getProjectsByEmployee = (employeeId) => axios.get(API + `employee/${employeeId}`);
export const updateProjectStatus = (projectId, status) => axios.put(API + `update-status/${projectId}`, { status });
export const getAllProjects = () => axios.get(API + 'all');
