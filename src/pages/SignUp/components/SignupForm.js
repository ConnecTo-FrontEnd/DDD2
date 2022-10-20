import Component from '../../../library/Component.js';
import { SchemeInput, StyledButton, PopUpMsg } from '../../../shared/components/index.js';
import { SignupScheme } from '../../../shared/scheme/scheme.js';
import { requestSignUp, requestCheckExistUser } from '../../../shared/store/userInfo.js';
import { router } from '../../../shared/router/index.js';
import styled from '../../../library/styled.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  form: styled({
    position: 'relative',
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
  checkCommon: styled({
    position: 'absolute',
    top: '2.6rem',
    right: '2rem',
    width: '65px',
    'border-radius': '10px',
    font: theme['font-kr-bold'],
    'font-size': '16px',
    color: 'white',
    '@desktop': {
      right: '4rem',
    },
  }),
  submitBtn: {
    active: styled({
      'background-color': theme['orange-color'],
    }),
    disabled: styled({
      'background-color': theme['lightgray-color'],
    }),
  },
  doubleCheckBtn: styled({
    'background-color': theme['lightgray-color'],
  }),
  checkedMsg: styled({
    'background-color': theme['orange-color'],
  }),
  emailInput: styled({
    width: 'calc(99% - 65px)',
  }),
  popUpMsg: {
    invalid: styled({
      'background-color': theme['lightgray-color'],
    }),
    valid: styled({
      'background-color': theme['orange-color'],
    }),
  },
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
        <form ${styles.form} class="signup-form">
          ${new SchemeInput({
            scheme: this.signupScheme.userid,
            onInput: this.onInput.bind(this),
            style: styles.emailInput,
          }).render()}
          ${
            isDuplicated === null || isDuplicated || isIdDirty
              ? new StyledButton({
                  type: 'button',
                  style: styles.doubleCheckBtn + styles.checkCommon,
                  text: '중복확인',
                  disabled: !_userid.isValid,
                  onClick: this.onClickBtn.bind(this),
                }).render()
              : new StyledButton({
                  type: 'button',
                  style: styles.checkedMsg + styles.checkCommon,
                  text: '확인됨',
                }).render()
          }
          ${new SchemeInput({ scheme: this.signupScheme.nickname, onInput: this.onInput.bind(this) }).render()}
          ${new SchemeInput({ scheme: this.signupScheme.password, onInput: this.onInput.bind(this) }).render()}
          ${new SchemeInput({
            scheme: this.signupScheme['confirm-password'],
            onInput: this.onInput.bind(this),
          }).render()}
          <div>

          </div>
          ${new StyledButton({
            style: styles.submitBtn[canSubmit ? 'active' : 'disabled'] + styles.btnCommon,
            disabled: !canSubmit,
            text: 'Sign up',
          }).render()}
        </form>
        ${new PopUpMsg({
          msg: isDuplicated ? '중복된 아이디 입니다.' : '사용가능한 아이디 입니다.',
          isPopUp: this.state.isPopUp,
          style: styles.popUpMsg[isDuplicated ? 'invalid' : 'valid'],
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

          requestSignUp({
            id: e.target[0].value,
            password: e.target[1].value,
            nickname: e.target[2].value,
          }).then(() => {
            router.go('/signin');
          });
        },
      },
    ];
  }
}

export default SignupForm;
