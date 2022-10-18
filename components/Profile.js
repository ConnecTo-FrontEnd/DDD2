import Component from '../library/Component.js';

import styled from '../library/styled.js';
import theme from '../styles/theme.js';

import { router } from '../router/index.js';
import { userInfo } from '../store/userInfo.js';

const styles = {
  profileBtn: styled({
    position: 'absolute',
    right: '16px',
    width: '40px',
    height: '40px',
    background: 'url(../assets/profile.svg)',
  }),

  loginBtn: styled({
    position: 'absolute',
    right: '16px',
    height: '40px',
    font: theme['font-kr-bold'],
    'font-size': '20px',
    color: theme['orange-color'],
  }),
};

class Profile extends Component {
  domStr() {
    if (window.location.pathname === '/' && !userInfo)
      return `<button ${styles.loginBtn} class="login-btn">Log In</button>`;

    return `<button ${styles.profileBtn} class="profile-btn"></button>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.profile-btn',
        handler: () => {
          router.go('/setting');
        },
      },
      {
        type: 'click',
        selector: '.login-btn',
        handler: () => {
          router.go('/signin');
        },
      },
    ];
  }
}

export default Profile;
