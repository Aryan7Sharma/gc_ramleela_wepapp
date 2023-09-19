import { useEffect, useState } from "react"
import { Navbar, Footer, LoadingOverlay } from "../components"
import avatar from '../assets/profile.png';
import { Toaster, toast } from "react-hot-toast";
import { CustomGetApi, CustomPostApi } from "../helper/helper";
const CollectorManagement = () => {
  const url = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api"
  const [isloading, setIsloading] = useState(false);
  const [collectors, setCollectors] = useState(null);
  const [collector, setCollector] = useState(null);

  const handleStatusChange = async (status, email_id) => {
    try {
      setIsloading(true);
      if (!status || !email_id) {
        toast.error("Unable to Get Email ID or Status");
        return;
      }
      const action = status==="Active"?"N":"Y"
      window.alert(`Are you Sure You want ${action==="Y"?"Activate":"Block"} this user`)
      const data = { "collector_id": email_id, "action": action };
      const response = await CustomPostApi('admin/collectorBlockUnblock', data);
      if (response.status === 200) {
        toast.success("Collector Status Updated Successfully.");
        await fetchCollectorsData();
      } else if (response.status === 500) {
        toast.error("Something went Wrong!");
      } else if (response.status === 422) {
        toast.error("UnProgessive Entity");
      } else if (response.error) {
        toast.error("Failed to Update Collector Status");
      } else {
        // Handle other cases if needed
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setIsloading(false);
    }
  };

  const fetchCollectorsData = async () => {
    try {
      setIsloading(true);
      setCollectors(null);
      const responce = await CustomGetApi('admin/getallCollectorsDetails');
      if (responce.status === 200) {
        setCollectors(responce.data?.data);
      } else if (responce.status === 500) {
        toast.error("Something went wrong!")
      } else if (responce.error) {
        toast.error("Failed to load Collectors Details");
      } else {
        toast.error("Something went wrong!")
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    fetchCollectorsData();
  }, [])
  return (
    <main>
      
      <Navbar />
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
      {collectors &&(
        <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 my-2">
          <div className="w-full max-w-screen-2xl p-6 bg-white shadow-lg rounded-md">
            <h1 className="text-2xl font-bold mb-4">{"All Collectors Details"}</h1>
            <div className="overflow-x-auto">
              {/* ... */}
              {/* {(
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="btn btn-primary bg-customOrange hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-5"
                  table="table-to-xls"
                  filename={"Shri_Ram_Leela_Data"}
                  sheet={"All_Collectors_Details"}
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
                    <th key={0} scope="col" className="py-3 px-6 text-left">
                      Serial Number
                    </th>
                    <th key={1} scope="col" className="py-3 px-6 text-left">
                      Collector
                    </th>
                    <th key={2} scope="col" className="py-3 px-6 text-left">
                      Phone No
                    </th>
                    <th key={3} scope="col" className="py-3 px-6 text-left">
                      Address
                    </th>
                    <th key={4} scope="col" className="py-3 px-6 text-left">
                      Creation Date
                    </th>
                    <th key={5} scope="col" className="py-3 px-6 text-left">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {collectors.map((item, key) => (
                    <tr key={key} className=
                      {`${key % 2 === 0 ? 'bg-customOrange' : 'bg-black'
                        }hover:bg-customOrange transition duration-300 transform hover:scale-105`
                      }
                    >
                      <td key={0} className="py-4 px-6">
                        {key + 1}
                      </td>
                      <th key={1} scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                        <img className="w-10 h-10 rounded-full" src={item.profile_img_path && item.profile_img_path!== "NA" ? `${url}/auth/images/profileimg/${item.profile_img_path}` : avatar} alt="Profile image" />
                        <div className="pl-3">
                          <div className="text-base font-semibold">{item.name.toString()}</div>
                          <div className="font-normal text-gray-500">{item.email_id.toString()}</div>
                        </div>
                      </th>
                      <td key={2} className="py-4 px-6">
                        {item.phone_no}
                      </td>
                      <td key={3} className="py-4 px-6">
                        {item.address}
                      </td>
                      <td key={4} className="py-4 px-6">
                        {item.creation_date}
                      </td>
                      <td key={5} className="py-4 px-6">
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full  mr-2 ${item.status === "Active" ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => handleStatusChange(item.status, item.email_id)}
                          >
                            {item.status}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {collectors && (<Footer />)}
      
      
    </main>
  )
}

export default CollectorManagement
