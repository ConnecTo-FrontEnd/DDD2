import Component from '../library/Component.js';
import SchemeInput from './SchemeInput.js';
import { SignupScheme } from '../schema/schema.js';
import styled from '../library/styled.js';
import { requestSignUp, requestCheckExistUser } from '../store/userInfo.js';
import { router } from '../router/index.js';

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
    this.state = { userid: '', password: '', 'confirm-password': '', isDuplicated: null, idChanged: null };
  }

  domStr() {
    const { userid, password, 'confirm-password': confirmPassword, isDuplicated, idChanged } = this.state;
    this.signupScheme.userid.value = userid;
    this.signupScheme.password.value = password;
    this.signupScheme['confirm-password'].value = confirmPassword;
    const { userid: _userid, isEmpty, valid } = this.signupScheme;
    const canSubmit = !isEmpty && valid && isDuplicated !== null && !isDuplicated;

    // prettier-ignore
    return `
      <form class="signup-form">
        ${Object.values(this.signupScheme)
          .map(scheme =>
            new SchemeInput({ scheme, onInput: this.onInput.bind(this) }).render()
          )
          .join('')}
        <div>
        ${ isDuplicated === null || isDuplicated || idChanged ? 
          `<button type="button" class="check-userid-button" ${_userid.valid ? '':'disabled'}>중복확인</button>`:
          `<button type="button">확인됨</button>`}
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
    newState.idChanged = e.target.name === 'userid' ? true : null;
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

          if (res.ok) this.setState.call(this, { isDuplicated: res.isDuplicated, idChanged: false });
        },
      },
    ];
  }
}

export default SignupForm;
