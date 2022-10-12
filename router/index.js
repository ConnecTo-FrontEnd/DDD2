import { SignIn, MainAfterSignIn } from '../pages/index.js';
import render from '../render/render.js';

const routes = [
  { path: '/signin', page: SignIn },
  { path: '/mainAfterSignIn', page: MainAfterSignIn },
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
