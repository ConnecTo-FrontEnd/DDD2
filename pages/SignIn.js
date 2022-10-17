import Component from '../library/Component.js';
import { Header, SigninForm } from '../components/index.js';
import { router } from '../router/index.js';
import { setUserInfo } from '../store/userInfo.js';

class SignIn extends Component {
  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.signin-form',
        handler: async e => {
          e.preventDefault();
          const res = await axios({
            method: 'post',
            url: '/signin',
            data: {
              id: e.target[0].value,
              password: e.target[1].value,
            },
          });
          setUserInfo(res.data);
          router.go('/');
        },
      },
    ];
  }

  domStr() {
    return `
      <div>
        ${new Header().render()}
        <h1>AllSol</h1>
        ${new SigninForm().render()}
        <div>
          Don't have an account?
          <button>Sign up</button>
        </div>
      </div>
    `;
  }
}

export default SignIn;
