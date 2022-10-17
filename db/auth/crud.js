const fs = require('fs');
const path = require('path');

let data = JSON.parse(fs.readFileSync(path.join(__dirname, './db.json')));

const setData = newData => {
  data = newData;
  fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(newData));
};

module.exports = {
  create(id, password) {
    data = [...data, { id, password }];
    setData(data);
    return { data };
  },
  isValid(id, password) {
    return data.find(({ id: _id, password: _password }) => _id === id && _password === password);
  },
  exist(id) {
    return !!data.find(({ id: _id }) => id === _id);
  },
};
