import Component from '../../library/Component.js';
import { Header, Title } from '../../shared/components/index.js';
import { router } from '../../shared/router/index.js';
import { SignupForm } from './components/index.js';
import { commonStyles } from '../../shared/styles/theme.js';
import formStyles from '../../shared/styles/formStyles.js';

class SignUp extends Component {
  domStr() {
    return `
      <div>
        ${new Header().render()}
        <div ${commonStyles.mdContainer}>
          ${new Title({ title: 'AllSol', style: formStyles.title }).render()}
          <i ${formStyles.subtitle}>"Rome is not built in a day"</i>
          ${new SignupForm().render()}
          <div ${formStyles.linkContainer}>
            Already have an account?
            <button ${formStyles.link} class="signin-link">Sign in</button>
          </div>
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
