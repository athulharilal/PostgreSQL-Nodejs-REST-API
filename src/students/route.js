const { Router } = require('express');
const controller = require('./controllers');
const router = Router();

router.get("/", controller.getStudents);
router.post("/",controller.addStudent);
router.get("/:id",controller.getStudentsByID);
router.delete("/:id",controller.removeStudent)
router.put("/:id",controller.updateStudent)


module.exports = router;
