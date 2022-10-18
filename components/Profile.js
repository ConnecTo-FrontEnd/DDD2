import Component from '../library/Component.js';
import styled from '../library/styled.js';
import { router } from '../router/index.js';

const profile = styled({
  position: 'absolute',
  right: '16px',
  width: '40px',
  height: '40px',
  background: 'url(../assets/profile.svg)',
});

class Profile extends Component {
  domStr() {
    return `<button style="${profile}"></button>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: 'button',
        handler: () => {
          router.go('/setting');
        },
      },
    ];
  }
}

export default Profile;
