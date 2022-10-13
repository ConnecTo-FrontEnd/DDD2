const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const user = require('./db/user/crud.js');
const auth = require('./db/auth/crud.js');

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
  if (!id || !password) return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

  if (!auth.isValid(id, password)) return res.status(401).send({ error: '등록되지 않은 사용자입니다.' });

  res.json(user.getInfo(id));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
