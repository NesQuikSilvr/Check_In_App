const express = require("express")

const router = express.Router()

router.get("/classrooms", async (request, response) => {
    const sql = `SELECT * FROM classrooms`
    connection.query(sql, (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
})

router.get("/classrooms/:id", async (request, response) => {
    const sql = `SELECT students.id, students.first_name, students.last_name, students.status
                 FROM students
                 JOIN classroom_student_mapping ON students.id = classroom_student_mapping.student_id
                 WHERE classroom_student_mapping.class_id = ?`

    connection.query(sql, [request.params.id], (error, data) => {
        if (error) return response.json(error)

        return response.json(data)
    })
})