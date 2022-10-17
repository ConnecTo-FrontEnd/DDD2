/*
const signinScheme = {
  userid: {
    content: 'Email',
    id: 'signin-userid',
    name: 'userid',
  },
  password: {
    content: 'Password',
    id: 'signin-password',
    name: 'password',
  },
};

const signupScheme = {
  userid: {
    content: 'Email',
    id: 'signup-userid',
    name: 'userid',
    regexp: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    errorMessage: '이메일 형식을 맞춰주세요.',
  },
  password: {
    content: 'Password',
    id: 'signup-password',
    name: 'password',
    regexp: /^[0-9a-zA-Z]{6,12}$/,
    errorMessage: '영문 또는 숫자를 6~12자로 입력해주세요.',
  },
  'confirm-password': {
    content: 'Confirm Password',
    id: 'signup-confirm-password',
    name: 'confirm-password',
    errorMessage: '비밀번호가 일치하지 않습니다.',
  },
};
*/

/*
class SignupScheme {
  constructor() {
    this.userid = {
      value: '',
      content: 'Email',
      id: 'signup-userid',
      name: 'userid',
      errorMessage: '이메일 형식을 맞춰주세요.',
      get valid() {
        return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(this.value);
      },
    };
    this.password = {
      value: '',
      content: 'Password',
      id: 'signup-password',
      name: 'password',
      errorMessage: '영문 또는 숫자를 6~12자로 입력해주세요.',
      get valid() {
        return /^[0-9a-zA-Z]{6,12}$/.test(this.value);
      },
    };
    this['confirm-password'] = {
      value: '',
      content: 'Confirm Password',
      id: 'signup-confirm-password',
      name: 'confirm-password',
      errorMessage: '비밀번호가 일치하지 않습니다.',
      get valid() {
        console.log(this);
        return SignupScheme.password.value === this.value;
      },
    };
  }
}
*/

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

class SettingScheme {
  constructor() {
    this.profile = {
      type: 'file',
      value: '',
      content: '이미지 파일 선택',
      id: 'setting-profile',
      name: 'profile',
      accept: 'image/*',
    };
    this.nickname = {
      type: 'text',
      value: '',
      content: 'Nickname',
      id: 'setting-nickname',
      name: 'nickname',
    };
    this.number = {
      type: 'selectbox',
      content: 'Number',
      id: 'setting-number',
      name: 'number',
      num: '10',
    };
    this.day = {
      type: 'selectbox',
      content: 'Day',
      id: 'setting-day',
      name: 'day',
      num: '7',
    };
    this.platforms = [
      { type: 'checkbox', id: 'all', content: '모든 플랫폼', name: 'platforms', value: 'all' },
      { type: 'checkbox', id: 'programmars', content: '프로그래머스', name: 'platforms', value: 'programmars' },
      { type: 'checkbox', id: 'baekjoon', content: '백준', name: 'platforms', value: 'baekjoon' },
      { type: 'checkbox', id: 'leetcode', content: 'LeetCode', name: 'platforms', value: 'leetcode' },
    ];
  }
}

export { SigninScheme, SignupScheme, SettingScheme };
