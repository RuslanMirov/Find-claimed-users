const mysql = require('mysql');
const util = require('util')

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
});

const query = util.promisify(connection.query).bind(connection);

exports.insert = async (address, amount) => {
  const q = "INSERT IGNORE INTO claimed (address, amount) VALUES (?)"
  const values = [address, amount]
  try {
    await query(q, [values])
    return "Ok"
  } catch(err) {
    throw err
  }
}
