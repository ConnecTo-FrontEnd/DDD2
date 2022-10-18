import Component from '../../library/Component.js';
import { Header } from '../../shared/components/index.js';
import { router } from '../../shared/router/index.js';
import { SigninForm } from './components/index.js';
import styled from '../../library/styled.js';
import theme from '../../shared/styles/theme.js';

const styles = {
  title: styled({
    'text-align': 'center',
    width: '100%',
    font: theme['font-en-bold'],
    'font-size': '47px',
  }),
  link: styled({
    color: theme['orange-color'],
  }),
};
class SignIn extends Component {
  domStr() {
    return `
      <div>
        ${new Header().render()}
        <h1 ${styles.title}>AllSol</h1>
        ${new SigninForm().render()}
        <div>
          Don't have an account?
          <button ${styles.link} class="signup-link">Sign up</button>
        </div>
      </div>
    `;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.signup-link',
        handler: () => {
          router.go('/signup');
        },
      },
    ];
  }
}

export default SignIn;
