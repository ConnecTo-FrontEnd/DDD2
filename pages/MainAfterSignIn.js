import Component from '../core/Component.js';
import { Profile, ProblemList } from '../components/index.js';

class MainAfterSignIn extends Component {
  domStr() {
    return `
    ${new Profile().render()}
    ${new ProblemList(this.props).render()}`;
  }
}

export default MainAfterSignIn;