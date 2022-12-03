import axios from 'axios';

const API = axios.create();

export const serviceData = async () => {
  const response = await API.get('/api/todos/1');
  return response.data;
};
