import Component from '../library/Component.js';

class HistoryItem extends Component {
  domStr() {
    return `
      <li>
        <a href="">
          <span class="problem-level">Level ${this.props.level}</span>
          <span class="problem-title">/ ${this.props.title}</span>
        </a>
      </li>`;
  }
}

export default HistoryItem;
