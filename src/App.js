// 루트 컴포넌트
import Component from './library/Component.js';
import { router } from './shared/router/index.js';
import { requestVerify, userInfo } from './shared/store/userInfo.js';

class App extends Component {
  domStr() {
    const Page = router.find(window.location.pathname);

    return `
      <div>
          ${new Page({
            state: this.state,
          }).render()}
      </div>
    `;
  }

  addEventListener() {
    return [
      {
        type: 'DOMContentLoaded',
        handler: () => {
          if (!userInfo)
            requestVerify().then(res => {
              this.setState.call(this, {});
            });
        },
      },
    ];
  }
}

export default App;
