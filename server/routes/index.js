const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('*', (req, res) => {
  const filePath = path.resolve(__dirname, '../../', 'build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }

    return res.send(htmlData);
  });
});

module.exports = router;
