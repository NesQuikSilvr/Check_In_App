const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '../.env');
dotenv.config({ path: envPath });

const app = express()
app.use(cors())

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "school"
})

database.connect( (error) => {
    if (error) throw error
    console.log("Connection complete")
})

app.get("/students", (request, response) => {
    const sql = "SELECT * FROM students"
    database.query(sql, (error, data) => {
        if (error) return response.json(error)

        console.log(data)
        return response.json(data)
    })
})

app.listen(5000, () => { console.log("Server started on port 5000") })