const {rawSelectQuery} = require("../../../database/SequilizeQuerys");

const getReceiptInfo = async (receipt_no) => {
    try{
        const queryString = `SELECT * FROM master.get_receipt_info('${receipt_no}')`
        const data = await rawSelectQuery(queryString, [])
        console.log("data",receipt_no)
        console.log("data",data)
        return data;
    }catch(error){
        throw error
    }
}


const getAllCollectors = async () => {
    try{
        const queryString = "select * from master.get_all_collectors();"
        const data = await sequilize.rawSelectQuery(queryString, [])
        return data;
    }catch(error){
        throw error
    }
}


module.exports = {
    getReceiptInfo,
    getAllCollectors,
}