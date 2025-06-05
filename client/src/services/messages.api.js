import { store } from '../app/store';

const API_URL = 'http://localhost:5000/api/messages';

export const getMessages = async (sender_id, receiver_id, options = {}) => {
  // const res = await fetch(API_URL + "/" + receiver_id);
  // const token = store.getState().user.token;
  // const headers = {
  //   ...(options.headers || {}),
  //   Authorization: `Bearer ${token}`,
  //   'Content-Type': 'application/json',
  // };
  const res = await fetch(`${API_URL}/${sender_id}/${receiver_id}`, {});

  if (!res.ok) {
    throw new Error('Request failed');
  }

  return res.json();
};

export const sendMessage = async (sender_id, receiver_id, message) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender_id, receiver_id, message })
  });
};