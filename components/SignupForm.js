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
    this.state = { userid: '', password: '', 'confirm-password': '', isDuplicated: null, isIdDirty: null };
  }

  domStr() {
    const { userid, password, 'confirm-password': confirmPassword, isDuplicated, isIdDirty } = this.state;
    this.signupScheme.userid.value = userid;
    this.signupScheme.password.value = password;
    this.signupScheme['confirm-password'].value = confirmPassword;
    const { userid: _userid, isEmpty, isValid } = this.signupScheme;
    const canSubmit = !isEmpty && isValid && isDuplicated === false;

    // prettier-ignore
    return `
      <form class="signup-form">
        ${Object.values(this.signupScheme)
          .map(scheme =>
            new Input({ scheme, setState: this.setState.bind(this) }).render()
          )
          .join('')}
        <div>
        ${ isDuplicated === null || isDuplicated || isIdDirty ? 
          `<button type="button" class="check-userid-button" ${_userid.isValid ? '':'disabled'}>중복확인</button>`:
          `<button type="button">확인됨</button>`}
          <div> ${isDuplicated ? '중복된 아이디입니다.':'' }</div>
        </div>
        <button 
          style="${canSubmit ?  activebutton : disabledbutton}" ${canSubmit ? '': 'disabled' } 
        >
          Sign up
        </button>
      </form>`;
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

          if (res.ok) this.setState.call(this, { isDuplicated: res.isDuplicated, isIdDirty: false });
        },
      },
    ];
  }
}

export default SignupForm;
