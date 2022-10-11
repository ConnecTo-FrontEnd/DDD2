const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const user = require('./userCRUD.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static('./'));
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

app.post('/signin', (req, res) => {
  const { id, password } = req.body;
  const usersInfo = user.findInfo(id, password);
  res.json(usersInfo);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});
