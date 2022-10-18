import Component from '../library/Component.js';
import styled from '../library/styled.js';

const inputContainer = styled({
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'flex-start',
  gap: '0.5rem',
  margin: '3rem 4rem',
});

class Input extends Component {
  domStr() {
    const { type, id, content, name, value, errorMessage, isValid } = this.props.scheme;

    // prettier-ignore
    return `
      <div style="${inputContainer}">
        <label for="${id}">${content}</label>
        <input 
          value="${value}" type="${type}" id="${id}" name="${name}" 
          ${type === 'text' ? 'required' : ''}/>
        <div>${isValid ? '' : errorMessage ?? ''}</div>
      </div>`;
  }

  addEventListener() {
    const { setState } = this.props;
    return [
      {
        type: 'input',
        selector: 'input',
        handler: e => {
          const newState = {};
          newState[e.target.name] = e.target.value;
          newState.isIdDirty = e.target.name === 'userid';
          setState?.(newState);
        },
      },
    ];
  }
}

export default Input;
