import Component from '../../library/Component.js';
import { ProblemList, HistoryList, MoreFeatures } from './components/index.js';
import { Header, LoginButton, Profile } from '../../shared/components/index.js';
import { userInfo } from '../../shared/store/userInfo.js';
import { commonStyles } from '../../shared/styles/theme.js';

class Home extends Component {
  domStr() {
    return `
      <div>
        ${new Header({ children: userInfo ? new Profile().render() : new LoginButton().render() }).render()}
        <div ${commonStyles.lgContainer}>
          ${new ProblemList().render()}
          ${userInfo ? new HistoryList().render() : new MoreFeatures().render()}
        </div>
      </div>`;
  }
}

export default Home;
