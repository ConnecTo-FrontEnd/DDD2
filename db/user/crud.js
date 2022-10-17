const fs = require('fs');
const path = require('path');
const problems = require('../problems/crud.js');

let data = JSON.parse(fs.readFileSync(path.join(__dirname, './db.json')));

const DEFAULT_DAY = 1;
const DEFAULT_NUMBER = 3;
const DEFAULT_PLATFORM = ['boj'];

const setData = newData => {
  data = newData;
  fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(newData));
};

module.exports = {
  create(id) {
    const date = new Date();
    setData([
      ...data,
      {
        lastVisit: date,
        id,
        setting: {
          day: DEFAULT_DAY,
          number: DEFAULT_NUMBER,
          platform: DEFAULT_PLATFORM,
          lastUpdate: date,
        },
        problemList: [],
        removedIds: [],
      },
    ]);
  },
  updateSetting(id, newSetting) {
    setData(data.map(user => (user.id === id ? { ...user, setting: { ...user.setting, ...newSetting } } : user)));
  },

  addProblem(id, amount) {
    // 새삥 추가
    const { problemList, removedIds } = this.getInfo(id);
    const date = new Date();

    const newProblems = problems
      .getRandom(amount, {
        exceptIds: problemList.flatMap(({ id }) => id),
        removedIds,
      })
      .map(problem => ({ ...problem, solved: false, givenDate: date }));

    setData(
      data.map(user => (user.id === id ? { ...user, problemList: [...user.problemList, ...newProblems] } : user))
    );
  },
  deleteProblem(userId, problemIds) {
    const { problemList, removedIds } = this.getInfo(userId);
    const filteredProblems = problemList.filter(({ id }) => !problemIds.includes(id));

    removedIds.push(...problemIds);
    setData(data.map(user => (user.id === userId ? { ...user, problemList: filteredProblems } : user)));
  },
  getInfo(id) {
    return data.find(user => user.id === id);
  },
};
