import Component from '../../library/Component.js';
import { ProblemList, HistoryList } from './components/index.js';
import { Profile, Header } from '../../shared/components/index.js';
import { userInfo } from '../../shared/store/userInfo.js';

class Main extends Component {
  domStr() {
    if (!userInfo) {
      return `<div>유저 없음</div>`;
    }
    return `
      <div>
        ${new Header({ item: new Profile().render() }).render()}
        ${new ProblemList().render()}
        ${new HistoryList().render()}
      </div>`;
  }
}

export default Main;
