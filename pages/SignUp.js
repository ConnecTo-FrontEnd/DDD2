import Component from '../library/Component.js';
import { Header, Form } from '../components/index.js';
import { userInfo } from '../store/userInfo.js';

class SignUp extends Component {
  domStr() {
    return `
      <div>
        ${new Header({ userInfo }).render()}
        <h1>회원가입</h1>
        ${new Form(this.props).render()}
      </div>
    `;
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
    ];
  }
}

export default SignUp;
