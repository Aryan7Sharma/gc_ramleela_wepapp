

const CommonTable = ({ ...props }) => {

    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 my-2">
            <div className="w-full max-w-screen-2xl p-6 bg-white shadow-lg rounded-md">
                <h1 className="text-2xl font-bold mb-4">{props?.title}</h1>
                <div className="overflow-x-auto">
                    {/* ... */}
                    {/* {props?.tabledata && (
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-primary bg-customOrange hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-5"
                            table="table-to-xls"
                            filename={"Shri_Ram_Leela_Data"}
                            sheet={props.title}
                            buttonText={
                                <>
                                    <svg
                                        className="fill-current w-4 h-4 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                                    </svg>
                                    Export to Excel
                                </>
                            }
                        />
                    )} */}
                    <table className="min-w-full divide-y divide-gray-300" id='table-to-xls'>
                        <thead>
                            <tr className="bg-customOrange">
                                {props?.headings?.map((item, i) => (
                                    <th key={i} scope="col" className="py-3 px-6 text-left">
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {props?.tabledata?.map((item, key) => (
                                <tr key={key} className=
                                    {`${key % 2 === 0 ? 'bg-customOrange' : 'bg-black'
                                        }hover:bg-customOrange transition duration-300 transform hover:scale-105`
                                    }
                                >
                                    {props?.headings?.map((item2, key2) => (
                                        <td key={key2} className="py-4 px-6">
                                            {props.headings ? item[item2] : null}
                                        </td>
                                    ))}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default CommonTable;
