import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import theme from '../styles/theme.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
    gap: '0.5rem',
    margin: '1rem 4rem',
  }),
  label: styled({
    font: theme['font-en-bold'],
    'font-size': '15px',
  }),
  input: {
    valid: styled({
      width: '100%',
      height: '43px',
      border: `solid 1px ${theme['lightgray-color']}`,
      'border-radius': '6px',
      'padding-left': '8px',
      font: theme['font-kr-regular'],
      'font-size': '16px',
    }),
    invalid: styled({
      width: '100%',
      height: '43px',
      border: `solid 1px ${theme['orange-color']}`,
      'border-radius': '6px',
      'padding-left': '8px',
      font: theme['font-kr-regular'],
      'font-size': '16px',
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
    const { type, id, required, label, name, value, errorMsg, valid, accept } = this.props.scheme;
    // prettier-ignore
    return `
      <div ${styles.container}>
        <label ${styles.label} for="${id}">${label}</label>
        <input ${valid? styles.input.valid : styles.input.invalid}
          value="${value}" 
          type="${type}" 
          id="${id}" 
          name="${name}" 
          ${required ? 'required' : ''} 
          accept=${accept ?? ''} />
        <div ${styles.errorMsg}>${valid ? '' : errorMsg ?? ''}</div>
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
