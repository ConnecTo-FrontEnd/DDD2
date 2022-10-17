import Component from '../library/Component.js';

import styled from '../library/styled.js';
import theme from '../styles/theme.js';

import { router } from '../router/index.js';

const profile = styled({
  position: 'absolute',
  right: '16px',
  width: '40px',
  height: '40px',
  background: 'url(../assets/profile.svg)',
});

const beforeLogIn = styled({
  position: 'absolute',
  right: '16px',
  height: '40px',
  font: theme['font-kr-bold'],
  'font-size': '20px',
  color: theme['orange-color'],
});

class Profile extends Component {
  domStr() {
    const { userInfo } = this.props;
    const currentPath = window.location.pathname;
    console.log(window.location.pathname, window.location.pathname === '/');

    if (['/setting', '/signin', '/signup'].includes(currentPath)) return ``;

    if (currentPath === '/' && !userInfo)
      return `<button style="${beforeLogIn}" class="profile-login-button">Log In</button>`;

    return `<button style="${profile}" class="profile-button"></button>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.profile-button',
        handler: e => {
          router.go('/setting');
        },
      },
      {
        type: 'click',
        selector: '.profile-login-button',
        handler: e => {
          router.go('/signin');
        },
      },
    ];
  }
}

export default Profile;
