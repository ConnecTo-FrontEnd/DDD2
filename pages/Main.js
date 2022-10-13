import Component from '../library/Component.js';
import ProblemList from '../components/ProblemList.js';
import Header from '../components/Header.js';
import Loading from '../components/Loading.js';
import HistoryList from '../components/HistoryList.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.problems = this.getCategorizedProblems(this.userInfo);
    this.state = { isLoading: this.problems.unexpired.length === 0 };
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
        type: 'DOMContentLoaded',
        selector: 'window',
        handler: async e => {
          if (!this.state.isLoading) return;

          const res = await axios({
            method: 'post',
            url: 'add',
            data: {
              id: this.userInfo.id,
            },
          });

          sessionStorage.setItem('userInfo', JSON.stringify(res.data));

          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 1000);
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
