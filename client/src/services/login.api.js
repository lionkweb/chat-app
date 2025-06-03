const API_URL = 'http://localhost:5000/api/login';

export const sendLoginData = async (username, password) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        dispatch(setUser({username, token:data.token}))
      }
    });
};
