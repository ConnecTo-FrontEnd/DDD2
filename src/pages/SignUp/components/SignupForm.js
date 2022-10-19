import Component from '../../../library/Component.js';
import { SchemeInput } from '../../../shared/components/index.js';
import { SignupScheme } from '../../../shared/scheme/scheme.js';
import styled from '../../../library/styled.js';
import { requestSignUp, requestCheckExistUser } from '../../../shared/store/userInfo.js';
import { router } from '../../../shared/router/index.js';

const styles = {
  submitBtn: {
    active: styled({
      'background-color': 'orange',
      color: 'white',
    }),
    disabled: styled({
      'background-color': 'white',
      border: '1px solid grey',
      color: 'grey',
    }),
  },
};

class SignupForm extends Component {
  constructor() {
    super();
    this.signupScheme = new SignupScheme();
    this.state = {
      userid: '',
      nickname: '',
      password: '',
      'confirm-password': '',
      isDuplicated: null,
      isIdDirty: null,
    };
  }

  domStr() {
    const { userid, nickname, password, 'confirm-password': confirmPassword, isDuplicated, isIdDirty } = this.state;
    this.signupScheme.userid.value = userid;
    this.signupScheme.nickname.value = nickname;
    this.signupScheme.password.value = password;
    this.signupScheme['confirm-password'].value = confirmPassword;
    const { userid: _userid, isValid } = this.signupScheme;
    const canSubmit = isValid && isDuplicated === false;
    // prettier-ignore
    return `
      <form class="signup-form">
      
        ${Object.values(this.signupScheme)
          .map(scheme =>
            new SchemeInput({ scheme, onInput: this.onInput.bind(this) }).render()
          )
          .join('')}
        <div>
        ${ isDuplicated === null || isDuplicated || isIdDirty ? 
          `<button type="button" class="check-userid-button" ${_userid.isValid ? '':'disabled'}>중복확인</button>`:
          `<button type="button" disabled>확인됨</button>`}
          <div> ${isDuplicated ? '중복된 아이디입니다.':'' }</div>
        </div>
        <button 
          ${styles.submitBtn[canSubmit ? 'active' : 'disabled']} ${canSubmit ? '': 'disabled' } 
        >
          Sign up
        </button>
      </form>`;
  }

  onInput(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    if (e.target.name === 'userid') newState.isDuplicated = null;
    this.setState.call(this, newState);
  }

  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signup-form',
        handler: e => {
          e.preventDefault();

          requestSignUp({
            id: e.target[0].value,
            password: e.target[1].value,
            nickname: e.target[2].value,
          }).then(() => {
            router.go('/signin');
          });
        },
      },
      {
        type: 'click',
        selector: '.check-userid-button',
        handler: async e => {
          e.preventDefault();
          const { userid } = this.state;
          const res = await requestCheckExistUser(userid);

          if (res.ok) this.setState.call(this, { isDuplicated: res.isDuplicated, isIdDirty: false });
        },
      },
    ];
  }
}

export default SignupForm;
