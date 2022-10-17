import Component from '../library/Component.js';
import { Header, SigninForm } from '../components/index.js';

class SignIn extends Component {
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
