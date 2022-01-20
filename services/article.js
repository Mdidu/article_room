const db = require("../utils/database");

exports.findAll = async () => {
  const result = await db.query({
    text: `SELECT * FROM public."Article"`,
  });
  
  return result.rows;
};