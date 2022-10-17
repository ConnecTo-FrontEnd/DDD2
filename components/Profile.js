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
    if (userInfo)
      return `
        <button style="${profile}" class="profile-button"></button>`;

    if ('현재 페이지가 메인페이지 - 로그아웃 상태이면')
      return `
        <button style="${beforeLogIn}" class="profile-login-button">Log In</button>`;

    return ``;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.profile-button',
        handler: e => {
          console.log('프로필 버튼 누름');
          router.go('/setting');
        },
      },
      {
        type: 'click',
        selector: '.profile-login-button',
        handler: e => {
          console.log('프로필 위치에 있는 Log In 버튼 누름');
          router.go('/signin');
        },
      },
    ];
  }
}

export default Profile;
