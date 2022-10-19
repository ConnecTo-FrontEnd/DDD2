import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { router } from '../router/index.js';
import theme from '../styles/theme.js';

const styles = {
  loginButton: styled({
    font: theme['font-kr-bold'],
    'font-size': '20px',
    color: theme['orange-color'],
  }),
};

class LoginButton extends Component {
  domStr() {
    return `<button ${styles.loginButton}>로그인</button>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: 'button',
        handler: () => {
          router.go('/signin');
        },
      },
    ];
  }
}

export default LoginButton;
