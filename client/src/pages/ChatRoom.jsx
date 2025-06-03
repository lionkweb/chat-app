import { useParams } from "react-router-dom";

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getMessages } from '../services/messages.api';

import Navbar from "../Components/Navbar";
import UserSidebar from "../Components/UserSidebar";

const socket = io('http://localhost:5000');

function ChatRoom() {
  // function Chat() {
  const { sender, token } = useSelector((state) => state.user);
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(messages);
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('http://localhost:5000/api/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setMessages(data.messages);
    };

    if (token) {
      fetchMessages();
    }
  }, [token]);
  
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { message: message, roomId: roomId });
      setMessage('');
    }
  };

  const fetchMessages = async () => {
    const data = await getMessages(roomId);
    setMessages(data);
  }

  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div>Chat Room ID: {roomId}</div>
        <div className="w-full max-w-md p-4 bg-white shadow rounded">
          <div className="h-64 overflow-y-auto mb-4 border p-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <span className="bg-blue-100 p-2 rounded">{msg.message}, { idx }</span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              className="flex-1 border p-2 rounded-l"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="bg-blue-500 text-white p-2 rounded-r" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>

  );
}

// export default Chat;

export default ChatRoom;