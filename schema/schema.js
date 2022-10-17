class SigninScheme {
  constructor() {
    this.userid = {
      type: 'text',
      value: '',
      content: 'Email',
      id: 'signin-userid',
      name: 'userid',
    };
    this.password = {
      type: 'text',
      value: '',
      content: 'Password',
      id: 'signin-password',
      name: 'password',
    };
  }

  get valid() {
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
      errorMessage: '이메일 형식을 맞춰주세요.',
      get valid() {
        return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(this.value);
      },
    };
    this.password = {
      ...this.password,
      id: 'signup-password',
      errorMessage: '영문 또는 숫자를 6~12자로 입력해주세요.',
      get valid() {
        return /^[0-9a-zA-Z]{6,12}$/.test(this.value);
      },
    };
    this['confirm-password'] = {
      type: 'text',
      value: '',
      content: 'Confirm Password',
      id: 'signup-confirm-password',
      name: 'confirm-password',
      errorMessage: '비밀번호가 일치하지 않습니다.',
      get valid() {
        return that.password.value === this.value;
      },
    };
  }

  get valid() {
    return this.userid.valid && this.password.valid && this['confirm-password'].valid;
  }

  get isEmpty() {
    return this.userid.value === '' && this.password.value === '' && this['confirm-password'].value === '';
  }
}

export { SigninScheme, SignupScheme };
