const sequelize = require("./connection");
const { QueryTypes } = require("sequelize");

async function rawSelectQuery(queryString, params) {
  return await sequelize().query(queryString, {
    replacements: params,
    type: QueryTypes.SELECT,
  });
}


async function rawQuery(queryString, params) {
  return await sequelize().query(queryString, {
    replacements: params,
    type: QueryTypes.RAW,
  });
}

async function rawInsertQuery(queryString, params) {
  return await sequelize().query(queryString, {
    replacements: params,
    type: QueryTypes.INSERT,
  });
}

async function rawUpdateQuery(queryString, params) {
  return await sequelize().query(queryString, {
    replacements: params,
    type: QueryTypes.UPDATE,
  });
}

async function executeStoredProcedure(spName, attributeValues) {
    let queryString = `EXEC carings.${spName} `;
    try{
      attributeValues.forEach((item,index)=>{
        if (item === '' || item === undefined){
          queryString+=`'', `
        }
        else{queryString+=`'${item}', `}
      })
      queryString = queryString.slice(0,-2)
      const [result] = await sequelize.query(queryString);
      return result;
    }catch(error){
      return null
    }
  }


module.exports = { rawSelectQuery, rawQuery, rawInsertQuery, rawUpdateQuery, executeStoredProcedure };