const express = require("express")
const controller = require("../controllers/classroomController")
const router = express.Router()

router.route("/")
    .get(controller.getAllClassrooms)

router.route("/:id")
    .get(controller.getClassRoster)

module.exports = router