const fs = require('fs');
const path = require('path');

let data = JSON.parse(fs.readFileSync(path.join(__dirname, './db.json')));

const DEFAULT_DAY = 1;
const DEFAULT_NUMBER = 2;
const DEFAULT_PLATFORM = ['baekjoon'];

module.exports = {
  create(id) {
    data = [
      ...data,
      {
        id,
        setting: {
          day: DEFAULT_DAY,
          number: DEFAULT_NUMBER,
          platform: DEFAULT_PLATFORM,
        },
        problemList: [],
      },
    ];
    return { data };
  },
  getInfo(id) {
    return data.find(user => user.id === id);
  },
  updateSetting(id, newSetting) {
    data = data.map(user => (user.id === id ? { ...user, setting: { ...user.setting, ...newSetting } } : user));
    return data;
  },
  addProblem(id, newProblem) {
    data = data.map(user => (user.id === id ? { ...user, problemList: [...user.problemList, newProblem] } : user));
    return data;
  },
};
