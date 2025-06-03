import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 w-screen bg-gray-800 text-white flex gap-4 absolute z-10">
      <Link to="/">Home</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/login" className="ml-auto">Login</Link>
    </nav>
  );
}

export default Navbar;