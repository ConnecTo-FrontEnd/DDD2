import Component from '../core/Component.js';

const styledNav = {
  display: 'flex',
  'align-items': 'center',
  height: '6rem',
  'background-color': '#d9d9d9',
};

const styledProfile = {
  position: 'absolute',
  right: '0.5rem',
  'margin-right': '2rem',
  width: '3rem',
  height: '3rem',
  'border-radius': '50%',
  'background-color': 'white',
};

class Profile extends Component {
  domStr() {
    return `
      <header style="${this.converter(styledNav)}">
        <button style="${this.converter(styledProfile)}">사람</button>
      </header>`;
  }
}

export default Profile;
