const nodemailer = require('nodemailer');

//Create a nodemailer transporter with your Gmail account
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'fcreation.tech@gmail.com',
    pass: 'cztyfotvdzodsbot',
  },
});

const sendCustomMessageViaMail = (email, message) => {
    // Compose the email message
    const mailOptions = {
      from: 'fcreation.tech@gmail.com',
      to: email,
      subject: '',
      text: `${message}`,
    };
    // Send the email using the nodemailer transporter
    transporter.sendMail(mailOptions, (error, info) => {
        let status = ""
        if (error) {
        status = "failed"
        console.error('Error sending email:', error);
        }
        status = "successfull"
        return {"status":status}
    });
}


// sending pdf via mail
const sendPdfViaMail = async (email, name, receipt_no, pdfBytesData) => {
    const message = `Dear ${name},
We hope this message finds you well. We deeply appreciate your generous contribution to our Ram Leela event, and we're grateful for your support in making this cultural celebration a success.
    
As a token of our gratitude, we're sending you an electronically generated donation receipt for your records. This receipt outlines the details of your donation to our Ram Leela event.
    
[Attach the PDF file: "RamLeela_Donation_Receipt_${receipt_no}.pdf"]
    
Please feel free to reach out if you have any questions or if there's anything else you'd like to know about our Ram Leela event or our organization. Your continued support is invaluable to us.
    
Once again, thank you for your generosity, and we look forward to welcoming you to our future events.
    
Warm regards,
Gaur City Ram Leela Trust
Phone No -- 96439 76677
Website  -- www.srstrust.com`
    return new Promise((resolve, reject) => {
        // Compose the email message
        const mailOptions = {
            from: 'fcreation.tech@gmail.com',
            to: email,
            subject: "Ram Leela Donation Receipt",
            text: `${message}`,
            attachments: [
                {
                    filename: `RamLeela_Donation_Receipt_${receipt_no}.pdf`,
                    content: pdfBytesData,
                },
            ],
        };
        // Send the email using the nodemailer transporter
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //console.error('Error sending email:', error);
                reject({ "status": "failed" }); // reject the promise with a failed status
            } else {
                //console.log("info", info);
                resolve({ "status": "successfull" }); // Resolve the promise with a successful status
            }
        });
    });
}


const sendNewPassword = async (email, newPassword) => {
    const message = `Hello,
We received a request to reset your password because you forgot your current password. We're here to help!

Your new password is: [${newPassword}]
    
Please use this new password to log in to your account. We recommend changing this password to something memorable and secure once you log in.
    
If you did not request this password reset, please ignore this email or contact our admin immediately.
    
Thank you for using our services.
    


Best regards,
Gaur City Ram Leela Trust
Phone No -- 9910201296
Website  -- www.srstrust.com`
    return new Promise((resolve, reject) => {
        // Compose the email message
        const mailOptions = {
            from: 'fcreation.tech@gmail.com',
            to: email,
            subject: "Your New Password",
            text: `${message}`
        };
        // Send the email using the nodemailer transporter
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //console.error('Error sending email:', error);
                reject({ "status": "failed" }); // reject the promise with a failed status
            } else {
                //console.log("info", info);
                resolve({ "status": "successfull" }); // Resolve the promise with a successful status
            }
        });
    });
}

module.exports = {
    sendCustomMessageViaMail,
    sendPdfViaMail,
    sendNewPassword
};