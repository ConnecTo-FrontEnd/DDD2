import Component from '../library/Component.js';
import styled from '../library/styled.js';

const button = styled({
  margin: '0 auto',
  width: '70%',
  height: '3rem',
  border: '2px solid black',
  'border-radius': '10px',
  'font-size': '1rem',
  'background-color': '#f7f7f7',
});

class StyledButton extends Component {
  // {style, text, onClick} = this.props
  domStr() {
    const { style, text } = this.props;
    return `<button style="${button}; ${style}">${text}</button>`;
  }

  addEventListener() {
    const { onClick } = this.props;
    return [{ type: 'click', selector: 'button', handler: onClick ?? (() => {}) }];
  }
}

export default StyledButton;
