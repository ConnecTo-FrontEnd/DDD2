// 루트 컴포넌트
import Component from './core/Component.js';
import { Loading, Setting, MainBeforeSignIn, MainAfterSignIn, SignIn, SignUp } from './pages/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [
        { link: '/', level: 1, title: '사다리꼴 넓이' },
        { link: '/', level: 3, title: 'CBD' },
        { link: '/', level: 2, title: '프록시' },
        { link: '/', level: 2, title: '화이트갈릭 싸이버거' },
        { link: '/', level: 3, title: '이태리 부대찌개' },
        { link: '/', level: 4, title: '부대전골' },
        { link: '/', level: 5, title: '맘스터치' },
      ],
      isLogIn: true,
      
    };
  }

  domStr() {
    // ${new MainBeforeSignIn(this.state).domStr()}
    // ${new MainAfterSignIn(this.state).domStr()}
    return `
    ${new SignIn().domStr()}
      `;
  }
}

export default App;
