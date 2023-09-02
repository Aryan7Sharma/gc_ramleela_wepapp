const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

const generateDonationPdfBytesData = async (data) => {
  // Read the existing PDF file
  const pdfBytes = fs.readFileSync(`${__dirname}/assets/Sample_RECEIPTBOOK_final.pdf`);

  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get the first page of the PDF (you can change the index for other pages)
  const page = pdfDoc.getPages()[0];

  // name, email_id, phone_no, block_no, society, address, pan_no, collected_ammount, payment_type, reference_no
  // Define the position or condinates of all fields where you want to add the text
   const textX = 170; // X-coordinate of the text
   const textY = 400; // Y-coordinate of the text
  const positions = {
    receipt_no:[110,380],
    collection_date:[475,380],
    name:[170,405],
    address:[130,430],
    pan_no:[130,455],
    phone_no:[323,455],
    email_id:[390,455],
    payment_name:[170,480],
    reference_no:[330,480],
    amountInWords:[155,505],
    collection_amount:[130,560],
}
  

  // Add the text to the page
  for (const [key, value] of Object.entries(positions)) {
    //Do stuff where key would be 0 and value would be the object
    const fontSize = 12;
    page.drawText(`${data[key]}`, {
        x: value[0],
        y: page.getHeight() - value[1], // PDF coordinates start from the bottom-left corner
        size: fontSize,
        color: rgb(0, 0, 0), // Black color
    });
}
  

  // Serialize the modified PDF
  const modifiedPdfBytes = await pdfDoc.save();

  // Write the modified PDF to a new file
  fs.writeFileSync(`${__dirname}/output.pdf`, modifiedPdfBytes);

  // return pdf data
  return modifiedPdfBytes
};
const pdfFormDetails = {
  receipt_no: "e2023081254",
  collection_date: new Date(),
  name: "Aryan Sharma",
  address: "address",
  pan_no: "pan_no",
  phone_no: "8923136015",
  email_id: ", email_id@gmail.com",
  payment_name: "payment_name",
  reference_no: "reference_no",
  amountInWords: "amountInWords",
  collection_amount:"50000 -/-",
}
generateDonationPdfBytesData(pdfFormDetails);
module.exports = {
  generateDonationPdfBytesData,
};