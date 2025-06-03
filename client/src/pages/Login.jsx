import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    const user = { name: 'han', email: 'han@example.com' };
    dispatch(setUser(user));
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;