import { initGuestInfo } from './guestInfo.js';

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

const requestLogout = async () => {
  try {
    const res = await axios({
      method: 'delete',
      url: '/logout',
    });
    userInfo = null;
    delete sessionStorage.userInfo;
    return true;
  } catch (e) {
    return false;
  }
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
    const res = await axios({ method: 'get', url: '/guest' });
    initGuestInfo(res.data);
    return false;
  }
};

const requestAddProblem = async problemNumber => {
  try {
    const res = await axios({
      method: 'post',
      url: 'add',
      data: {
        id: userInfo.id,
        problemNumber,
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
    if (!(problemIds instanceof Array)) throw new TypeError('problemIds 는 배열이어야합니다.');

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

const requestCheckSolvedProblem = async ({ id, problemId }) => {
  try {
    const res = await axios({
      method: 'patch',
      url: `check/${id}/${problemId}`,
    });
    setUserInfo(res.data);
    return true;
  } catch (err) {
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
        ...data,
      },
    });
    setUserInfo(res.data);
  } catch (err) {
    return false;
  }
};

const requestSignIn = async ({ id, password }) => {
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

    return { ok: true };
  } catch (err) {
    return { ok: false, err };
  }
};

const requestSignUp = async ({ id, password, nickname }) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/signup',
      data: {
        id,
        password,
        nickname,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const requestCheckExistUser = async userid => {
  try {
    const res = await axios({
      method: 'get',
      url: `signup/${userid}`,
    });

    return { ok: true, isDuplicated: res.data.isDuplicated };
  } catch (err) {
    return { ok: false };
  }
};

export {
  userInfo,
  setUserInfo,
  getCategorizedProblems,
  requestAddProblem,
  requestDeleteProblem,
  requestCheckSolvedProblem,
  requestSaveSetting,
  requestSignIn,
  requestSignUp,
  requestCheckExistUser,
  requestVerify,
  requestLogout,
};
