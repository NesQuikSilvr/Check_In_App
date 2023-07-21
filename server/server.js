const express = require("express")
const app = express()

app.get("/api", (reqeust, response) => {
    response.json({"Students": [
        "Student1", "Student2", "Student3", "Student4"
    ]})
})


app.listen(5000, () => { console.log("Server started on port 5000") })