
// import models
const { users, loginCredentials, donors, collections } = require("../../models/masters/index");
const { env } = process;
// import utils function's
const { hashPassword } = require("../../utils/commonFunc");
// import db function's
const { getAllCollectors } = require('../../models/masters/functions/index');

const registerCollector = async (req, res) => {
    try {
        const { name, email_id, phone_no, password, flat_no, block_no, society_name, city_name } = req.body;
        let profileImgPath = 'NA';
        if(req.file){
            const uploadProfileImage = req.file;
            profileImgPath = uploadProfileImage?.filename;
        }
        //Check if the collector with the provided email already exists
        const existingCollector = await users.findOne({ where: { email_id: email_id } });
        if (existingCollector) { return res.status(409).json({ status: env.s409, msg: "User already registered with this email" }); }
        // registering new collector
        const collectorDetails = {
            name: name,
            email_id: email_id,
            phone_no: phone_no,
            flat_no: flat_no,
            block_no: block_no,
            society_name: society_name,
            city_name: city_name,
            address: flat_no + ", " + block_no + ", " + society_name + ", " + city_name,
            profile_img_path:profileImgPath || 'NA',
            creation_date: new Date(),
            creater_id: req.user_id
        };
        const newCollector = await users.create(collectorDetails);
        if (!newCollector) { return res.status(304).json({ status: env.s304, msg: "Collector Registaction Failed!" }); };
        // registering collector login credentials
        const hash_password = await hashPassword(password); // convert plain password into hashpassword
        const collectorLoginCredDetails = { user_id: email_id, hash_password: hash_password, user_type: 1 };
        const collectorLoginCred = await loginCredentials.create(collectorLoginCredDetails);
        if (!collectorLoginCred) { return res.status(304).json({ status: env.s304, msg: "Collector Login Creation Failed please try again or contact a developer." }); };
        return res.status(201).json({ status: env.s201, msg: "Collector Registered Successfully!" });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const getallCollectionsDetails = async (req, res) => {
    try {
        // Define the associations between the models
        collections.belongsTo(donors, { foreignKey: 'donor_phoneno', targetKey: 'phone_no' });
        collections.belongsTo(users, { foreignKey: 'collector_id', targetKey: 'email_id' });

        // Perform the LEFT JOIN query
        const allcollectionsdetails = await collections.findAll({
            attributes: ['receipt_no', 'collection_date', 'collected_ammount', 'payment_name', 'reference_no', 'collector_id'],
            include: [
                {
                    model: donors,
                    attributes: ['name', 'flat_no', 'block_no', 'society_name', 'city_name', 'phone_no', 'creation_date'], // Only select the desired attributes from CollectionsDetails
                },
                {
                    model: users,
                    attributes: ['name'], // Select the collector's name from the Users table
                },
            ],
        });
        if (!allcollectionsdetails) { return res.status(404).json({ status: env.s404, msg: "OOPs data not found!" }); };
        return res.status(200).json({ status: env.s200, msg: "data found successfully", data: allcollectionsdetails });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const getallUsersDetails = async (req, res) => {
    try {
        const allusersdata = await users.findAll();
        if (!allusersdata) { return res.status(404).json({ status: env.s404, msg: "OOPs data not found!" }); };
        return res.status(200).json({ status: env.s200, msg: "data found successfully", data: allusersdata });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const getallCollectorsDetails = async (req, res) => {
    try {
        const allcollectors = await getAllCollectors();
        if (!allcollectors) { return res.status(404).json({ status: env.s404, msg: "OOPs data not found!" }); };
        return res.status(200).json({ status: env.s200, msg: "data found successfully", data: allcollectors });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const getallDonorsDetails = async (req, res) => {
    try {
        const alldonorsdata = await donors.findAll();
        if (!alldonorsdata) { return res.status(404).json({ status: env.s404, msg: "OOPs data not found!" }); };
        return res.status(200).json({ status: env.s200, msg: "data found successfully", data: alldonorsdata });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const CollectorBlockUnblock = async (req, res) => {
    try {
        const {collector_id, action} = req.body;
        const collectorloginCredentials = await loginCredentials.findByPk(collector_id);
        if(!collectorloginCredentials){return res.status(404).json({ status: env.s404, msg: "OOPs collector login credentials not found!" });};
        collectorloginCredentials.active = action;
        await collectorloginCredentials.save();
        return res.status(200).json({ status: env.s200, msg: "collector login credentials Updated Successfully!" });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error }); 
    }

}

module.exports = {
    registerCollector,
    getallCollectionsDetails,
    getallDonorsDetails,
    getallUsersDetails,
    getallCollectorsDetails,
    CollectorBlockUnblock
}


