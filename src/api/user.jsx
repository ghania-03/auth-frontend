import axios from 'axios';

const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

export const fetchUserProfile = async () => {
  const token = getToken();
  return axios.get('http://localhost:5000/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateUsername = async (newUsername) => {
  const token = getToken();
  return axios.patch('http://localhost:5000/api/user/username', { newUsername }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};