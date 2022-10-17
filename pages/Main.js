import Component from '../library/Component.js';
import { ProblemList, Header, HistoryList } from '../components/index.js';
import { userInfo } from '../store/userInfo.js';

class Main extends Component {
  domStr() {
    if (!userInfo) {
      return `<div>유저 없음</div>`;
    }
    return `
      <div>
        ${new Header().render()}
        ${new ProblemList().render()}
        ${new HistoryList().render()}
      </div>`;
  }
}

export default Main;
