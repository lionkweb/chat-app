import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { Link } from "react-router-dom";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <nav className="p-4 w-screen bg-gray-800 text-white flex gap-4 absolute z-10">
      <Link to="/">Home</Link>
      <Link to="/chat">Chat</Link>
      <div className='ml-auto'>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="ml-auto">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;