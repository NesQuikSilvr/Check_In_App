const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const routes = require('./routes/students');
const connection = require("./services/db")


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/students", routes)


/* app.get("/students", async (request, response) => {
    const sql = `SELECT * FROM students`
    connection.query(sql, async (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
}) */


app.listen(5000, () => { console.log("Server started on port 5000") })