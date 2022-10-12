import Component from '../library/Component.js';
import { Button, ProblemList } from '../components/index.js';

const styledNav = {
  display: 'flex',
  'align-items': 'center',
  height: '6rem',
  'background-color': '#d9d9d9',
};

class MainBeforeSignIn extends Component {
  domStr() {
    return `
    <header style="${this.converter(styledNav)}">${new Button('로그인/회원가입').domStr()}</header>
    ${new ProblemList(this.props).domStr()}`;
  }
}

export default MainBeforeSignIn;
