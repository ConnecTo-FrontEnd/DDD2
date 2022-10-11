import Component from '../core/Component.js';

const styledButton = {
  margin: '0 auto',
  width: '70%',
  height: '3rem',
  border: '2px solid black',
  'border-radius': '16px',
  'font-size': '1rem',
  'background-color': '#f7f7f7',
};

class Button extends Component {
  domStr() {
    return `<button style="${this.converter(styledButton)}">${this.props}</button>`;
  }
}

export default Button;
