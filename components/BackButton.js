// 뒤로가기 버튼
import Component from '../core/Component.js';

const styledBack = {
  'margin-left': '2rem',
  width: '5rem',
  height: '2rem',
  border: '1px solid black',
  'border-radius': '8px',
  'background-color': 'white',
};

class BackButton extends Component {
  domStr() {
    return `<button style="${this.converter(styledBack)}">뒤로가기</button>`;
  }
}

export default BackButton;
