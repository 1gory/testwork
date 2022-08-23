const express = require('express');
const verifyJwt = require('../middleware/verifyJWT');

const router = express.Router();

const {
  getTasks, addTask, updateTaskText, updateTaskStatus,
} = require('../controllers/tasksController');

router.param('id', (req, res, next, id) => {
  // eslint-disable-next-line no-param-reassign
  req.id = id;
  return next();
});

router.get('/', getTasks);

router.put('/', addTask);

router.post('/:id', verifyJwt, updateTaskText);

router.post('/change_status/:id', verifyJwt, updateTaskStatus);

module.exports = router;
