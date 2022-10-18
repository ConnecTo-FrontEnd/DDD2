import Component from '../library/Component.js';
import styled from '../library/styled.js';
import { router } from '../router/index.js';

const styles = {
  header: styled({
    display: 'flex',
    'justify-content': 'space-between',
    padding: '33px 26px',
    height: '96px',
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
      <header ${styles.header}>
        <button ${styles.logoBtn} class="logo-button"></button>
        ${this.props?.item ?? ''}
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
