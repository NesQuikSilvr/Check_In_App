const express = require("express")
const controllers = require("../controllers/studentController")
const router = express.Router()

router.route("/").get( controllers.getAllStudents )
router
 .route("/:id")
 .get(controllers.getStudent)

module.exports = router