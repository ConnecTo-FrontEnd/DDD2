import Component from '../library/Component.js';
import BackButton from './BackButton.js';
import Profile from './Profile.js';
import theme from '../styles/theme.js';

const styledNav = {
  color: theme['orange-color'],
  font: theme['font-en-bold'],
  display: 'flex',
  'align-items': 'center',
  height: '6rem',
  'background-color': '#d9d9d9',
};

class Header extends Component {
  domStr() {
    return `
      <header style="${this.converter(styledNav)}">
      hihihihi
        ${new BackButton().render()}
        ${new Profile().render()}
      </header>`;
  }
}

export default Header;
