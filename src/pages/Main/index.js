import Component from '../../library/Component.js';
import { ProblemList, HistoryList, MoreFeatures } from './components/index.js';
import { Profile, Header, LoginButton } from '../../shared/components/index.js';
import { userInfo } from '../../shared/store/userInfo.js';
import styled from '../../library/styled.js';

const styles = {
  problemHistoryContainer: styled({
    '@desktop': {
      display: 'flex',
      margin: '0 auto',
      width: '900px',
    },
  }),
};

class Main extends Component {
  domStr() {
    return `
      <div>
        ${new Header().render()}
        <div ${styles.problemHistoryContainer}>
          ${new ProblemList().render()}
          ${userInfo ? new HistoryList().render() : new MoreFeatures().render()}
        </div>
      </div>`;
  }
}

export default Main;
