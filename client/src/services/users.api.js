const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}