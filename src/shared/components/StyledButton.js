import Component from '../../library/Component.js';
import styled from '../../library/styled.js';

const styles = {
  button: styled({
    margin: '0 auto',
    width: '70%',
    height: '3rem',
    'border-radius': '10px',
    'font-size': '1rem',
    'background-color': '#f7f7f7',
  }),
};
class StyledButton extends Component {
  domStr() {
    const { props } = this;
    return `<button ${props.type ? 'type="button"' : ''} ${styles.button} ${props.style ?? ''} ${
      props.disabled ? 'disabled' : ''
    }>${props.text ?? ''}</button>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: 'button',
        handler: this.props?.onClick ?? (() => {}),
      },
    ];
  }
}

export default StyledButton;
