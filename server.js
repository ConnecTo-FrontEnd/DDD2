const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const user = require('./db/user/crud.js');
const auth = require('./db/auth/crud.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cookieParser());

const verify = (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log(`😀 사용자 인증 성공`, decoded);
  } catch (e) {
    console.error('😱 사용자 인증 실패..');
  } finally {
    next();
  }
};

app.get('/', verify, (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

app.get('/auth', (req, res) => {
  const { accessToken } = req.cookies;

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log(`Authorized!!`);
    res.status(200).json(user.getInfo(decoded.id));
  } catch (e) {
    console.error('Unauthorized...');
    res.sendStatus(401);
  }
});

app.use(express.static(path.join(__dirname, '/src')));
app.use(express.json());

app.post('/signin', (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

  if (!auth.isValid(id, password)) return res.status(401).send({ error: '일치하는 회원 정보가 없습니다.' });

  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    httpOnly: true,
  });

  res.json(user.getInfo(id));
});

app.post('/signup', (req, res) => {
  const { id, password } = req.body;
  if (!auth.exist(id)) {
    auth.create(id, password);
    user.create(id);
  }

  res.json(user.getInfo(id));
});

app.get('/signup/:id', (req, res) => {
  const { id } = req.params;
  res.json({ isDuplicated: auth.exist(id) });
});

app.post('/add', (req, res) => {
  const { id, problemNumber } = req.body;
  const {
    setting: { number },
  } = user.getInfo(id);

  user.addProblem(id, problemNumber ?? number);
  res.json(user.getInfo(id));
});

app.delete('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.sendStatus(200);
});

app.delete('/delete', (req, res) => {
  const { userId, problemIds } = req.body;

  user.deleteProblem(userId, problemIds);
  res.json(user.getInfo(userId));
});

app.patch('/setting', (req, res) => {
  const { id, nickname, day, number, platform } = req.body;
  user.updateSetting(id, { nickname, day: +day, number: +number, platform });
  res.json(user.getInfo(id));
});

app.get('*', verify, (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
