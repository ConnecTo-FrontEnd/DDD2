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
  addEventListener() {
    const { setInputValue } = this.props;
    return [
      {
        type: 'input',
        selector: 'input',
        handler: e => {
          const newstate = {};
          newstate[e.target.name] = e.target.value;
          newstate.idChanged = e.target.name === 'userid' ? true : null;
          setInputValue?.(newstate);
        },
      },
    ];
  }

  domStr() {
    const { type, id, content, name, value, errorMessage, valid, accept } = this.props.scheme;

    // prettier-ignore
    return `
      <div style="${inputContainer}">
        <label for="${id}">${content}</label>
        <input style="width: 100%" value="${value}" type="${type}" id="${id}" name="${name}" ${type === 'text' ? 'required' : ''} accept=${accept ?? ''} />
        <div>${valid ? '' : errorMessage ?? ''}</div>
      </div>`;
  }
}

export default Input;
