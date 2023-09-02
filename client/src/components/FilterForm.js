import React, { useState } from 'react';

const FilterForm = ({filterFormData}) => {
  const [selectedSociety, setSelectedSociety] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState('');

  const handleSocietyChange = (event) => {
    setSelectedSociety(event.target.value);
  };

  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Apply filtering logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md m-10 bg-customOrange">
      <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="block" className="block mb-1">
            Block/House No
          </label>
          <select
            id="block"
            className="w-full px-4 py-2 border rounded-md"
            value={selectedBlock}
            onChange={handleBlockChange}
          >
            {/* Populate with your Block/House values */}
            <option value="blockA">Block A</option>
            <option value="blockB">Block B</option>
            {/* Add more options */}
          </select>
        </div>
        <div>
          <label htmlFor="block" className="block mb-1">
            Block/House No
          </label>
          <select
            id="block"
            className="w-full px-4 py-2 border rounded-md"
            value={selectedBlock}
            onChange={handleBlockChange}
          >
            {/* Populate with your Block/House values */}
            <option value="blockA">Block A</option>
            <option value="blockB">Block B</option>
            {/* Add more options */}
          </select>
        </div>
        <div>
          <label htmlFor="block" className="block mb-1">
            Block/House No
          </label>
          <select
            id="block"
            className="w-full px-4 py-2 border rounded-md"
            value={selectedBlock}
            onChange={handleBlockChange}
          >
            {/* Populate with your Block/House values */}
            <option value="blockA">Block A</option>
            <option value="blockB">Block B</option>
            {/* Add more options */}
          </select>
        </div>
        
        <div>
          <label htmlFor="block" className="block mb-1">
            Block/House No
          </label>
          <select
            id="block"
            className="w-full px-4 py-2 border rounded-md"
            value={selectedBlock}
            onChange={handleBlockChange}
          >
            {/* Populate with your Block/House values */}
            <option value="blockA">Block A</option>
            <option value="blockB">Block B</option>
            {/* Add more options */}
          </select>
        </div>
      </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
