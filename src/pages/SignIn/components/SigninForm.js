import Component from '../../../library/Component.js';
import { SchemeInput, StyledButton, PopUpMsg } from '../../../shared/components/index.js';
import { SigninScheme } from '../../../shared/scheme/scheme.js';
import { requestSignIn } from '../../../shared/store/userInfo.js';
import { router } from '../../../shared/router/index.js';
import formStyles from '../../../shared/styles/formStyles.js';

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
        <form class="signin-form">
          ${Object.values(this.signinScheme)
            .map(scheme => new SchemeInput({ scheme, onInput: this.onInput.bind(this) }).render())
            .join('')}
          ${new StyledButton({
            style: formStyles.submitBtn[isValid ? 'active' : 'disabled'] + formStyles.submitBtn.common,
            text: 'Sign in',
            disabled: !isValid,
          }).render()}
          ${new PopUpMsg({ msg: errorMsg, isPopUp, style: formStyles.popUpMsg.invalid }).render()}
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
