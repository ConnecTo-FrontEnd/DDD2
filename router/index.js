import { SignIn, Main, SignUp, Setting, NotFound } from '../pages/index.js';
import { render } from '../library/render/index.js';
import { userInfo } from '../store/userInfo.js';

const routes = [
  {
    path: '/',
    page: Main,
    get shouldRedirect() {
      return false;
    },
    redirectTo: '/',
  },
  {
    path: '/signin',
    page: SignIn,
    get shouldRedirect() {
      return userInfo !== null;
    },
    redirectTo: '/',
  },
  {
    path: '/signup',
    page: SignUp,
    get shouldRedirect() {
      return userInfo !== null;
    },
    redirectTo: '/',
  },
  {
    path: '/setting',
    page: Setting,
    get shouldRedirect() {
      return userInfo === null;
    },
    redirectTo: '/signin',
  },
];

const router = {
  find(_path) {
    const route = routes.find(({ path }) => path === _path);

    if (route?.shouldRedirect) {
      window.history.pushState(null, null, route.redirectTo);
      const redirectRoute = routes.find(({ path }) => path === route.redirectTo);
      return redirectRoute?.page ?? NotFound;
    }

    return route?.page ?? NotFound;
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
