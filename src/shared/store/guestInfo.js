let guestInfo = {
  lastVisit: '2022-10-17T05:36:19.717Z',
  id: 'guest@guest.com',
  setting: { day: 1, number: 3, platform: ['boj'], lastUpdate: '2022-10-17T05:36:19.717Z' },
  problemList: [
    {
      link: 'https://www.acmicpc.net/problem/22864',
      title: '피로도',
      id: 'boj22864',
      platform: 'boj',
      category: '그리디 알고리즘',
      solved: false,
      givenDate: '2022-10-17T05:36:45.921Z',
    },
  ],
  removedIds: ['boj4677', 'boj1931'],
};

const requestInitGuestInfo = async () => {
  try {
    const res = await axios({ method: 'get', url: '/guest' });
    guestInfo = res.data;
    return true;
  } catch (e) {
    return false;
  }
};

const getGuestCategorizedProblems = () => {
  const {
    setting: { day },
    problemList,
  } = guestInfo;

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

export { requestInitGuestInfo, getGuestCategorizedProblems };
