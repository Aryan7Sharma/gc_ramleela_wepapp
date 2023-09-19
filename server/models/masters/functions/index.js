const {rawSelectQuery} = require("../../../database/SequilizeQuerys");

const getReceiptInfo = async (receipt_no) => {
    try{
        const queryString = `SELECT * FROM master.get_receipt_info('${receipt_no}')`
        const data = await rawSelectQuery(queryString, []);
        return data;
    }catch(error){
        throw error
    }
}


const getAllCollectors = async () => {
    try{
        const queryString = "select * from master.get_all_collectors();"
        const data = await rawSelectQuery(queryString, []);
        return data;
    }catch(error){
        throw error
    }
}


const getAllMessages = async () => {
    try{
        const queryString = "select gc.user_id, u.name, u.profile_img_path, lc.user_type, message, time_stamp from master.tbl_groupchat gc left Join master.tbl_users u on gc.user_id=u.email_id left join master.tbl_login_credentials lc on gc.user_id=lc.user_id;"
        const data = await rawSelectQuery(queryString, []);
        return data;
    }catch(error){
        throw error
    }
}

const getAllUsers = async () => {
    try{
        const queryString = "select name,profile_img_path,user_type,active from master.tbl_users u Left Join master.tbl_login_credentials lc on u.email_id=lc.user_id;"
        const data = await rawSelectQuery(queryString, []);
        return data;
    }catch(error){
        throw error
    }
}


module.exports = {
    getReceiptInfo,
    getAllCollectors,
    getAllMessages,
    getAllUsers
}