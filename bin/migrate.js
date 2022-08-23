const db = require('../server/database');

(async () => {
  await db.sequelize.sync({ force: true });

  await db.User.create({
    name: 'admin',
    password: '$2b$10$JEFfWdb6vEecUziztPJAGuznKLOFSM3dfgJClOgpraD4Yvex5BP9m'
  });
})();
