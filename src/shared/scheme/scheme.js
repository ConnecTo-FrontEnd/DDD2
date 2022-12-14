class SigninScheme {
  constructor() {
    this.userid = {
      type: 'text',
      value: '',
      label: 'Email',
      id: 'signin-userid',
      name: 'userid',
      required: true,
    };
    this.password = {
      type: 'text',
      value: '',
      label: 'Password',
      id: 'signin-password',
      name: 'password',
    };
  }

  get isValid() {
    return this.userid.value !== '' && this.password.value !== '';
  }
}

class SignupScheme extends SigninScheme {
  constructor() {
    super();
    const that = this;
    this.userid = {
      ...this.userid,
      id: 'signup-userid',
      errorMsg: '이메일 형식을 맞춰주세요.',
      get isValid() {
        return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(this.value);
      },
    };
    this.password = {
      ...this.password,
      id: 'signup-password',
      errorMsg: '영문 또는 숫자를 6~12자로 입력해주세요.',
      get isValid() {
        return /^[0-9a-zA-Z]{6,12}$/.test(this.value);
      },
    };
    this.nickname = {
      type: 'text',
      value: '',
      label: 'Nickname',
      id: 'signup-nickname',
      name: 'nickname',
      errorMsg: '8자 이하로 입력해주세요.',
      get isValid() {
        return /^.{1,8}$/.test(this.value);
      },
    };
    this['confirm-password'] = {
      type: 'text',
      value: '',
      label: 'Confirm Password',
      id: 'signup-confirm-password',
      name: 'confirm-password',
      errorMsg: '비밀번호가 일치하지 않습니다.',
      get isValid() {
        return that.password.value === this.value;
      },
    };
  }

  get isValid() {
    return this.userid.isValid && this.password.isValid && this['confirm-password'].isValid && this.nickname.isValid;
  }

  get isEmpty() {
    return this.userid.value === '' && this.password.value === '' && this['confirm-password'].value === '';
  }
}

export { SigninScheme, SignupScheme };
