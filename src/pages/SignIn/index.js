import Component from '../../library/Component.js';
import { Header } from '../../shared/components/index.js';
import { router } from '../../shared/router/index.js';
import { SigninForm } from './components/index.js';

class SignIn extends Component {
  domStr() {
    return `
      <div>
        ${new Header().render()}
        <h1>AllSol</h1>
        ${new SigninForm().render()}
        <div>
          Don't have an account?
          <button class="signup-link">Sign up</button>
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
