import Component from '../library/Component.js';
import { Header, Form } from '../components/index.js';

class SignUp extends Component {
  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signup-form',
        handler: async e => {
          e.preventDefault();
          const res = await axios({
            method: 'post',
            url: '/signup',
            data: {
              id: e.target[0].value,
              password: e.target[1].value,
            },
          });
          console.log(res);
        },
      },
    ];
  }

  domStr() {
    return `
      <div>
        ${new Header().render()}
        <h1>회원가입</h1>
        ${new Form(this.props).render()}
      </div>
    `;
  }
}

export default SignUp;

{
  /* <header class="nav">
<button class="back">뒤로가기</button>
</header>
<h1>회원가입</h1>
<form action="" class="form-signup">
<div class="input-container">
  <label for="signup-userid">아이디</label>
  <input type="text" id="signup-userid" name="userid" required />
</div>
<div class="input-container">
  <label for="signup-password">비밀번호</label>
  <input type="password" id="signup-password" name="password" required />
</div>
<div class="input-container">
  <label for="signup-password">비밀번호 확인</label>
  <input type="password" id="signup-password" name="password" required />
</div>
</form>
<button class="button signup-button">회원가입</button> */
}
