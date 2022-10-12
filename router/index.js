import { SignIn, Main, SignUp, Setting } from '../pages/index.js';
import { render } from '../library/render/index.js';

const routes = [
  { path: '/', page: Main },
  { path: '/main', page: Main },
  { path: '/signin', page: SignIn },
  { path: '/signup', page: SignUp },
  { path: '/setting', page: Setting },
];

const navigator = {
  go(_path) {
    const currentPath = window.location.pathname.replace('/index.html', '');
    if (currentPath === _path) return;

    const route = routes.find(({ path }) => path === _path);

    window.history.pushState(null, null, route?.path ?? '/');
    render();
  },
  back() {
    render();
  },
};

export { routes, navigator };
