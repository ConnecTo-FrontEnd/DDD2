import Component from '../library/Component.js';
import ProblemList from '../components/ProblemList.js';
import Header from '../components/Header.js';
import Loading from '../components/Loading.js';
import HistoryList from '../components/HistoryList.js';

class Main extends Component {
  constructor(props) {
    super(props);
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const problems = this.getCategorizedProblems(userInfo);
    const isLoading = problems.unexpired.length === 0;

    this.state = { isLoading };
    if (isLoading) {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('patch', {
            detail: axios({
              method: 'post',
              url: 'add',
              data: {
                id: userInfo.id,
              },
            }),
          })
        );
      }, 1000);
    }
  }

  domStr() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const { unexpired, expired } = this.getCategorizedProblems(userInfo);

    return `
      <div>
        ${new Header().render()}
        ${this.state.isLoading ? new Loading().render() : new ProblemList({ problems: unexpired }).render()}
        ${new HistoryList({ problems: expired }).render()}
      </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'patch',
        selector: 'window',
        handler: async e => {
          const res = await e.detail;
          sessionStorage.setItem('userInfo', JSON.stringify(res.data));
          this.setState.call(this, { isLoading: false });
        },
      },
    ];
  }

  getCategorizedProblems(userInfo) {
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
  }
}

export default Main;
