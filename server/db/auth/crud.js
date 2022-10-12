const fs = require('fs');
const path = require('path');

let data = JSON.parse(fs.readFileSync(path.join(__dirname, './db.json')));

module.exports = {
  create(id, password) {
    data = [...data, { id, password }];

    return { data };
  },
  isValid(id, password) {
    return data.find(({ _id, _password }) => _id === id && _password === password);
  },
  findById(id) {
    return data.find(({ _id }) => _id === id);
  },
};
