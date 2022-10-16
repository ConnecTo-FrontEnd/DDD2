// 루트 컴포넌트
import Component from './library/Component.js';
import { router } from './router/index.js';
import { requestVerify, userInfo } from './store/userInfo.js';

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
              if (res) this.setState.call(this, {});
            });
        },
      },
    ];
  }
}

export default App;
