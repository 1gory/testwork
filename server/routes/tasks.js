const express = require('express');
const router = express.Router();
const db = require('../database');

const verifyJwt = require('../middleware/verifyJWT');

router.param('id', (req, res, next, id) => {
  req.id = id;
  return next();
});

router.get('/', async function (req, res) {
  const {
    limit,
    offset
  } = req.query;

  const order = ['name', 'email', 'isDone'].reduce((result, sorting) => {
    if (req.query[sorting]) result.push([sorting, req.query[sorting]]);
    return result;
  }, []);

  const totalTasksCount = await db.Task.count();

  const tasks = await db.Task.findAll({
    ...(limit && { limit: parseInt(limit) }),
    ...(offset && { offset: parseInt(offset) }),
    attributes: ['id', 'name', 'email', 'text', 'isDone', 'editedByAdministrator'],
    raw : true,
    order
  });

  res.status(200)
    .json({
      tasks,
      totalTasksCount
    });
});

router.put('/', function (req, res) {
  const {
    body: { name, email, text }
  } = req;

  if (!name || !email || !text) {
    new Error('All fields are required');
  }

  db.Task.create({
    name,
    email,
    text,
  })
    .then(task => {
      res.status(200)
        .json(true);
    });
});

router.post('/:id', verifyJwt, async function (req, res) {
  const id = parseInt(req.id);
  const { body: { text } } = req;

  const task = await db.Task.findOne({
    where: {
      id,
    },
    attributes: [
      'text',
    ],
  });

  const editedByAdministrator = task.text !== text;

  await db.Task.update({
      text,
      ...(editedByAdministrator && { editedByAdministrator }),
    },
    {
      where: {
        id,
      },
    });

  res.status(200).json(true);
});

router.post('/change_status/:id', verifyJwt, async function (req, res) {
  const id = parseInt(req.id);
  const { body: { isDone } } = req;

  await db.Task.update({
      isDone: Boolean(isDone),
    },
    {
      where: {
        id,
      },
    });

  res.status(200).json(true);
});

module.exports = router;
