import React, { useState, useEffect } from 'react';
//import io from 'socket.io-client';

//const socket = io('http://localhost:3001'); // Replace with your server's URL

function App() {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState('');
  // const check = socket.on('message', (message) => {
  //   setMessages([...messages, message]);
  // });
  // console.log("check-->", check);
  // useEffect(() => {
  //   // Listen for incoming messages from the server
  //   const check = socket.on('message', (message) => {
  //     setMessages([...messages, message]);
  //   });
  //   console.log("check-->", check);
  //   // Clean up the socket connection when the component unmounts
  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [messages]);

  // const sendMessage = () => {
  //   if (message.trim() !== '') {
  //     // Send a message to the server
  //     socket.emit('message', message);
  //     setMessage('');
  //   }
  // };

  return (
    <>
  {/* //   <div>
  //     <h1>Chat App</h1>
  //     <div>
  //       {messages.map((msg, index) => (
  //         <div key={index}>{msg}</div>
  //       ))}
  //     </div>
  //     <input
  //       type="text"
  //       value={message}
  //       onChange={(e) => setMessage(e.target.value)}
  //     />
  //     <button onClick={sendMessage}>Send</button>
  //   </div> */}
  </>
  );
}

export default App;
