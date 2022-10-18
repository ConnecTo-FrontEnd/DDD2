import Component from '../library/Component.js';
import styled from '../library/styled.js';
import { router } from '../router/index.js';

const header = styled({
  display: 'flex',
  'justify-content': 'space-between',
  padding: '33px 26px',
  height: '96px',
});

const button = styled({
  width: '29px',
  height: '29px',
  background: 'url(../assets/logo.svg)',
});

class Header extends Component {
  domStr() {
    return `
      <header style="${header}">
        <button style="${button}" class="logo-button"></button>
        ${this.props?.item ?? ''}
      </header>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.logo-button',
        handler: () => {
          if (window.location.pathname === '/') return;
          router.go('/');
        },
      },
    ];
  }
}

export default Header;
