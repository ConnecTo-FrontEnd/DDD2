let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const setUserInfo = newInfo => {
  userInfo = { ...userInfo, ...newInfo };
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const getCategorizedProblems = () => {
  const {
    setting: { day },
    problemList,
  } = userInfo;

  const today = new Date(new Date().toISOString().slice(0, 10));

  return problemList.reduce(
    (acc, problem) => {
      const { givenDate } = problem;
      const givenDateObj = new Date(givenDate.slice(0, 10));
      const duedate = new Date(+givenDateObj + day * 86400000);
      acc[duedate > today ? 'unexpired' : 'expired'].push(problem);
      return acc;
    },
    { unexpired: [], expired: [] }
  );
};

const requestVerify = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: '/auth',
    });

    setUserInfo(res.data);
    return true;
  } catch (e) {
    return false;
  }
};

const requestAddProblem = async () => {
  try {
    const res = await axios({
      method: 'post',
      url: 'add',
      data: {
        id: userInfo.id,
      },
    });
    setUserInfo(res.data);

    return true;
  } catch (e) {
    return false;
  }
};

const requestDeleteProblem = async problemIds => {
  try {
    const res = await axios({
      method: 'delete',
      url: `delete`,
      data: {
        userId: userInfo.id,
        problemIds,
      },
    });

    setUserInfo(res.data);
    return true;
  } catch (e) {
    return false;
  }
};

const requestSaveSetting = async data => {
  try {
    const res = await axios({
      method: 'patch',
      url: 'setting',
      data: {
        id: userInfo.id,
        day: data[0],
        number: data[1],
        platform: data[2],
      },
    });
  } catch (err) {
    return false;
  }
};

const requestAuthUser = async (id, password, setState) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/signin',
      data: {
        id,
        password,
      },
    });
    setUserInfo(res.data);

    return true;
  } catch (e) {
    const newState = { userid: '', password: '', errorMessage: err.response.data.error };
    setState(newState);
  }
};

const requestCreateUser = async (id, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/signup',
      data: {
        id,
        password,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const requestCheckExistUser = async (userid, setState) => {
  try {
    const res = await axios({
      method: 'get',
      url: `signup/${userid}`,
    });
    setState({ existId: res.data, idChanged: false });
    return true;
  } catch (err) {
    return false;
  }
};

export {
  userInfo,
  setUserInfo,
  getCategorizedProblems,
  requestAddProblem,
  requestDeleteProblem,
  requestSaveSetting,
  requestAuthUser,
  requestCreateUser,
  requestCheckExistUser,
  requestVerify,
};
