import { useRef } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const CommonNestedTable = ({ title, headings, nestedTableData }) => {

    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 my-2">
            <div className="w-full max-w-screen-2xl p-6 bg-white shadow-lg rounded-md">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <div className="overflow-x-auto">
                    {/* ... */}
                    <table className="min-w-full divide-y divide-gray-300" id='table-to-xls'>
                        <thead>
                            <tr className="bg-customOrange">
                                {headings?.map((item, i) => (
                                    <th key={i} scope="col" className="py-3 px-6 text-left">
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {nestedTableData ? Object.keys(nestedTableData)?.map((item, key) => (
                                <tr key={key} className="hover:bg-gray-50 transition duration-300 transform hover:scale-105">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {item}
                                    </th>
                                    {Object.values(nestedTableData[item])?.map((item2, key2) => (
                                        <td key={key2} className="py-4 px-6">
                                            {item2 instanceof Set ? item2.size : item2}
                                        </td>
                                    ))}
                                </tr>
                            )) : <></>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default CommonNestedTable
