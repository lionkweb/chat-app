import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getMessages } from './services/api';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
      console.log("okokok");
    });
    fetchMessages();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { message: message });
      setMessage('');
    }
  };

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
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
            // onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="bg-blue-500 text-white p-2 rounded-r" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;