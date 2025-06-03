const API_URL = 'http://localhost:5000/api/rooms';

export const getRooms = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const sendRoom = async (user, room_number) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, room_number })
  });
};