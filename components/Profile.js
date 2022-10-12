import Component from '../library/Component.js';

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
        <button style="${this.converter(styledProfile)}">사람</button>
      `;
  }
}

export default Profile;
