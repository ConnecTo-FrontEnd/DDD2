import Component from '../library/Component.js';
import Input from './Input.js';

class Form extends Component {
  domStr() {
    return `<form class="signin-form">
          ${new Input({
            content: '아이디',
            id: 'signin-userid',
            name: 'userid',
          }).render()}
          ${new Input({
            content: '비밀번호',
            id: 'signin-password',
            name: 'password',
          }).render()}
          <button>로그인</button>
        </form>`;
  }
}

export default Form;
