const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static('./'));
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});
