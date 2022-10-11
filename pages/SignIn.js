import Component from '../core/Component.js';
import { BackButton, Input, Button } from '../components/index.js';

const styledNav = {
  display: 'flex',
  'align-items': 'center',
  height: '6rem',
  'background-color': '#d9d9d9',
};

class SignIn extends Component {
  domStr() {
    return `
      <header style="${this.converter(styledNav)}">
        ${new BackButton().render()}
      </header>
      <h1>로그인</h1>
      <form>
        ${new Input({
          content: '아이디',
          id: 'signin-userid',
          name: 'userid',
          onInput: this.onInput.bind(this),
        }).render()}
        ${new Input({
          content: '비밀번호',
          id: 'signin-password',
          name: 'password',
          onInput: this.onInput.bind(this),
        }).render()}
      </form>
      `;
  }
  onInput(e) {
    console.log(e.target.value);
  }
}

export default SignIn;

{
  /* <header class="nav">
      <button class="back">뒤로가기</button>
    </header>
    <h1>로그인</h1>
    <form action="" class="form-signin">
      <div class="input-container">
        <label for="siginin-userid">아이디</label>
        <input type="text" id="siginin-userid" name="userid" required />
      </div>
      <div class="input-container">
        <label for="signin-password">비밀번호</label>
        <input type="password" id="signin-password" name="password" required />
      </div>
    </form>
    <button class="button signin-button" disabled>로그인</button>
    <button class="button">회원가입</button> */
}
