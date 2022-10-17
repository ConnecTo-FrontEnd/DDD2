import Component from '../library/Component.js';
import Profile from './Profile.js';
import styled from '../library/styled.js';
import { userInfo } from '../store/userInfo.js';
import { routes } from '../router/index.js';

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
        ${new Profile({ userInfo }).render()}
      </header>`;
  }
}

export default Header;
