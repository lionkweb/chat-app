import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsers } from '../services/users.api';
import { Tooltip } from 'react-tooltip';

function getFirstLetters(text) {
  return text
    .split(' ')
    .map(word => word.charAt(0))
    .join('');
}


function UserSidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    console.log(data);
  }

  return (
    <nav className="flex flex-col gap-2 justify-center p-2 pt-10 bg-yellow-600 text-white flex absolute top-0 h-screen">
      {users.map((user, idx) => (
        <>
          <Link
              data-tooltip-id={`tooltip_${user.id}`}
              data-tooltip-content={`Please have a chat with "${user.name}"`}
              key={idx}
              to={`/chat/${user.name}`}
              className="border w-10 h-10 rounded-full first-letter:uppercase text-center leading-10">
            {getFirstLetters(user.name)}
          </Link>
          <Tooltip id={`tooltip_${user.id}`} place="top" />
        </>

      ))}
    </nav>
  );
}

export default UserSidebar;