import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { theme } from '../styles/theme.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
    gap: '0.2rem',
  }),
  label: styled({
    font: theme['font-en-bold'],
    'font-size': '15px',
    margin: '0.8rem 0 0.5rem',
  }),
  input: {
    common: styled({
      width: '100%',
      height: '3rem',
      'border-radius': '6px',
      padding: '1rem',
      font: theme['font-kr-regular'],
      'font-size': '16px',
    }),
    valid: styled({
      border: `solid 1px ${theme['lightgray-color']}`,
    }),
    invalid: styled({
      border: `solid 1px ${theme['orange-color']}`,
    }),
  },
  errorMsg: styled({
    height: '20px',
    font: theme['font-kr-regular'],
    color: theme['orange-color'],
    'font-size': '14px',
  }),
};

class SchemeInput extends Component {
  domStr() {
    const { type, id, required, label, name, value, errorMsg, isValid, accept } = this.props.scheme;
    // prettier-ignore
    return `
      <div ${styles.container} ${this.props?.style ?? ''}>
        <label ${styles.label} for="${id}">${label}</label>
        <input ${!!value && isValid===false ? styles.input.invalid : styles.input.valid} ${styles.input.common}
          value="${value}" 
          type="${type}" 
          id="${id}" 
          name="${name}" 
          ${required ? 'required' : ''} 
          accept=${accept ?? ''} />
        <div ${styles.errorMsg}>${!!value && isValid===false ? errorMsg : ''}</div>
      </div>
    `;
  }

  addEventListener() {
    const { onInput } = this.props;
    return [
      {
        type: 'input',
        selector: 'input',
        handler: onInput,
      },
    ];
  }
}

export default SchemeInput;
