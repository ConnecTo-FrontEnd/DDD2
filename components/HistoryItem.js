import Component from '../library/Component.js';

class HistoryItem extends Component {
  domStr() {
    const { category, title } = this.props;
    return `
      <li>
        <a href="">
          <span class="problem-level"> ${category}</span>
          <span class="problem-title">/ ${title}</span>
        </a>
      </li>`;
  }
}

export default HistoryItem;
