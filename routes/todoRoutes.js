const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();


router.get('/', todoController.todo_index_incomplete);
router.get('/complete', todoController.todo_index_complete);
router.patch('/:id', todoController.todo_patch);
router.post('/', todoController.todo_post);

module.exports = router;

