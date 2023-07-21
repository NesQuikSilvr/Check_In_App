const express = require("express")
const app = express()

app.get("/api", (request, response) => {
    response.json({ "users": ["student1", "student2", "student3", "student4"] })
})


app.listen(5000, () => { console.log("Server started on port 5000") })