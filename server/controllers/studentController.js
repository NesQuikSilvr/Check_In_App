const connection = require("../services/db")

/* All students in database */
exports.getAllStudents = (request, response) => {
    const sql = `SELECT * FROM students`
    connection.query(sql, async (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
}

/* Search student by id */
exports.getStudent = (request, response) => {
    const sql = `SELECT * FROM students
                 WHERE id = ?`
    connection.query(sql, [request.params.id], async (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
}

/* Add a new student */
exports.addStudent = (request, response) => {
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
}

/* Update existing student */
exports.updateStudent = (request, response) => {
    const sql = `UPDATE students
                 SET status = ?
                 WHERE id = ?`

    connection.query(sql, [request.body.status, request.body.id])
}