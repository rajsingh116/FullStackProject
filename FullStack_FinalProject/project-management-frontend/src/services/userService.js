import axios from 'axios';
const API = 'http://localhost:8080/api/auth/';
export const fetchEmployees = () => axios.get(API + 'all'); // filter on frontend
