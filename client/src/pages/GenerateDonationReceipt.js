import { useState, useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { PDFDocument, rgb } from 'pdf-lib';
//import { Document, Page } from 'react-pdf';
//import { fetchPdfTemplate } from '../helper/convert'; // Make sure the path is correct
import { Footer, Navbar, DonationReceipt, LoadingOverlay, GenerateDonationReceiptPdf, CommonTable } from '../components/index';
import { validatingForm } from '../helper/validate';
import { toast } from 'react-hot-toast';
import { CustomPostApi } from '../helper/helper';
import { object } from 'yup';

const GenerateDonationReceipt = () => {
    const [isloading, setIsloading] = useState(false);
    const [showPdfOverlay, setShowPdfOverlay] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const [getReceiptDetails, setGetReceiptDetails] = useState(null);
    const [searchType, setSearchType] = useState('phone_no');
    const [receiptsData, setReceiptsData] = useState(null);
    const [customHeading, setCustomHeading] = useState("Generate Receipt");

    const handleGenerateReceipt = async (receipt_no) => {
        if(!receipt_no){
            toast.error("Unable to get Receipt No.")
            return;
        }
        window.alert(`Are You Sure you wnat to generate receipt of no --> ${receipt_no}`)
        setIsloading(true);
        setGetReceiptDetails(null);
        try{
            console.log(receipt_no);
            const responce  = await CustomPostApi('auth/generateReceipt',{receipt_no:receipt_no})
            console.log(responce);
            if(responce.status===200){
                const data = responce.data.receipt_details[0]
                setShowPdfOverlay(true)
                setGetReceiptDetails(data);
                console.log("data-->",data)
            }else if(responce.status===404){
                toast.error("Details not Found")
            }else if(responce.status===422){
                toast.error("UnProgessige Action Please Check your Form Value Again.")
            }else if(responce.error){
                toast.error("Failed To Generate Pdf, Please try again later!")
            }else{

            }
        }catch(error){
            console.error(error);
        }finally{
            setIsloading(false);
        }
    }
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        setIsloading(true);
        console.log("values", values);
        setReceiptsData(null);
        setGetReceiptDetails(null);
        try {
            let responce = "";
            let reqData = "";
            if (values.receipt_search_type === "phoneno") {
                reqData = { phone_no: values.phone_no }
                responce = await CustomPostApi('auth/getReceiptsInfoByPhoneNo', reqData);
            } else {
                reqData = { receipt_no: values.receipt_no }
                responce = await CustomPostApi('auth/getReceiptsInfoByReceiptNo', reqData);
            }
            //Fetch additional details from the server using formData
            if (responce.error) {
                toast.error("Record Not Found!")
            } else if (responce.status === 200) {
                toast.success("Receipt Details Found Successfully!");
                actions.resetForm();
                const data = responce.data.data;
                setReceiptsData(data);
                setIsloading(false);
                console.log(data)
                toast.success("Now You can Download Your Receipt")
            } else {
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        } finally {
            actions.setSubmitting(false);
            setIsloading(false);
        }
    }
    return (
        <main>
            {getReceiptDetails && (
                <div style={{'zIndex':'1001'}}>
                <GenerateDonationReceiptPdf pdfData={pdfData} setPdfData={setPdfData} getReceiptDetails={getReceiptDetails} showPdfOverlay={showPdfOverlay} setShowPdfOverlay={setShowPdfOverlay} />
                </div>
            )}
            {isloading && <LoadingOverlay />}
            <Navbar />
            {/* Overlay with GeneratePdf component */}

            {/* Render your form or other components... */}
            <div className='my-10'>
                <DonationReceipt validatingSchema={validatingForm} handleSubmit={handleSubmit} searchType={searchType} setSearchType={setSearchType} formTitle={"Renerate Receipt."} />
            </div>
            <div>
                {receiptsData && (
                    //<CommonTable title={'Receipt Details'} headings={receiptsData.length? Object.keys(receiptsData[0]):[]} tabledata={receiptsData} />
                    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 my-2" style={{'zIndex':'1000'}}>
                        <div className="w-full max-w-screen-2xl p-6 bg-white shadow-lg rounded-md">
                            <h1 className="text-2xl font-bold mb-4">{"Receipt Details"}</h1>
                            <div className="overflow-x-auto">
                                {/* ... */}

                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="btn btn-primary bg-customOrange hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-5"
                                    table="table-to-xls"
                                    filename={"Shri_Ram_Leela_Data"}
                                    sheet={"Receipt Details"}
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
                                <table className="min-w-full divide-y divide-gray-300" id='table-to-xls'>
                                    <thead>
                                        <tr className="bg-customOrange">
                                            {Object.keys(receiptsData[0]).map((item, i) => (
                                                <th key={i} scope="col" className="py-3 px-6 text-left">
                                                    {item}
                                                </th>
                                            ))}
                                            <th key={receiptsData.length + 1} scope="col" className="py-3 px-6 text-left">
                                                {"Generate Receipt"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {receiptsData.map((item, key) => (
                                            <tr key={key} className=
                                                {`${key % 2 === 0 ? 'bg-customOrange' : 'bg-black'
                                                    }hover:bg-customOrange`
                                                }
                                            >
                                                {Object.keys(receiptsData[0]).map((item2, key2) => (
                                                    <td key={key2} className="py-4 px-6">
                                                        {item[item2]}
                                                    </td>
                                                ))}
                                                <div class="flex items-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full  mr-2 '`}></div>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                        onClick={() => handleGenerateReceipt(item.receipt_no)}
                                                    >
                                                        {"Generate Receipt"}
                                                    </button>
                                                </div>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* <div>
                    <button onClick={handleSubmit}>Change PDF</button>
                </div> */}

            <Footer />
        </main>
    );
};

export default GenerateDonationReceipt;