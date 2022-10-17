import Component from '../library/Component.js';
import { router } from '../router/index.js';

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

  addEventListener() {
    return [
      {
        type: 'click',
        selector: 'button',
        handler: () => {
          router.back();
        },
      },
    ];
  }
}

export default BackButton;
