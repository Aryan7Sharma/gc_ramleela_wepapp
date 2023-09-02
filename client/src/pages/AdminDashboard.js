import { useState, useEffect } from 'react'
import { Footer, Navbar, FilterForm, InfoCard, LoadingOverlay, CommonNestedTable, SelectorComponent } from "../components/index";
import TabbedNavigation from '../components/temp2';
import { Data } from '../assets/data/data';
import { CustomGetApi } from '../helper/helper';
import { Toaster, toast } from 'react-hot-toast';
import { object } from 'yup';
import { data } from 'autoprefixer';


const tableHeadingData = Data.tableHeading.admin;
const AdminDashboard = () => {
    const [cardData, setCardData] = useState({
        total_receipts: 0,
        total_collectors: 0,
        total_donation: 0,
        total_donors: 0
    })
    const [allCollectionDetails, setAllCollectionDetails] = useState([]);
    const [allSociety, setAllSociety] = useState([]);
    const [allblock, setAllBlock] = useState([]);
    const [allflats, setAllFlats] = useState([]);
    const [society, setSociety] = useState("00");
    const [block, setBlock] = useState("00");
    const [filteredCollectionData, setFilteredCollectionData] = useState([]);
    const [tableHeading, setTableHeading] = useState(tableHeadingData.filteronSociety);
    const [tableTitle, setTableTitle] = useState("All Society")
    const [isloading, setIsloading] = useState(false);
    const infoCardData = Data.infoCardData.collections_data;

    const tables = ['Table A', 'Table B', 'Table C', 'Table D', 'Table E', 'Table F'];
    const handleCardData = (data) => {
        console.log("inside handleCardData");
        const societys = Object.keys(data);
        let total_receipts = 0
        let total_collectors = 0
        let total_donation = 0
        let total_donors = 0
        console.log(societys);
        for (let i = 0; i < societys.length; i++) {
            total_receipts += data[societys[i]].total_receipt.size;
            total_collectors += data[societys[i]].total_collector_id.size;
            total_donation += data[societys[i]].collected_ammount;
            total_donors += data[societys[i]].total_donor_phone_no.size;
        }
        console.log("check", total_receipts)
        setCardData({
            total_receipts: total_receipts,
            total_collectors: total_collectors,
            total_donation: total_donation,
            total_donors: total_donors
        })
    }
    const handleTableSelect = (selectedTable) => {
        // Fetch and display data for the selected table
        console.log(`Fetching data for ${selectedTable}`);
    };





    const mapallCollectionDetails = async (data) => {
        const flattenedData = data.map(item => ({
            "receipt_no": item.receipt_no,
            "collection_date": item.collection_date,
            "collected_ammount": item.collected_ammount,
            "payment_name": item.payment_name,
            "reference_no": item.reference_no,
            "collector_id": item.collector_id,
            "donor_name": item.tbl_donor_detail.name,
            "donor_flat_no": item.tbl_donor_detail.flat_no,
            "donor_block_no": item.tbl_donor_detail.block_no,
            "donor_society_name": item.tbl_donor_detail.society_name,
            "donor_city_name": item.tbl_donor_detail.city_name,
            "donor_phone_no": item.tbl_donor_detail.phone_no,
            "collector_name": item.tbl_user.name,
        }));
        return flattenedData;

    }
    const filteronSociety = async (data) => {
        const society = {};

        for (const i of data) {
            if (i.donor_society_name in society) {
                const sc = i.donor_society_name;
                society[sc].collected_ammount += parseInt(i.collected_ammount);
                society[sc].total_receipt.add(i.receipt_no);
                society[sc].total_collector_id.add(i.collector_id);
                society[sc].total_donor_phone_no.add(i.donor_phone_no);
                society[sc].total_donor_block_no.add(i.donor_block_no);
                society[sc].total_donor_flat_no.add(i.donor_flat_no);
                society[sc].total_collection_date.add(i.collection_date);
            } else {
                const currSociety = {
                    //society_name: i.donor_society_name,
                    collected_ammount: parseInt(i.collected_ammount),
                    total_receipt: new Set([i.receipt_no]),
                    total_collector_id: new Set([i.collector_id]),
                    total_donor_phone_no: new Set([i.donor_phone_no]),
                    total_donor_block_no: new Set([i.donor_block_no]),
                    total_donor_flat_no: new Set([i.donor_flat_no]),
                    total_collection_date: new Set([i.collection_date]),
                };
                society[i.donor_society_name] = currSociety;
            }
        }

        setAllSociety(society);
        return society;
    }
    const handleSocietyChange = async (event) => {
        try {
            const currSociety = event.target.value
            setSociety(currSociety);
            if (currSociety === "00" || !currSociety) {
                setTableTitle("All Society");
                setFilteredCollectionData(allSociety)
                setTableHeading(tableHeadingData.filteronSociety)
                setAllBlock([]);
            } else {
                console.log(currSociety)
                const blocks = allSociety[currSociety].total_donor_block_no;
                setTableTitle(currSociety  + " Society");
                setAllBlock(blocks);
                const data = allCollectionDetails;
                const filterByBlocks = {};

                for (const i of data) {
                    if (i.donor_society_name === currSociety) {
                        if (i.donor_block_no in filterByBlocks) {
                            const key = i.donor_block_no;
                            filterByBlocks[key].collected_ammount += parseInt(i.collected_ammount);
                            filterByBlocks[key].total_receipt.add(i.receipt_no);
                            filterByBlocks[key].total_collector_id.add(i.collector_id);
                            filterByBlocks[key].total_donor_phone_no.add(i.donor_phone_no);
                            filterByBlocks[key].total_donor_flat_no.add(i.donor_flat_no);
                            filterByBlocks[key].total_collection_date.add(i.collection_date);
                        } else {
                            const currBlock = {
                                //society_name: i.donor_society_name,
                                collected_ammount: parseInt(i.collected_ammount),
                                total_receipt: new Set([i.receipt_no]),
                                total_collector_id: new Set([i.collector_id]),
                                total_donor_phone_no: new Set([i.donor_phone_no]),
                                total_donor_flat_no: new Set([i.donor_flat_no]),
                                total_collection_date: new Set([i.collection_date]),
                            };
                            filterByBlocks[i.donor_block_no] = currBlock;
                        }
                    }

                }
                console.log("Block by Filter", filterByBlocks);
                setTableHeading(tableHeadingData.filteronBlock);
                setFilteredCollectionData(filterByBlocks);
            }

        } catch (error) {
            console.error("sss", error);
        }
    }
    const handleBlockChange = async (event) => {
        try {
            const currBlock = event.target.value
            setBlock(currBlock);
            if (currBlock === "00" || !currBlock) {
                setTableTitle(society + " Society");
                return;
             } else {
                console.log(society, currBlock)
                console.log(allSociety[society]);
                const flats = allSociety[society].total_donor_flat_no;
                setTableTitle(currBlock  + " Block");
                setAllFlats(flats);
                const data = allCollectionDetails;
                const filterByFlats = {};

                for (const i of data) {
                    if (i.donor_society_name === society && i.donor_block_no === currBlock) {
                        if (i.donor_flat_no in filterByFlats) {
                            const key = i.donor_flat_no;
                            filterByFlats[key].collected_ammount += parseInt(i.collected_ammount);
                            filterByFlats[key].total_receipt.add(i.receipt_no);
                            filterByFlats[key].total_collector_id.add(i.collector_id);
                            filterByFlats[key].total_collection_date.add(i.collection_date);
                        } else {
                            const currFlat = {
                                collected_ammount: parseInt(i.collected_ammount),
                                total_receipt: new Set([i.receipt_no]),
                                total_collector_id: new Set([i.collector_id]),
                                total_donor_phone_no: i.donor_phone_no,
                                total_donor_flat_no: i.donor_flat_no,
                                total_collection_date: new Set([i.collection_date]),
                            };
                            filterByFlats[i.donor_flat_no] = currFlat;
                        }
                    }

                }
                console.log("Flats by Filter", filterByFlats, society, block);
                setTableHeading(tableHeadingData.filteronFlats);
                setFilteredCollectionData(filterByFlats);
            }

        } catch (error) {
            console.error("sss", error);
        }
    }
    const fetchallCollectionDetails = async () => {
        try {
            setIsloading(true);
            const responce = await CustomGetApi('admin/getallCollectionsDetails');
            if (responce.status === 200) {
                const mapedData = responce.data?.data?.length > 0 ? await mapallCollectionDetails(responce.data.data) : []
                console.log("m", mapedData)
                setAllCollectionDetails(mapedData);
                await handlefilteredCollectionDataChange(filteronSociety, mapedData);
                console.log("filtereddatass", filteredCollectionData);
                toast.success("Data Loaded Successfully.");
            } else if (responce.status === 401) {
                toast.error("You are not authorized user to access this!")
                localStorage.removeItem("user_type");
                localStorage.removeItem("authToken");
            } else if (responce.error) {
                toast.error("Failed to Load Data, Contact your Developer!");
            } else {

            }
            setIsloading(false);
        } catch (error) {
            console.error(error)
        } finally {
            setIsloading(false);
        }
    }
    const handlefilteredCollectionDataChange = async (callback, data) => {
        const filterData = await callback(data);
        handleCardData(filterData);
        setFilteredCollectionData(filterData);
    }
    useEffect(() => {
        fetchallCollectionDetails();
    }, [])
    return (
        <main>
            {isloading ? <LoadingOverlay /> : <></>}
            <Navbar />
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='card my-10 '>
                <div className="grid grid-cols-2 gap-1 mx-2 sm:flex flex-col my-10  md:flex-row space-y-4 md:space-y-0 md:space-x-4 px-10">
                    <InfoCard key={0} title={"Total Donation"} info={cardData.total_donation} />
                    <InfoCard key={1} title={"Total Receipts"} info={cardData.total_receipts} />
                    <InfoCard key={2} title={"Total Donors"} info={cardData.total_donors} />
                    <InfoCard key={3} title={"Active Collectors"} info={cardData.total_collectors} />
                </div>
            </div>
            <form className="p-4 border rounded-lg shadow-md m-10 bg-customOrange">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SelectorComponent label={"Societys"} value={society} handleChange={handleSocietyChange} options={allSociety ? Object.keys(allSociety) : []} disabled={false} />
                    <SelectorComponent label={"Blocks"} value={block} handleChange={handleBlockChange} options={allblock ? allblock : []} disabled={society === "00"} />
                </div>
            </form>
            
                

            

            <CommonNestedTable title={"Collection Data By "+tableTitle+"."} headings={tableHeading} nestedTableData={filteredCollectionData} />


            <Footer />
        </main>
    )
}

export default AdminDashboard;
