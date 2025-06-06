import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getRooms } from '../services/rooms.api';

import Navbar from '../Components/Navbar';
import UserSidebar from '../Components/UserSidebar';
import ChatRoomPreviewComponent from '../Components/ChatRoomPreviewComponent';

const socket = io('http://localhost:5000');

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const data = await getRooms();
    setRooms(data);
  }

  const createNewRoom = () => {
    socket.emit('create_room');
  }

  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className='flex flex-col justify-center h-screen p-3'>
        <div className="flex gap-2 items-center justify-center">
            {rooms.map((room_data, idx) => (
              <ChatRoomPreviewComponent key={idx} data={room_data}/>
            ))}
        </div>
        <div className='text-center mt-3'>
          <button className="bg-blue-500 text-white p-2 rounded" onClick={createNewRoom}>
            Add Room
          </button>
        </div>
      </div>

    </>

  );
}

export default Chat;