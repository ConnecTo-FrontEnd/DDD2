import Component from '../library/Component.js';
import { ProblemList, Header, HistoryList } from '../components/index.js';

class Main extends Component {
  domStr() {
    return `
      <div>
        ${new Header().render()}
        ${new ProblemList().render()}
        ${new HistoryList().render()}
      </div>`;
  }
}

export default Main;
