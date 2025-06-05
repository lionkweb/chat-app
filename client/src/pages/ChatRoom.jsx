import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getMessages } from '../services/messages.api';
import { format } from 'date-fns';

import Navbar from "../Components/Navbar";
import UserSidebar from "../Components/UserSidebar";

const socket = io('http://localhost:5000');

function ChatRoom() {
  // function Chat() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const { receiver_id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  let sender_id;
  // const sender_id = useSelector((state) => state.user.user.id);
  useEffect(() => {
    const fetchMessages = async (rec_id) => {
      if (!token) {
        navigate('/login');
      }
      sender_id = user.id;
      console.log(sender_id, rec_id);
      const data = await getMessages(sender_id, rec_id);
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
      socket.emit('send_message', { sender_id: sender_id, receiver_id: receiver_id, message: message });
      setMessage('');
    }
  };

  const changeDateFormat = (full_date) => {
    return format(new Date(full_date), 'yyyy/MM/dd - hh:mm:ss');
  }

  // const fetchMessages = async () => {
  //   const data = await getMessages(receiver_id);
  //   setMessages(data);
  // }

  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className="ml-[56px] pt-[56px] pb-[16px] h-dvh px-6 flex flex-col items-center justify-center h-screen bg-gray-100">
        {/* <div>Chat Room ID: {receiver_id}</div> */}
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
                      <span>{msg.message}, {idx}</span>
                      {/* <div className="text-right">{ changeDateFormat(msg.created_at) }</div> */}
                    </div>
                  ) : (
                    <div className="bg-blue-100 p-2 rounded w-3/5">
                      <span>{msg.message}, {idx}</span>
                      {/* <div className="text-right">{ changeDateFormat(msg.created_at) }</div> */}
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