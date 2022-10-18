import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';

const inputContainer = styled({
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'flex-start',
  gap: '0.5rem',
  margin: '3rem 4rem',
});

class SelectBox extends Component {
  domStr() {
    const { id, content, name, range, selectedValue } = this.props;
    return `
    <div style="${inputContainer}">
    <label for="${id}">${content}</label>
    <select name="${name}" id="${id}">
    ${Array.from({ length: range })
      .map((_, i) => `<option value="${i + 1}" ${i + 1 === selectedValue ? 'selected' : ''}>${i + 1}</option>`)
      .join('')}
    </select>
    </div>`;
  }
}

export default SelectBox;
