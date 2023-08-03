const mysql = require("mysql2")
const path = require("path")
const dotenv = require("dotenv")

const envPath = path.join(__dirname, '../../.env')
dotenv.config({ path: envPath })

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "school"
})

connection.connect( (error) => {
    if (error) throw error
    console.log("Connection complete")
})

module.exports = connection