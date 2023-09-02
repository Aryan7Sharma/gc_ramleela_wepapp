import React from 'react'

const SelectorComponent = ({ label, value, handleChange, options,disabled }) => {
    return (
        <div>
            <label htmlFor="block" className="block mb-1">
                {label}
            </label>
            <select
                id="block"
                className="w-full px-4 py-2 border rounded-md"
                value={value}
                onChange={handleChange}
                disabled={disabled}
            >
                <option key={0} value="00">All</option>
                {Array.isArray(options)?options?.map((item,index)=>(
                    <option key={index+1} value={item}>{item}</option>
                )):
                Array.from(options).map(item => (<option key={item} value={item}>{item}</option>))
                }
            </select>
        </div>
    )
}

export default SelectorComponent
