import Component from '../library/Component.js';
import ProblemList from '../components/ProblemList.js';
import Header from '../components/Header.js';
import Loading from '../components/Loading.js';
import HistoryList from '../components/HistoryList.js';
import { getCategorizedProblems, requestAddProblem } from '../store/userInfo.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: getCategorizedProblems().unexpired.length === 0 };
  }

  domStr() {
    return `
      <div>
        ${new Header().render()}
        ${this.state.isLoading ? new Loading().render() : new ProblemList().render()}
        ${new HistoryList().render()}
      </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'DOMContentLoaded',
        selector: 'window',
        handler: async () => {
          if (!this.state.isLoading) return;

          await requestAddProblem();

          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 1000);
        },
      },
    ];
  }
}

export default Main;
