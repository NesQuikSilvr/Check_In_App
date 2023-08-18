const express = require("express")
const cors = require("cors")
const cron = require('node-cron')

const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const studentsRoute = require('./routes/studentsRoute')
const classroomsRoute = require('./routes/classroomsRoute')

app.use(cors())

app.use("/students", studentsRoute)
app.use("/classrooms", classroomsRoute)

let timer = 0
function increment() {
    timer++
    console.log(timer)
}

//cron.schedule("* * * * * *", increment)


app.listen(5000, () => { console.log("Server started on port 5000") })