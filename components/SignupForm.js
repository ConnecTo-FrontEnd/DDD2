import Component from '../library/Component.js';
import Input from './Input.js';
import { SignupScheme } from '../schema/schema.js';
import styled from '../library/styled.js';
import { requestSignUp, requestCheckExistUser } from '../store/userInfo.js';
import { router } from '../router/index.js';

const activebutton = styled({
  'background-color': 'orange',
  color: 'white',
});

const disabledbutton = styled({
  'background-color': 'white',
  border: '1px solid grey',
  color: 'grey',
});

class SignupForm extends Component {
  constructor() {
    super();
    this.signupScheme = new SignupScheme();
    this.state = { userid: '', password: '', 'confirm-password': '', existId: null, idChanged: null };
  }

  domStr() {
    const { userid, password, 'confirm-password': confirmPassword, existId, idChanged } = this.state;
    this.signupScheme.userid.value = userid;
    this.signupScheme.password.value = password;
    this.signupScheme['confirm-password'].value = confirmPassword;
    const { userid: _userid, isEmpty, valid } = this.signupScheme;
    const canSubmit = !isEmpty && valid && existId !== null && !existId;
    // prettier-ignore
    return `
      <form class="signup-form">
        ${Object.values(this.signupScheme)
          .map(scheme =>
            new Input({ scheme, setInputValue: this.setInputValue.bind(this) }).render()
          )
          .join('')}
        <div>
        ${ existId===null || existId || idChanged ? 
          `<button type="button" class="check-userid-button" ${_userid.valid ? '':'disabled'}>중복확인</button>`:
          `<button type="button">확인됨</button>`}
          <div> ${existId ? '중복된 아이디입니다.':'' }</div>
        </div>
        <button 
          style="${canSubmit ?  activebutton : disabledbutton}" ${canSubmit ? '': 'disabled' } 
        >
          Sign up
        </button>
      </form>`;
  }

  setInputValue(newState) {
    this.setState(newState);
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
          await requestCheckExistUser(userid, this.setState.bind(this));
        },
      },
    ];
  }
}

export default SignupForm;
