import { store } from '../app/store';

const API_URL = 'http://localhost:5000/api/messages';

export const getMessages = async (roomId, options = {}) => {
  // const res = await fetch(API_URL + "/" + roomId);
  const token = store.getState().user.token;
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  
  const res = await fetch(`${API_URL}/${roomId}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error('Request failed');
  }

  return res.json();
};

export const sendMessage = async (user, message) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, message })
  });
};