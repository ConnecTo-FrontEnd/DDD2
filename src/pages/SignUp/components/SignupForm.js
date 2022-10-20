import Component from '../../../library/Component.js';
import { SchemeInput, StyledButton, PopUpMsg } from '../../../shared/components/index.js';
import { SignupScheme } from '../../../shared/scheme/scheme.js';
import { requestSignUp, requestCheckExistUser } from '../../../shared/store/userInfo.js';
import { router } from '../../../shared/router/index.js';
import styled from '../../../library/styled.js';
import { theme } from '../../../shared/styles/theme.js';
import formStyles from '../../../shared/styles/formStyles.js';

const styles = {
  checkBtn: {
    common: styled({
      width: '100px',
      'border-radius': '10px',
      font: theme['font-kr-bold'],
      'font-size': '16px',
      color: 'white',
      height: '3rem',
      'margin-bottom': '23px',
    }),
    checked: styled({
      'background-color': theme['orange-color'],
    }),
    unchecked: styled({
      'background-color': theme['lightgray-color'],
    }),
  },
  emailCheckContainer: styled({
    display: 'flex',
    width: '100%',
    'column-gap': '1rem',
    'align-items': 'end',
  }),
  emailInput: styled({
    flex: 1,
  }),
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
      isPopUp: false,
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

    return `
      <div>
        <form class="signup-form">
        <div ${styles.emailCheckContainer}>
          ${new SchemeInput({
            scheme: this.signupScheme.userid,
            onInput: this.onInput.bind(this),
            style: styles.emailInput,
          }).render()}
          ${
            isDuplicated === null || isDuplicated || isIdDirty
              ? new StyledButton({
                  type: 'button',
                  style: styles.checkBtn.common + styles.checkBtn.unchecked,
                  text: '중복확인',
                  disabled: !_userid.isValid,
                  onClick: this.onClickBtn.bind(this),
                }).render()
              : new StyledButton({
                  type: 'button',
                  style: styles.checkBtn.common + styles.checkBtn.checked,
                  text: '확인됨',
                }).render()
          }
        </div>
          
          ${new SchemeInput({ scheme: this.signupScheme.nickname, onInput: this.onInput.bind(this) }).render()}
          ${new SchemeInput({ scheme: this.signupScheme.password, onInput: this.onInput.bind(this) }).render()}
          ${new SchemeInput({
            scheme: this.signupScheme['confirm-password'],
            onInput: this.onInput.bind(this),
          }).render()}
          <div>

          </div>
          ${new StyledButton({
            style: formStyles.submitBtn[canSubmit ? 'active' : 'disabled'] + formStyles.submitBtn.common,
            disabled: !canSubmit,
            text: 'Sign up',
          }).render()}
        </form>
        ${new PopUpMsg({
          msg: isDuplicated ? '중복된 아이디 입니다.' : '사용가능한 아이디 입니다.',
          isPopUp: this.state.isPopUp,
          style: formStyles.popUpMsg[isDuplicated ? 'invalid' : 'valid'],
        }).render()}
      </div>`;
  }

  onInput(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    if (e.target.name === 'userid') newState.isDuplicated = null;
    this.setState.call(this, newState);
  }

  async onClickBtn(e) {
    e.preventDefault();
    const { userid } = this.state;
    const res = await requestCheckExistUser(userid);
    if (res.ok) {
      this.setState.call(this, { isDuplicated: res.isDuplicated, isIdDirty: false, isPopUp: true });
      setTimeout(() => {
        this.setState.call(this, { isPopUp: false });
      }, 1200);
    }
  }

  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signup-form',
        handler: e => {
          e.preventDefault();
          const { elements } = e.target;
          requestSignUp({
            id: elements['signup-userid'].value,
            nickname: elements['signup-nickname'].value,
            password: elements['signup-password'].value,
          }).then(() => {
            router.go('/signin');
          });
        },
      },
    ];
  }
}

export default SignupForm;
