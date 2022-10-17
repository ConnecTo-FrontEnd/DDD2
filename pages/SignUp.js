import Component from '../library/Component.js';
import { Header, SignupForm } from '../components/index.js';
import { router } from '../router/index.js';

class SignUp extends Component {
  domStr() {
    return `
    <div>
      ${new Header().render()}
      <h1>AllSol</h1>
      ${new SignupForm().render()}
      <div>
        Already have an account?
        <button class="from-signup-signin-button">Sign in</button>
      </div>
    </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signup-form',
        handler: async e => {
          e.preventDefault();
          const res = await axios({
            method: 'post',
            url: '/signup',
            data: {
              id: e.target[0].value,
              password: e.target[1].value,
            },
          });
          console.log(res);
        },
      },
      {
        type: 'click',
        selector: '.from-signup-signin-button',
        handler: e => {
          router.go('/signin');
        },
      },
    ];
  }
}

export default SignUp;
