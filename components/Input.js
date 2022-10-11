import Component from './BackButton.js';

const styledInputContainer = {
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'flex-start',
  gap: '0.5rem',
  margin: '3rem 4rem',
};

// 이거 써줘야할까?
// const styledInput = {
//   width: '100%'
// }

class Input extends Component {
  addEventListener() {
    return [
      {
        type: 'input',
        selector: 'input',
        handler: e => {},
      },
    ];
  }

  domStr() {
    return `
      <div style="${this.converter(styledInputContainer)}">
        <label for="${this.props.id}">${this.props.content}</label>
        <input style="width: 100%" type="text" id="${this.props.id}" name="${this.props.name}" required />
      </div>`;
  }
}

export default Input;

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
