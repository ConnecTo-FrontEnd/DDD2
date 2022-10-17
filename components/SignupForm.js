import Component from '../library/Component.js';
import Input from './Input.js';
import { SignupScheme } from '../schema/schema.js';
import styled from '../library/styled.js';
import { requestCreateUser, requestCheckExistUser } from '../store/userInfo.js';

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

  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signup-form',
        handler: async e => {
          e.preventDefault();
          await requestCreateUser(e.target[0].value, e.target[1].value);
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

  setInputValue(newState) {
    this.setState(newState);
  }

  domStr() {
    const { userid, password, 'confirm-password': confirmPassword, existId, idChanged } = this.state;
    this.signupScheme.userid.value = userid;
    this.signupScheme.password.value = password;
    this.signupScheme['confirm-password'].value = confirmPassword;
    const { userid: _userid, isEmpty, valid } = this.signupScheme;
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
        <button style="${!isEmpty && valid && existId!==null && !existId ?  activebutton : disabledbutton}" ${!isEmpty && valid && existId!==null && !existId ? '': 'disabled' }>Sign up</button>
      </form>`;
  }
}

export default SignupForm;