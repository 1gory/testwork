const db = require('../database');

async function getTasks(req, res) {
  const {
    limit,
    offset,
  } = req.query;

  const order = ['name', 'email', 'isDone'].reduce((result, sorting) => {
    if (req.query[sorting]) result.push([sorting, req.query[sorting]]);
    return result;
  }, []);

  const totalTasksCount = await db.Task.count();

  const tasks = await db.Task.findAll({
    ...(limit && { limit: parseInt(limit, 10) }),
    ...(offset && { offset: parseInt(offset, 10) }),
    attributes: ['id', 'name', 'email', 'text', 'isDone', 'editedByAdministrator'],
    raw: true,
    order,
  });

  res.status(200)
    .json({
      tasks,
      totalTasksCount,
    });
}

async function addTask(req, res) {
  const {
    body: { name, email, text },
  } = req;

  if (!name || !email || !text) {
    throw new Error('All fields are required!');
  }

  await db.Task.create({
    name,
    email,
    text,
  });

  return res.status(200).json(true);
}

async function updateTaskText(req, res) {
  const id = parseInt(req.id, 10);
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

  await db.Task.update(
    {
      text,
      ...(editedByAdministrator && { editedByAdministrator }),
    },
    {
      where: {
        id,
      },
    },
  );

  res.status(200).json(true);
}

async function updateTaskStatus(req, res) {
  const id = parseInt(req.id, 10);
  const { body: { isDone } } = req;

  await db.Task.update(
    {
      isDone: Boolean(isDone),
    },
    {
      where: {
        id,
      },
    },
  );

  res.status(200).json(true);
}

module.exports = {
  getTasks, addTask, updateTaskText, updateTaskStatus,
};
