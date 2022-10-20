import Component from '../../library/Component.js';
import { Header, Title } from '../../shared/components/index.js';
import { router } from '../../shared/router/index.js';
import { SigninForm } from './components/index.js';
import { commonStyles } from '../../shared/styles/theme.js';
import formStyles from '../../shared/styles/formStyles.js';

class SignIn extends Component {
  domStr() {
    return `
      <div>
        ${new Header().render()}
        <div ${commonStyles.mdContainer}>
          ${new Title({ title: 'AllSol', style: formStyles.title }).render()}
          <i ${formStyles.subtitle}>"Your future starts today"</i>
          ${new SigninForm().render()}
          <div ${formStyles.linkContainer}>
            Don't have an account?
            <button ${formStyles.link} class="signup-link">Sign up</button>
          </div>
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
