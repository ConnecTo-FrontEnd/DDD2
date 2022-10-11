import Component from '../core/Component.js';
import { Profile, ProblemList } from '../components/index.js';

class MainAfterSignIn extends Component {
  domStr() {
    return `
    ${new Profile().domStr()}
    ${new ProblemList(this.props).domStr()}`;
  }
}

export default MainAfterSignIn;