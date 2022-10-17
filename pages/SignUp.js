import Component from '../library/Component.js';
import { Header, SignupForm } from '../components/index.js';

class SignUp extends Component {
  domStr() {
    return `
      <div>
        ${new Header().render()}
        <h1>AllSol</h1>
        ${new SignupForm().render()}
        <div>
          Already have an account?
          <button>Sign in</button>
        </div>
      </div>
    `;
  }
}

export default SignUp;
