import Component from '../library/Component.js';
import ProblemList from '../components/ProblemList.js';
import Header from '../components/Header.js';

class Main extends Component {
  domStr() {
    return `
    <div>
    ${new Header().render()}
    ${new ProblemList().render()}
    </div>`;
  }
}

export default Main;
