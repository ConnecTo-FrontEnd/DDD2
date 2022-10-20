import Component from '../../library/Component.js';
import { ProblemList, HistoryList, MoreFeatures } from './components/index.js';
import { Header, LoginButton, Profile } from '../../shared/components/index.js';
import { userInfo } from '../../shared/store/userInfo.js';
import styled from '../../library/styled.js';

class Main extends Component {
  domStr() {
    return `
      <div >
        ${new Header({ children: userInfo ? new Profile().render() : new LoginButton().render() }).render()}
        <div>
          ${new ProblemList().render()}
          ${userInfo ? new HistoryList().render() : new MoreFeatures().render()}
        </div>
      </div>`;
  }
}

export default Main;
