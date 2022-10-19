import Component from '../../../library/Component.js';
import { SchemeInput, StyledButton } from '../../../shared/components/index.js';
import { SigninScheme } from '../../../shared/scheme/scheme.js';
import styled from '../../../library/styled.js';
import { requestSignIn } from '../../../shared/store/userInfo.js';
import { router } from '../../../shared/router/index.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  submitBtn: {
    active: styled({
      'border-radius': '10px',
      font: theme['font-kr-bold'],
      'font-size': '16px',
      color: 'white',
      'background-color': theme['orange-color'],
    }),
    disabled: styled({
      'border-radius': '10px',
      font: theme['font-kr-bold'],
      'font-size': '16px',
      color: 'white',
      'background-color': theme['lightgray-color'],
    }),
  },
  errorMsg: styled({
    height: '20px',
    font: theme['font-kr-regular'],
    color: theme['orange-color'],
    'font-size': '14px',
  }),
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
          .map(scheme => new SchemeInput({ scheme, onInput: this.onInput.bind(this) }).render())
          .join('')}
        <div ${styles.errorMsg}>${errorMsg ?? ''}</div>  
        ${new StyledButton({
          style: styles.submitBtn[isValid ? 'active' : 'disabled'],
          text: 'Sign in',
          disabled: !isValid,
        }).render()}
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
