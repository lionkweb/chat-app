const API_URL = 'http://localhost:5000/api/messages';

export const getMessages = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const sendMessage = async (user, message) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, message })
  });
};