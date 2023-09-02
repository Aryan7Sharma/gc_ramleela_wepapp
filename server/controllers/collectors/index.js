const fs = require('fs').promises;
const { env } = process;
//const sequelize = require('sequelize'); // Import Sequelize
const sequelize = require("../../database/connection");
const { numberToWords, payTypeTopayName } = require("../../utils/commonFunc");
const generate_receipt_no = require("../../utils/generating_receipt_num");
const { generateDonationPdfBytesData } = require("../../utils/generatePDFs");
const { sendPdfViaMail } = require("../../utils/sendMail");

// Models
const { donors, collections, users, guestdonors } = require("../../models/masters/index");

// import db function
const {getReceiptInfo} = require("../../models/masters/functions/index");



const donationCollectionforGuest = async (req, res) => {
    try {
        const collector_id = req.collector_id;
        if (!collector_id) { return res.status(502).json({ status: env.s502, msg: "Unable to find your identity" }) };
        const { name, flat_no, block_no, society_name,city_name, collected_ammount, payment_type, reference_no } = req.body;
        const payment_name = payTypeTopayName(payment_type);
        receipt_no = await generate_receipt_no();
        //receipt_no = "e2023080270"
        console.log(require.main === module, receipt_no);
        const today_date = new Date().toISOString().slice(0, 10);
        const collectionDetails = {
            receipt_no: receipt_no,
            donor_phoneno: "NA",
            collector_id: collector_id,
            collection_date: today_date,
            collected_ammount: parseInt(collected_ammount),
            payment_type: payment_type,
            payment_name: payment_name,
            reference_no: reference_no || "NA"
        }
        console.log("collectionDetails---->",collectionDetails)
        const address = flat_no+", "+block_no+", "+society_name+", "+city_name;
        const guestdonorDetails = {
            name: name,
            receipt_no:receipt_no,
            flat_no:flat_no || 'NA',
            block_no: block_no || 'NA',
            society_name: society_name || 'NA',
            city_name:city_name || 'NA',
            address: address,
            creation_date: today_date,
            creater_id: collector_id,
        }
        console.log("guest donor details",guestdonorDetails);
        // Start a transaction
        const performTransaction = async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    await sequelize().transaction(async (t) => {
                        console.log("inside transaction");

                        // Check if a donor with the provided phone_no already exists
                        const existingGuestDonor = await guestdonors.findOne({ where: { receipt_no: receipt_no } });

                        if (!existingGuestDonor) {
                            // Donor doesn't exist, so create a new donor
                            await guestdonors.create(guestdonorDetails, { transaction: t });
                        }

                        // Save collection details
                        await collections.create(collectionDetails, { transaction: t });

                        // Commit the transaction
                        await t.commit();
                        // Resolve the Promise to indicate successful commit
                        resolve({ "status": "committed" });
                    });
                } catch (error) {
                    // Roll back the transaction if an error occurs
                    // Reject the Promise to indicate transaction failure
                    reject({ "status": "failed", "error": error });
                }
            });
        };

        const dbUpdateResp = await performTransaction();

        console.log("responce-->", dbUpdateResp);
        // check mail_id
        console.log("outside transaction")
        const receipt_details = await getReceiptInfo(receipt_no);
        if (!receipt_details.length) { return res.status(404).json({ status: env.s404, msg: "Receipt Details did not Found!" }); }
        return res.status(200).json({ status: env.s200, msg: "Details saved successfully, E-Generated Receipt Send Over Provided Mail ID", data: receipt_details });
        //res.status(200).json({ status: env.s200, msg: "Details saved successfully, E-Generated Receipt Send Over Provided Mail ID." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};


const donationCollection = async (req, res) => {
    try {
        const collector_id = req.collector_id;
        if (!collector_id) { return res.status(502).json({ status: env.s502, msg: "Unable to find your identity" }) };
        const { name, email_id, phone_no, flat_no, block_no, society_name,city_name, pan_no, collected_ammount, payment_type, reference_no } = req.body;
        const payment_name = payTypeTopayName(payment_type);
        receipt_no = await generate_receipt_no();
        //receipt_no = "e2023080270"
        console.log(require.main === module, receipt_no);
        const today_date = new Date().toISOString().slice(0, 10);
        const collectionDetails = {
            receipt_no: receipt_no,
            donor_phoneno: phone_no,
            collector_id: collector_id,
            collection_date: today_date,
            collected_ammount: parseInt(collected_ammount),
            payment_type: payment_type,
            payment_name: payment_name,
            reference_no: reference_no || "NA"
        }
        const address = flat_no+", "+block_no+", "+society_name+", "+city_name;
        const donorDetails = {
            phone_no: phone_no,
            name: name,
            email_id: email_id,
            flat_no:flat_no,
            block_no: block_no,
            society_name: society_name,
            city_name:city_name,
            address: address,
            pan_no: pan_no || "NA",
            creation_date: today_date,
            creater_id: collector_id,
        }
        console.log("donor details",donorDetails);
        // Start a transaction
        const performTransaction = async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    await sequelize().transaction(async (t) => {
                        console.log("inside transaction");

                        // Check if a donor with the provided phone_no already exists
                        const existingDonor = await donors.findOne({ where: { phone_no: donorDetails.phone_no } });

                        if (!existingDonor) {
                            // Donor doesn't exist, so create a new donor
                            await donors.create(donorDetails, { transaction: t });
                        }

                        // Save collection details
                        await collections.create(collectionDetails, { transaction: t });

                        // Commit the transaction
                        await t.commit();
                        // Resolve the Promise to indicate successful commit
                        resolve({ "status": "committed" });
                    });
                } catch (error) {
                    // Roll back the transaction if an error occurs
                    // Reject the Promise to indicate transaction failure
                    reject({ "status": "failed", "error": error });
                }
            });
        };

        const dbUpdateResp = await performTransaction();

        console.log("responce-->", dbUpdateResp);
        // check mail_id
        console.log("outside transaction")
        if (!email_id) { res.status(200).json({ status: env.s200, msg: "Details saved successfully, pdf didn't send because of Invalid Mail ID." }); };

        const amountInWords = numberToWords(collected_ammount);
        // generate pdf and send over mail
        const pdfFormDetails = {
            receipt_no: receipt_no,
            collection_date: today_date,
            name: name,
            address: address,
            pan_no: pan_no,
            phone_no: phone_no,
            email_id: ", " + email_id,
            payment_name: payment_name,
            reference_no: reference_no,
            amountInWords: amountInWords,
            collection_amount: collected_ammount + "-/-",
        }
        const pdfBytesData = await generateDonationPdfBytesData(pdfFormDetails);
        console.log(pdfBytesData)
        const sendmailResponce = await sendPdfViaMail(email_id, name, receipt_no, pdfBytesData);
        console.log("status", sendmailResponce);
        //if (sendmailResponce.status !== "successfull") { res.status(417).json({ status: env.s417, msg: "Details saved successfully, pdf didn't send because of Invalid Mail ID." }); };
        // sending final responce;
        const receipt_details = await getReceiptInfo(receipt_no);
        if (!receipt_details.length) { return res.status(404).json({ status: env.s404, msg: "Receipt Details did not Found!" }); }
        return res.status(200).json({ status: env.s200, msg: "Details saved successfully, E-Generated Receipt Send Over Provided Mail ID", data: receipt_details });
        //res.status(200).json({ status: env.s200, msg: "Details saved successfully, E-Generated Receipt Send Over Provided Mail ID." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};





const getCollectedMoneyDetails = async (req, res) => {

    try {

    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};


const updateProfile = async (req, res) => {
    try {
        const collector_id = req.collector_id;
        const { name } = req.body;
        updatedData = {name:name};
        // Update the user record
        await users.update(updatedData, {
            where: { email_id: collector_id }, // Specify the user ID for updating
        })
        res.status(200).json({ status: env.s200, msg: "Your Details Updated Successfully." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: env.s500, msg: "Details Updation Failed", error: error });
    }
};

const getDonorDetail = async (req, res) => {
    try {
        const { phone_no } = req.body;
        const donorDetail = await donors.findByPk(phone_no,{
            attributes:['name', 'email_id', 'flat_no', 'block_no', 'society_name', 'city_name', 'pan_no']
        });
        if(!donorDetail){ return res.status(404).json({ status: env.s404, msg: "OOps Donor not found." }); };
        return res.status(200).json({ status: env.s200, msg: "Donor Details Founded Successfully", donor_detail: donorDetail });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error" });
    }
};

const getallCollectionsDetails = async (req, res) => {
    try {
        const collector_id = req.collector_id;
        // Define the associations between the models
        collections.belongsTo(donors, { foreignKey: 'donor_phoneno', targetKey: 'phone_no' });
        collections.belongsTo(users, { foreignKey: 'collector_id', targetKey: 'email_id' });

        // Perform the LEFT JOIN query
        const allcollectionsdetails = await collections.findAll({
            attributes: ['receipt_no', 'collection_date', 'collected_ammount', 'payment_name', 'reference_no', 'collector_id'],
            include: [
                {
                    model: donors,
                    attributes: ['name','flat_no', 'block_no', 'society_name', 'city_name', 'phone_no','creation_date'], // Only select the desired attributes from CollectionsDetails
                },
                {
                    model: users,
                    attributes: ['name'], // Select the collector's name from the Users table
                },
            ],
            where:{
                collector_id:collector_id
            },
        });
        if (!allcollectionsdetails) { return res.status(404).json({ status: env.s404, msg: "OOPs data not found!" }); };
        return res.status(200).json({ status: env.s200, msg: "data found successfully", data: allcollectionsdetails });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};


module.exports = {
    donationCollection,
    donationCollectionforGuest,
    getCollectedMoneyDetails,
    updateProfile,
    getDonorDetail,
    getallCollectionsDetails
}
