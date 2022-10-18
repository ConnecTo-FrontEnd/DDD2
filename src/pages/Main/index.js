import Component from '../../library/Component.js';
import { ProblemList, HistoryList, MoreFeatures } from './components/index.js';
import { Profile, Header, LoginButton } from '../../shared/components/index.js';
import { userInfo } from '../../shared/store/userInfo.js';

class Main extends Component {
  domStr() {
    return `
      <div>
        ${new Header({ item: userInfo ? new Profile().render() : new LoginButton().render() }).render()}
        ${new ProblemList().render()}
        ${userInfo ? new HistoryList().render() : new MoreFeatures().render()}
      </div>`;
  }
}

export default Main;
