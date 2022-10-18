import Component from '../../../library/Component.js';
import { Header } from '../../shared/components/index.js';
import { router } from '../../shared/router/index.js';
import { SignupForm } from './components/index.js';

class SignUp extends Component {
  domStr() {
    return `
    <div>
      ${new Header().render()}
      <h1>AllSol</h1>
      ${new SignupForm().render()}
      <div>
        Already have an account?
        <button class="signin-link">Sign in</button>
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
