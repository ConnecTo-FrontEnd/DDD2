import Component from '../core/Component.js';

const styledDiv = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  width: '80%',
  height: '6rem',
  'border-radius': '20px',
  'font-size': '1.6rem',
  'background-color': '#d9d9d9',
};

class Problem extends Component {
  constructor(props) {
    super(props);
  }

  domStr() {
    return `
      <li style="${this.converter(styledDiv)}">
        <a href="">
          <span class="problem-level">Level ${this.props.level}</span>
          <span class="problem-title">/ ${this.props.title}</span>
        </a>
      </li>`;
  }
}

export default Problem;
