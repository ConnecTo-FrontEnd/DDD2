import Component from '../../library/Component.js';
import { Header } from '../../shared/components/index.js';
import { router } from '../../shared/router/index.js';
import { SignupForm } from './components/index.js';
import styled from '../../library/styled.js';
import theme from '../../shared/styles/theme.js';

const styles = {
  signUpContainer: styled({
    'max-width': '50rem',
  }),
  title: styled({
    'text-align': 'center',
    width: '100%',
    font: theme['font-en-bold'],
    'font-size': '47px',
  }),
  linkContainer: styled({
    font: theme['font-kr-regular'],
    'font-size': '15px',
    'margin-top': '0.5rem',
  }),
  link: styled({
    color: theme['orange-color'],
  }),
};

class SignUp extends Component {
  domStr() {
    return `
    <div>
      ${new Header().render()}
      <h1 ${styles.title}>AllSol</h1>
      ${new SignupForm().render()}
      <div ${styles.linkContainer}>
        Already have an account?
        <button ${styles.link} class="signin-link">Sign in</button>
      </div>
    </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.signin-link',
        handler: () => {
          router.go('/signin');
        },
      },
    ];
  }
}

export default SignUp;
