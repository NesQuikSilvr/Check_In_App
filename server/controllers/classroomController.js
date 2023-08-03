const connection = require("../services/db")

/* All classrooms in database */
exports.getAllClassrooms = (request, response) => {
    const sql = `SELECT * FROM classrooms`
    connection.query(sql, async (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
}

/* Student list for a classroom */
exports.getClassRoster = (request, response) => {
    const sql = `SELECT students.*
                 FROM students
                 JOIN classroom_student_mapping ON students.id = classroom_student_mapping.student_id
                 WHERE classroom_student_mapping.class_id = ?`
    connection.query(sql, [request.params.id], async (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
}