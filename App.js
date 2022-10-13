// 루트 컴포넌트
import Component from './library/Component.js';
import { NotFound } from './pages/index.js';
import { navigator, routes } from './router/index.js';

class App extends Component {
  constructor(props) {
    super(props);

    window.addEventListener('click', e => {
      if (!e.target.matches('a')) return;
      e.preventDefault();
      navigator.go(e.target.pathname);
    });
  }

  domStr() {
    const currentPath = window.location.pathname.replace('/index.html', '');
    const route = routes.find(({ path }) => path === currentPath);
    const Page = route?.page ?? NotFound;
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
