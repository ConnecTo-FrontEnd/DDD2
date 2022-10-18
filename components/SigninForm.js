import Component from '../library/Component.js';
import SchemeInput from './SchemeInput.js';
import { SigninScheme } from '../schema/schema.js';
import styled from '../library/styled.js';
import { requestSignIn } from '../store/userInfo.js';
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

class SigninForm extends Component {
  constructor() {
    super();
    this.signinScheme = new SigninScheme();
    this.state = { userid: '', password: '', errorMsg: '' };
  }

  domStr() {
    const { userid, password, errorMsg } = this.state;
    const { isValid } = this.signinScheme;

    this.signinScheme.userid.value = userid;
    this.signinScheme.password.value = password;

    return `
      <form class="signin-form">
        ${Object.values(this.signinScheme)
          .map(scheme =>
            new SchemeInput({ scheme, onInput: this.onInput.bind(this) }).render()
          )
          .join('')}
        <div>${errorMsg ?? ''}</div>  
        <button ${styles.submitBtn[isValid ? 'active':'disabled']}  ${isValid ? '':'disabled'}>Sign in</button>
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
        selector: '.signin-form',
        handler: async e => {
          e.preventDefault();
          const res = await requestSignIn({
            id: e.target[0].value,
            password: e.target[1].value,
          });
          if (res.ok) return router.go('/');

          this.setState.call(this, { userid: '', password: '', errorMsg: res.err.response.data.error });
        },
      },
    ];
  }

  setInputValue(newState) {
    this.setState(newState);
  }
}

export default SigninForm;
