import Component from '../../../library/Component.js';
import { SchemeInput, StyledButton, PopUpMsg } from '../../../shared/components/index.js';
import { SigninScheme } from '../../../shared/scheme/scheme.js';
import styled from '../../../library/styled.js';
import { requestSignIn } from '../../../shared/store/userInfo.js';
import { router } from '../../../shared/router/index.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  form: styled({
    margin: '32px auto 0px',
    padding: '0 2rem',
    '@desktop': {
      width: '900px',
      padding: '0 4rem',
    },
  }),
  btnCommon: styled({
    width: '100%',
    'margin-top': '1rem',
    'border-radius': '10px',
    font: theme['font-kr-bold'],
    'font-size': '16px',
    color: 'white',
  }),
  submitBtn: {
    active: styled({
      'background-color': theme['orange-color'],
    }),
    disabled: styled({
      'background-color': theme['lightgray-color'],
    }),
  },
  errorMsg: styled({
    height: '20px',
    font: theme['font-kr-regular'],
    color: theme['orange-color'],
    'font-size': '14px',
  }),
  popUpMsg: styled({
    'background-color': theme['lightgray-color'],
  }),
};

class SigninForm extends Component {
  constructor() {
    super();
    this.signinScheme = new SigninScheme();
    this.state = { userid: '', password: '', errorMsg: '', isPopUp: false };
  }

  domStr() {
    const { userid, password, errorMsg, isPopUp } = this.state;
    this.signinScheme.userid.value = userid;
    this.signinScheme.password.value = password;
    const { isValid } = this.signinScheme;

    return `
      <div>
        <form ${styles.form} class="signin-form">
          ${Object.values(this.signinScheme)
            .map(scheme => new SchemeInput({ scheme, onInput: this.onInput.bind(this) }).render())
            .join('')}
          ${new StyledButton({
            style: styles.submitBtn[isValid ? 'active' : 'disabled'] + styles.btnCommon,
            text: 'Sign in',
            disabled: !isValid,
          }).render()}
          ${new PopUpMsg({ msg: errorMsg, isPopUp, style: styles.popUpMsg }).render()}
        </form>
      </div>
      `;
  }

  onInput(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
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

          this.setState.call(this, { errorMsg: res.err.response.data.error, isPopUp: true });
          setTimeout(() => {
            this.setState.call(this, { isPopUp: false });
          }, 1200);
        },
      },
    ];
  }
}

export default SigninForm;
