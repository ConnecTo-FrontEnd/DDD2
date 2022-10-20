import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { theme } from '../styles/theme.js';

const styles = {
  button: styled({
    width: '100%',
    padding: '0.5rem 1rem',
    'border-radius': '10px',
    'background-color': theme['orange-color'],
    color: theme['white-color'],
    ':onMouseOver': {
      color: theme['black-color'],
      'background-color': theme['lightorange-color'],
    },
    ':onMouseOut': {
      color: theme['white-color'],
      'background-color': theme['orange-color'],
    },
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
