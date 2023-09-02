// // const fs = require('fs');
// // const { PDFDocument, rgb } = require('pdf-lib');

// // (async () => {
// //   // Read the existing PDF file
// //   const pdfBytes = fs.readFileSync(`${__dirname}/assets/Sample_RECEIPTBOOK_final.pdf`);

// //   // Load the PDF document
// //   const pdfDoc = await PDFDocument.load(pdfBytes);

// //   // Get the first page of the PDF (you can change the index for other pages)
// //   const page = pdfDoc.getPages()[0];

// //   // Define the position or condinates of all fields where you want to add the text
// //    const textX = 170; // X-coordinate of the text
// //    const textY = 400; // Y-coordinate of the text
// //   const positions = {
// //     recipt_no:[110,380],
// //     date:[475,380],
// //     name:[170,405],
// //     address:[130,430],
// //     pan_no:[130,455],
// //     phone_no:[325,455],
// //     email_id:[435,455],
// //     payment_type:[170,480],
// //     ref_no:[330,480],
// //     amount_words:[155,505],
// //     amount:[130,560],
// // }
  

// //   // Add the text to the page
// //   for (const [key, value] of Object.entries(positions)) {
// //     //Do stuff where key would be 0 and value would be the object
// //     const fontSize = 12;
// //     page.drawText(`${key}`, {
// //         x: positions[key][0],
// //         y: page.getHeight() - positions[key][1], // PDF coordinates start from the bottom-left corner
// //         size: fontSize,
// //         color: rgb(0, 0, 0), // Black color
// //     });
// // }
  

// //   // Serialize the modified PDF
// //   const modifiedPdfBytes = await pdfDoc.save();

// //   // Write the modified PDF to a new file
// //   fs.writeFileSync(`${__dirname}/output.pdf`, modifiedPdfBytes);
// // })();


// // // const fs = require('fs');
// // // const { PDFDocument, rgb } = require('pdf-lib');
// // // const nodemailer = require('nodemailer');

// // // (async () => {
// // //   // Read the existing PDF file
// // //   const pdfBytes = fs.readFileSync(`${__dirname}/assets/Sample_RECEIPTBOOK_final.pdf`);

// // //   // Load the PDF document
// // //   const pdfDoc = await PDFDocument.load(pdfBytes);

// // //   // Get the first page of the PDF (you can change the index for other pages)
// // //   const page = pdfDoc.getPages()[0];

// // //   // Define the positions of all fields where you want to add the text
// // //   const positions = {
// // //     recipt_no: [110, 380],
// // //     date: [475, 380],
// // //     name: [170, 405],
// // //     address: [130, 430],
// // //     pan_no: [130, 455],
// // //     phone_no: [325, 455],
// // //     email_id: [435, 455],
// // //     payment_type: [170, 480],
// // //     ref_no: [330, 480],
// // //     amount_words: [155, 505],
// // //     amount: [130, 560],
// // //     E_Signed_Pdf: [330, 545],
// // //   };

// // //   // Add the text to the page
// // //   const fontSize = 12;
// // //   for (const [key, value] of Object.entries(positions)) {
// // //     page.drawText(`${key}`, {
// // //       x: positions[key][0],
// // //       y: page.getHeight() - positions[key][1], // PDF coordinates start from the bottom-left corner
// // //       size: fontSize,
// // //       color: rgb(0, 0, 0), // Black color
// // //     });
// // //   }

// // //   // Serialize the modified PDF
// // //   const modifiedPdfBytes = await pdfDoc.save();

// // //   // Create a nodemailer transporter
// // //   const transporter = nodemailer.createTransport({
// // //     service: 'Gmail', // Use the appropriate email service
// // //     auth: {
// // //       user: 'your_email@gmail.com', // Your email
// // //       pass: 'your_password', // Your email password or an application-specific password
// // //     },
// // //   });

// // //   // Define email options
// // //   const mailOptions = {
// // //     from: 'your_email@gmail.com',
// // //     to: 'recipient@example.com', // Recipient email
// // //     subject: 'Modified PDF Attachment',
// // //     text: 'Check out the attached PDF',
// // //     attachments: [
// // //       {
// // //         filename: 'modified_receipt.pdf',
// // //         content: modifiedPdfBytes,
// // //       },
// // //     ],
// // //   };

// // //   // Send the email
// // //   transporter.sendMail(mailOptions, (error, info) => {
// // //     if (error) {
// // //       console.log(error);
// // //     } else {
// // //       console.log('Email sent: ' + info.response);
// // //     }
// // //   });
// // // })();

// const pdfDetails = {
//   receipt_no: "receipt_no",
//   collection_date: "today_date",
//   name: "name",
//   address: "address",
//   pan_no: "pan_no",
//   phone_no: "phone_no",
//   email_id: "email_id",
//   payment_name: "payment_name",
//   reference_no: "reference_no",
//   amountInWords: "amountInWords",
//   collection_amount:"collection_amount",
// }

// const {generateDonationPdfBytesData} = require("./generatePDFs");
// const {sendPdfViaMail} = require("./sendMail");

// (async()=>{
//   const pdfBytesData = await generateDonationPdfBytesData(pdfDetails);
//   console.log(pdfBytesData)
//   const email = "aryan2003investment@gmail.com";
//   const message = "just testing it out";
//   const pdfName  = "testing_777.pdf";
//   const sendmailResponce = await sendPdfViaMail(email,"testing", message, pdfBytesData, pdfName);
//   console.log("status",sendmailResponce);
// })();


// const { CollectionsDetails, DonorDetails } = require('./models'); // Update the path to your models

// // Define the association between the models
// CollectionsDetails.belongsTo(DonorDetails, { foreignKey: 'donor_phoneno', targetKey: 'phone_no' });

// // Perform the LEFT JOIN query
// CollectionsDetails.findAll({
//   attributes: ['data1', 'data2', 'data4'],
//   include: [
//     {
//       model: DonorDetails,
//       attributes: [], // Only select the desired attributes from CollectionsDetails
//     },
//   ],
// });


function generatePassword() {
  const length = 16;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
  }
  return password;
}
console.log(generatePassword());
