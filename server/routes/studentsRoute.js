const express = require("express")
const studentController = require("../controllers/studentController")
const router = express.Router()

router.route("/")
    .get(studentController.getAllStudents)
    .post(studentController.addStudent)
    
router.route("/:id")
    .get(studentController.getStudent)
    .put(studentController.updateStudent)

module.exports = router