import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import io from 'socket.io-client';

import { getMessages } from '../services/messages.api';
import { getUserById } from "../services/users.api";

import Navbar from "../Components/Navbar";
import UserSidebar from "../Components/UserSidebar";

const socket = io('http://localhost:5000');

function ChatRoom() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const { receiver_id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState('');
  useEffect(() => {
    const fetchMessages = async (rec_id) => {
      console.log(user.id, rec_id);
      const data = await getMessages(user.id, rec_id);
      setReceiver(await getUserById(rec_id))
      setMessages(data);
    };
    if (token) {
      fetchMessages(receiver_id);
    }
  }, [token]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { sender_id: user.id, receiver_id: receiver_id, message: message });
      setMessage('');
    }
  };

  const changeDateFormat = (full_date) => {
    const parsed = new Date(full_date);
    if (!parsed || isNaN(parsed)) return ''; 
    return format(new Date(full_date), 'yyyy/MM/dd-hh:mm:ss');
  }

  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className="ml-[56px] pt-[56px] pb-[16px] h-dvh px-6 flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col mt-6 h-full w-full max-w-full p-4 bg-white shadow rounded">
          <div className="overflow-y-auto mb-4 p-2 mt-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="mb-2"
              >
                {
                  msg.receiver_id == receiver_id ? (
                    <div className="bg-red-100 p-2 rounded w-3/5 ml-auto">
                      <span>{msg.message}</span>
                      <div className="text-right">{ changeDateFormat(msg.created_at) }</div>
                    </div>
                  ) : (
                    <div className="bg-green-100 p-2 rounded w-3/5">
                      <span>{msg.message}</span>
                      <div className="text-right">{ changeDateFormat(msg.created_at) }</div>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              className="flex-1 border p-2 rounded-l"
              value={message}
              placeholder={`Please chat to ${receiver.name}`}
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

export default ChatRoom;