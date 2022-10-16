// 루트 컴포넌트
import Component from './library/Component.js';
import { router } from './router/index.js';

class App extends Component {
  domStr() {
    console.log(window.location.pathname);
    const Page = router.find(window.location.pathname);

    return `
    <div>
        ${new Page({
          state: this.state,
        }).render()}
    </div>
    `;
  }
}

export default App;
