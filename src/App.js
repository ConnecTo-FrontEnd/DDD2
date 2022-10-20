import Component from './library/Component.js';
import { router } from './shared/router/index.js';
import { requestVerify, userInfo } from './shared/store/userInfo.js';
import { commonStyles } from './shared/styles/theme.js';

class App extends Component {
  domStr() {
    const Page = router.find(window.location.pathname);

    return `
      <div ${commonStyles.rootContainer}>
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
            requestVerify().then(() => {
              this.setState.call(this, {});
            });
        },
      },
    ];
  }
}

export default App;
