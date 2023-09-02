import React from 'react'

const InfoCard = ({ keyvalue, title, info, icon }) => {
    return (
        <div key={keyvalue} className="bg-gray-200 p-4 shadow-md rounded-md w-full md:w-1/3 flex flex-col justify-center items-center">
            <p className="text-gray-600 font-semibold text-lg">{title}</p>
            <hr className="my-2 border-gray-400 w-16" />
            <p className="text-2xl font-bold">{info}</p>
        </div>
    );
}

export default InfoCard
