const connection = require("../services/db")

exports.getAllStudents = (request, response) => {
    const sql = `SELECT * FROM students`
    connection.query(sql, async (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
}

exports.getStudent = (request, response) => {
    const sql = `SELECT * FROM students
                 WHERE id = ?`
    connection.query(sql, [request.params.id], async (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
}

/* router.get("/", async (request, response) => {
    const sql = `SELECT * FROM students`
    console.log("All")
    connection.query(sql, (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
    response.send("Get request to students")
})

router.get("/students/:id", async (request, response) => {
    const sql = `SELECT * FROM students`
    console.log("By id")
    console.log(request.params.id)
    connection.query(sql, (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
})

router.get("/students/:first_name", async (request, response) => {
    const sql = `SELECT * FROM students`
    console.log("By name")
    console.log(request.params.first_name)
    connection.query(sql, (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
})

router.post("/students", async (request, response) => {
    const sql = `INSERT INTO students (id, first_name, last_name, status)
                 VALUE (?, ?, ?, ?)`
    
    connection.query(sql, [request.body.id,
                           request.body.first_name,
                           request.body.last_name,
                           request.body.status], (error, results) => {
        if (error) {
            console.error("POST error in /students: ", error)
        }
    })

    return

})

router.post("/students", async (request, response) => {
    const sql = `UPDATE students
                 SET status = ?
                 WHERE id = ?`

    connection.query(sql, [request.body.status, request.body.id])
}) */