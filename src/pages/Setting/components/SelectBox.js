import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
  }),
  inputLabel: styled({
    display: 'block',
    margin: '1rem 0',
    font: theme['font-en-bold'],
    'text-align': 'left',
  }),
  inputItem: styled({
    display: 'block',
    padding: '1rem',
    border: `1px solid ${theme['lightgray-color']}`,
    'border-radius': '6px',
    'text-align': 'left',
    background: 'url(./../../../assets/selectArrow.svg) no-repeat 97% 50%/15px auto',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none',
  }),
};

class SelectBox extends Component {
  domStr() {
    const { id, label, name, range, selectedValue } = this.props;
    return `
    <div ${styles.container}>
      <label ${styles.inputLabel} for="${id}">${label}</label>
      <select ${styles.inputItem} name="${name}" id="${id}">
      ${Array.from({ length: range })
        .map((_, i) => `<option value="${i + 1}" ${i + 1 === selectedValue ? 'selected' : ''}>${i + 1}</option>`)
        .join('')}
      </select>
    </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'change',
        selector: 'select',
        handler: this.props.onChange ?? (() => {}),
      },
    ];
  }
}

export default SelectBox;
