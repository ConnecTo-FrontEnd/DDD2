import Component from '../library/Component.js';
import styled from '../library/styled.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
    gap: '0.5rem',
    margin: '3rem 4rem',
  }),

  input: styled({
    width: '100%',
  }),
};

class SchemeInput extends Component {
  domStr() {
    const { type, id, required, label, name, value, errorMsg, valid, accept } = this.props.scheme;
    // prettier-ignore
    return `
      <div ${styles.container}>
        <label for="${id}">${label}</label>
        <input 
          ${styles.input} 
          value="${value}" 
          type="${type}" 
          id="${id}" 
          name="${name}" 
          ${required ? 'required' : ''} 
          accept=${accept ?? ''} />
        <div>${valid ? '' : errorMsg ?? ''}</div>
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
