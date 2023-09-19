import React from 'react';
import avatar from '../assets/profile.png';
const url = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";
const ChatSidebar = ({ members }) => {
  return (
    <div className="w-full bg-customOrange h-screen py-4">
      <h2 className="text-white text-2xl font-semibold mb-4 sm:flex justify-center">SRS-DCA All Members</h2>
      <div className="max-h-[calc(100vh-100px)] space-y-4 overflow-y-scroll bg-gray-800" >
        {members.map((member, index) => (
          //`${url}/auth/images/profileimg/${userProfileImg}`
          <div key={index} className="flex items-center space-x-2">
            <img
              src={member.profile_img_path && member.profile_img_path !== 'NA' ? `${url}/auth/images/profileimg/${member.profile_img_path}` : avatar}
              alt={member.name + ` Profile`}
              className="w-10 h-10 rounded-full"
            />
            <div className="text-white">
              <p className="font-semibold">{member.name}</p>
              <div className='flex space-x-1'>
              <div className={`h-2.5 w-2.5 my-1 rounded-full  mr-2 ${member.active === "Y" ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <p className="text-sm text-gray-400">{member.user_type === 0 ? 'Admin' : 'Collector'}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
