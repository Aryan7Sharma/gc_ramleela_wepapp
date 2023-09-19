import React, { useEffect, useState } from 'react'
import { ChatMain, ChatSidebar } from '../components'
import { CustomGetApi } from '../helper/helper';
import { Toaster, toast } from 'react-hot-toast';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchallmessages = async () => {
    try {
      const responce = await CustomGetApi('/common/getallmessages')
      if (responce.status === 200) {
        console.log(responce.data.data)
        setMessages(responce.data.data);
        console.log(messages);
      } else {
        toast.error("Something Went Wrong")
      }
    } catch (error) {
      toast.error("Somethings Went Wrong on Client Side")
    }
  }
  const fetchallusers = async () => {
    try {
      const responce = await CustomGetApi('/common/getallusers')
      if (responce.status === 200) {
        console.log("getallusers",responce.data.data);
        setMembers(responce.data.data);
      } else {
        toast.error("Something Went Wrong")
      }
    } catch (error) {
      toast.error("Somethings Went Wrong on Client Side")
    }
  }
  useEffect(() => {

    fetchallmessages();
    fetchallusers();
  }, []);
  return (
    <main>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="h-screen bg-gray-200 flex">
        <div className="hidden sm:block sm:w-1/4 bg-white border-r border-gray-300">
          <ChatSidebar members={members} />
        </div>
        <div className="w-full sm:w-3/4 flex flex-col">
          <ChatMain messages={messages} setMessages={setMessages}/>
        </div>
      </div>
    </main>
  )
}

export default Chat
