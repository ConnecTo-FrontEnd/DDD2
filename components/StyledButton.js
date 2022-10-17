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
  domStr() {
    const { style, text } = this.props;
    return `<button style="${button}; ${style}">${text}</button>`;
  }

  addEventListener() {
    return [{ type: 'click', selector: 'button', handler: this.props?.onClick ?? (() => {}) }];
  }
}

export default StyledButton;
