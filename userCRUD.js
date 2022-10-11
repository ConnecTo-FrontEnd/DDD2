const fs = require('fs');

let authData = JSON.parse(fs.readFileSync('./database/auth.json'));
let usersData = JSON.parse(fs.readFileSync('./database/users.json'));

const DEFAULT_DAY = 1;
const DEFAULT_NUMBER = 2;
const DEFAULT_PLATFORM = ['baekjoon'];

module.exports = {
  create(id, password) {
    authData = [...authData, { id, password }];
    usersData = [
      ...usersData,
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
    return { authData, usersData };
  },
  findInfo(userId, userPassword) {
    return authData.find(({ id, password }) => id === userId && password === userPassword)
      ? usersData.find(({ id }) => id === userId)
      : '일치하는 회원 정보가 없습니다.';
  },
  findById(userId) {
    return authData.find(({ id }) => id === userId);
  },
  editSetting(userId, newSetting) {
    usersData = usersData.map(user =>
      user.id === userId ? { ...user, setting: { ...user.setting, ...newSetting } } : user
    );
    return usersData;
  },
  addProblem(userId, newProblem) {
    usersData = usersData.map(user =>
      user.id === userId ? { ...user, problemList: [...user.problemList, newProblem] } : user
    );
    return usersData;
  },
};
