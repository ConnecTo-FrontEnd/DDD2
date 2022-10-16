import { SignIn, Main, SignUp, Setting, NotFound } from '../pages/index.js';
import { render } from '../library/render/index.js';

const routes = [
  { path: '/', page: Main },
  { path: '/main', page: Main },
  { path: '/signin', page: SignIn },
  { path: '/signup', page: SignUp },
  { path: '/setting', page: Setting },
];

const router = {
  find(_path) {
    return routes.find(({ path }) => path === _path)?.page ?? NotFound;
  },
  go(_path) {
    if (window.location.pathname === _path) return;

    window.history.pushState(null, null, _path);
    render();
  },
  back() {
    history.back();
  },
};

window.addEventListener('popstate', () => {
  render();
});

export { routes, router };
