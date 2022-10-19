import Component from '../../../library/Component.js';
import { SchemeInput, StyledButton } from '../../../shared/components/index.js';
import { SignupScheme } from '../../../shared/scheme/scheme.js';
import styled from '../../../library/styled.js';
import { requestSignUp, requestCheckExistUser } from '../../../shared/store/userInfo.js';
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
  doubleCheckBtn: styled({
    position: 'absolute',
    top: '190px',
    right: '64px',
    width: '65px',
    'border-radius': '10px',
    font: theme['font-kr-bold'],
    'font-size': '16px',
    color: 'white',
    'background-color': theme['lightgray-color'],
  }),
  checkedMsg: styled({
    position: 'absolute',
    top: '190px',
    right: '64px',
    width: '65px',
    'border-radius': '10px',
    font: theme['font-kr-bold'],
    'font-size': '16px',
    color: 'white',
    'background-color': theme['orange-color'],
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
    // prettier-ignore
    return `
      <form class="signup-form">
        ${Object.values(this.signupScheme)
          .map(scheme => new SchemeInput({ scheme, onInput: this.onInput.bind(this) }).render())
          .join('')}
        <div>
        ${
          isDuplicated === null || isDuplicated || isIdDirty
            ? new StyledButton({
                type: 'button',
                style: styles.doubleCheckBtn,
                text: '중복확인',
                disabled: !_userid.isValid,
                onClick: this.onClickBtn.bind(this),
              }).render()
            : new StyledButton({ type: 'button', style: styles.checkedMsg, text: '확인됨' }).render()
        }
          <div> ${isDuplicated ? '중복된 아이디입니다.' : ''}</div>
        </div>
        ${new StyledButton({
          style: styles.submitBtn[canSubmit ? 'active' : 'disabled'],
          disabled: !canSubmit,
          text: 'Sign up',
        }).render()}
      </form>`;
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

    if (res.ok) this.setState.call(this, { isDuplicated: res.isDuplicated, isIdDirty: false });
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
