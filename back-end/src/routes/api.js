const express = require('express');
const {CreateTask, ReadTask, UpdateTask, DeleteTask, TaskById, Test} = require("../controllers/TasksController");
const router = express.Router()



router.post('/create-task',CreateTask)
router.get('/list-task-by-status',ReadTask)
router.post('/update-task/:id',UpdateTask)
router.get('/delete-task/:id',DeleteTask)
router.get('/list-by-id/:id',TaskById)


module.exports = router
