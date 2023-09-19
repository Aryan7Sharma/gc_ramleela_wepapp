import React, { useState, useEffect } from 'react';
//import io from 'socket.io-client';
import avatar from '../assets/profile.png';
const url = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";
//const socket = io('http://localhost:3001'); // Replace with your server URL
function ChatMain({messages, setMessages}) {
  const user_id = "aryan@gmail.com"; 
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    window.alert("message send")
    //socket.emit('message', {user_id: 'aryan2003investment@gmail.com', name: 'Aryan Sharma', profile_img_path: 'NA', user_type: 1, message: message});
    setMessage('');
  };

  // useEffect(() => {
  //   socket.on('message', (msg) => {
  //     setMessages([...messages, msg]);
  //   });
  //   //socket.disconnect();
  // }, [messages]);

  return (
    <div className="h-screen flex">
      <div className="w-full flex flex-col">
        {/* Chat header */}
        <div className="bg-customOrange py-4 flex justify-around sm:justify-start sm:pl-5">
          <div>
            <h1 className="text-white text-xl font-semibold">John Doe</h1>
            <p className="text-gray-300 text-sm">Online</p>
          </div>
          <button className='sm:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Members
          </button>
        </div>
        {/* Chat messages */}
        <div className="flex-grow p-4 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={`${msg.user_id === user_id ? 'flex justify-end' : 'flex justify-start'} mb-4`}>
              {msg.user_id !== user_id && (
                <div className="flex items-center">
                  <img
                    src={msg.profile_img_path && msg.profile_img_path !== 'NA' ? `${url}/auth/images/profileimg/${msg.profile_img_path}` : avatar}
                    alt={msg.name + ' Profile'}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                </div>
              )}

              <div
                className={`${msg.user_id === user_id ? 'self-end' : 'self-start'
                  }  p-2 rounded-lg shadow-md my-2 max-w-xs`}
              >
                {msg.user_id !== user_id && (
                  <p className="text-sm font-semibold text-customOrange">{msg.name}</p>)}
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        {/* Message input */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex items-center">
            <textarea
              rows="3"
              className="flex-grow rounded-lg p-2 border focus:outline-none focus:border-blue-500"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              onClick={sendMessage}
              className="ml-2 bg-customOrange  text-white p-2 rounded-full hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMain;
