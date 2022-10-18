import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { router } from '../router/index.js';
import theme from '../styles/theme.js';

const loginButton = styled({
  position: 'absolute',
  right: '16px',
  height: '40px',
  font: theme['font-kr-bold'],
  'font-size': '20px',
  color: theme['orange-color'],
});

class LoginButton extends Component {
  domStr() {
    return `<button style="${loginButton}">Log In</button>`;
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
