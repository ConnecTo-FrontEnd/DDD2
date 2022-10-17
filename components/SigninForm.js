import Component from '../library/Component.js';
import Input from './Input.js';
import { SigninScheme } from '../schema/schema.js';
import styled from '../library/styled.js';
import { requestSignIn } from '../store/userInfo.js';
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

class SigninForm extends Component {
  constructor() {
    super();
    this.signinScheme = new SigninScheme();
    this.state = { userid: '', password: '', errorMessage: '' };
  }

  domStr() {
    const { userid, password, errorMessage } = this.state;
    this.signinScheme.userid.value = userid;
    this.signinScheme.password.value = password;
    const { valid } = this.signinScheme;
    // prettier-ignore
    return `
      <form class="signin-form">
        ${Object.values(this.signinScheme)
          .map(scheme =>
            new Input({ scheme, setInputValue: this.setInputValue.bind(this) }).render()
          )
          .join('')}
        <div>${errorMessage ?? ''}</div>  
        <button style="${valid ?activebutton: disabledbutton }" ${valid ? '':'disabled'}>Sign in</button>
      </form>`;
  }

  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signin-form',
        handler: e => {
          e.preventDefault();
          requestSignIn({
            id: e.target[0].value,
            password: e.target[1].value,
            setState: this.setState.bind(this),
          }).then(res => {
            if (res) router.go('/');
          });
        },
      },
    ];
  }

  setInputValue(newState) {
    this.setState(newState);
  }
}

export default SigninForm;
