const API_URL = 'http://localhost:5000/api/messages';

export const getMessages = async (roomId) => {
  const res = await fetch(API_URL + "/" + roomId);
  return res.json();
};

export const sendMessage = async (user, message) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, message })
  });
};