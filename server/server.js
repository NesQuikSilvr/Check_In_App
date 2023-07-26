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

app.get("/classrooms", (request, response) => {
    const sql = `SELECT * FROM classrooms`
    database.query(sql, (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
})

app.get("/classrooms/:id", (request, response) => {
    const sql = `SELECT students.id, students.first_name, students.last_name, students.status
                 FROM students
                 JOIN classroom_student_mapping ON students.id = classroom_student_mapping.student_id
                 WHERE classroom_student_mapping.class_id = ?`

    database.query(sql, [request.params.id], (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
})

app.get("/students", (request, response) => {
    const sql = `SELECT * FROM students`
    database.query(sql, (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
})

app.listen(5000, () => { console.log("Server started on port 5000") })