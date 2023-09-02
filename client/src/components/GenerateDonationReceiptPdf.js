import { useEffect, useState } from 'react';
import { fetchPdfTemplate } from '../helper/convert';
import { PDFDocument, rgb } from 'pdf-lib';

const GenerateDonationReceiptPdf = ({ pdfData, setPdfData, getReceiptDetails, showPdfOverlay, setShowPdfOverlay }) => {

    const handlePdfOverlayClose = () => {
        setShowPdfOverlay(false)
    }

    const handleDownload = () => {
        try {
            if (pdfData) {
                const blob = new Blob([pdfData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'modified_receipt.pdf';
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error("error",err);
        }
    };

    const modifyPdf = async (pdfTemData, receiptDetails) => {
        // Create a PDFDocument from the template
        try {
            const pdfBytes = new Uint8Array(pdfTemData);
            if (!(pdfBytes instanceof Uint8Array)) {
                throw new Error('Invalid pdfData format');
            }
            const pdfDoc = await PDFDocument.load(pdfBytes);

            // Modify the PDFDoc using fetchedData
            const page = pdfDoc.getPages()[0];
            // Modify fields as per your requirements
            page.drawText(receiptDetails?.receipt_no || "NA",  { x: 110, y: 460, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.collection_date || "NA", { x: 480, y: 461, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.donor_name || "NA", { x: 170, y: 436, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.address || "NA", { x: 130, y: 411, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.pan_no || "NA", { x: 130, y: 386, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.donor_phone_no || receiptDetails?.donor_email_id || "NA", { x: 336, y: 386, size: 12, color: rgb(0, 0, 0) });
            //page.drawText(receiptDetails?.donor_email_id || "NA", { x: 390, y: 386, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.payment_name || "NA", { x: 170, y: 361, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.reference_no || "NA", { x: 330, y: 361, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.collected_amount || "NA", { x: 155, y: 336, size: 12, color: rgb(0, 0, 0) });
            page.drawText(receiptDetails?.collected_amount || "NA", { x: 130, y: 280, size: 12, color: rgb(0, 0, 0) });
            // Add more modifications here

            // Serialize the modified PDF
            const modifiedPdfBytes = await pdfDoc.save();
            // return the modified PDF data for Seting up to the receipt Template.
            return modifiedPdfBytes;
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchPdfTemplate()
            .then((resp) => {
                //setPdfData(resp);
                return modifyPdf(resp, getReceiptDetails); // Return the modified PDF data
            })
            .then((modifiedPdfBytes) => {
                setPdfData(modifiedPdfBytes);
            })
            .catch((err) => console.error(err));
        // fetchPdfTemplate()
        //     .then((resp) => setPdfData(resp))
        //     .catch((err) => console.error(err));
    }, []); // Run this effect once when the component mounts

    return (
        <div>
            {/* Overlay with GeneratePdf component */}
            {showPdfOverlay && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <div className=''>
                            <div className='flex justify-center sm:justify-end my-5 mx-auto'>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out sm:mr-10"
                                    onClick={handleDownload}
                                >
                                    Download PDF
                                </button>
                            </div>
                            <div className="bg-white p-6 rounded-lg">
                                <div>
                                    {pdfData && (<iframe
                                        src={`data:application/pdf;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(pdfData)))}`}
                                        width="100%"
                                        height="500px"
                                        title="Generated PDF"
                                    >
                                        This browser does not support PDFs. Please download the PDF to view it.
                                    </iframe>)}
                                </div>
                            </div>
                        </div>
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={handlePdfOverlayClose}
                        >
                            <svg className="w-6 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    </div>
            )}

        </div>
    );
};

export default GenerateDonationReceiptPdf;



// const modifyPdf = async (receiptDeatails) => {
//     // Create a PDFDocument from the template
//     try {
//         const pdfBytes = new Uint8Array(pdfData);
//         if (!(pdfBytes instanceof Uint8Array)) {
//             throw new Error('Invalid pdfData format');
//         }
//         const pdfDoc = await PDFDocument.load(pdfBytes);
//         console.log("load", pdfDoc, "receiptDetails", receiptDeatails);

//         // Modify the PDFDoc using fetchedData
//         const page = pdfDoc.getPages()[0];
//         // Modify fields as per your requirements
//         page.drawText(receiptDeatails.receipt_no, { x: 110, y: 460, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.collection_date, { x: 480, y: 461, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.donor_name, { x: 170, y: 436, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.address, { x: 130, y: 411, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.pan_no, { x: 130, y: 386, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.donor_phone_no, { x: 336, y: 386, size: 12, color: rgb(0, 0, 0) });
//         //page.drawText(receiptDeatails.donor_email_id, { x: 390, y: 391, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.payment_name, { x: 170, y: 361, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.reference_no, { x: 330, y: 361, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.collected_amount, { x: 155, y: 336, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(receiptDeatails.collected_amount, { x: 130, y: 280, size: 12, color: rgb(0, 0, 0) });
//         // Add more modifications here

//         // Serialize the modified PDF
//         const modifiedPdfBytes = await pdfDoc.save();
//         // return the modified PDF data for Seting up to the receipt Template.
//         return modifiedPdfBytes;
//     } catch (error) {
//         console.error(error)
//     }
// }
