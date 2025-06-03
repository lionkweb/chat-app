const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
  const res = await fetch(API_URL);
  return res.json();
};
