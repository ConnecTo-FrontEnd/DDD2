import Component from '../library/Component.js';
import { Header, Form } from '../components/index.js';

class SignIn extends Component {
  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signin-form',
        handler: async e => {
          e.preventDefault();
          const res = await axios({
            method: 'post',
            url: '/signin',
            data: {
              id: e.target[0].value,
              password: e.target[1].value,
            },
          });
          sessionStorage.setItem('userInfo', JSON.stringify(res.data));
        },
      },
    ];
  }

  domStr() {
    return `
      <div>
        ${new Header().render()}
        <h1>로그인</h1>
        ${new Form(this.props).render()}
      </div>
    `;
  }
}

export default SignIn;

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
