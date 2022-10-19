import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { router } from '../router/index.js';
import theme from '../styles/theme.js';
import { userInfo } from '../store/userInfo.js';

const styles = {
  profileBtn: styled({
    width: '40px',
    height: '40px',
    background: 'url(../assets/profile.svg)',
  }),
};

class Profile extends Component {
  domStr() {
    return `
      <button ${styles.profileBtn} class="profile-btn"></button>
    `;
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
    ];
  }
}

export default Profile;
