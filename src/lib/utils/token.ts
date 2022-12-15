export const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const setAuthToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};

export const removeAuthToken = () => {
  return localStorage.removeItem('accessToken');
};
