import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { router } from '../router/index.js';
import { userInfo } from '../store/userInfo.js';
import LoginButton from './LoginButton.js';
import Profile from './Profile.js';

const styles = {
  header: styled({
    display: 'flex',
    'justify-content': 'space-between',
    padding: '33px 26px',
    height: '96px',
    '@desktop': {
      transform: 'translateX(0)',
    },
  }),

  logoBtn: styled({
    width: '29px',
    height: '29px',
    background: 'url(../assets/logo.svg)',
  }),
};

class Header extends Component {
  domStr() {
    return `
      <header ${styles.header} >
        <button ${styles.logoBtn} class="logo-button"></button>
        ${this.props.children ? this.props.children : ''}
      </header>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.logo-button',
        handler: () => {
          if (window.location.pathname !== '/') router.go('/');
        },
      },
    ];
  }
}

export default Header;
